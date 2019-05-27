<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use App\Models\Point;
use Illuminate\Support\Facades\DB;

class PostController extends Controller
{
    protected $rules = [
        // 'title'     => 'required|max:255',
        // 'email'    => 'required|email',
        // 'password' => 'required|numeric|min:6|confirmed',
        // 'website'  => 'sometimes|required|url'
        "title" => "required",
        "desc" => "required",
        "cooking_representation" => "required",
        "content" => "required",
        "difficulty" => "required",
        "cooking_time" => "required",
        "function" => "required"
    ];

    protected $paramsDefault = [
        "title" => null,
        "desc" => null,
        "user_id" => 0,
        "content" => null,
        "rate" => 0,
        "status" => 3, //draf
        "keywords" => null,
        "thumb" => null,
        "extra" => null,
        "images" => null,
        "videos" => null,
        "total_view" => 0,
        "total_like" => 0,
        "total_cmt" => 0,
        "cate" => 0,
        "size" => 0,
        "age" => 0,
        "dryness" => 0,
        "function" => 0,
        "prepare_time" => 0,
        "cooking_time" => 0,
        "difficulty" => 0,
        "cooking_utensils" => null,
        "materials" => null,
        "steps" => null,
        "cooking_representation" => null,
        "tags" => null
    ];

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
    */
    public function index()
    {
        return Post::all();
    }

    public function show(Post $post)
    {
        return $post;
    }

    public function relation(Request $request, $id)
    {
        $params = $request->all();

        $limit = DEVICE_ENV==4 ? 3 : 2;

        if(isset($params['limit']) && $params['limit']) $limit = $params['limit'];
        
        $response = [];

        if(!empty($id))
        {
            $post = Post::FindOrFail($id);

            $cate = $post->cate;

            $data = Post::
                        with('user')
                        ->where('cate', $cate)
                        ->where('id','<>',$id)
                        ->where('status',1)
                        ->inRandomOrder()->limit($limit)->get()
                        ->toArray();
            
            $response['result'] = !empty($data) ? $data : [];
        }

        return json_encode($response);
    }

    public function store(Request $request)
    {
        $user = $this->isAuthenticated();

        if(is_array($user))
        {
            if($request->json()->all())
            {
                $params = $request->json()->all();

                foreach($params as &$item)
                {
                    if(is_array($item))
                        $item = json_encode($item);
                }
                unset($item);
            }
            else{
                $params = $request->all();
            }

            if(empty($params))
            {
                $params = $request->getContent();
                if(!empty($params))
                {
                    $params = str_replace('}:', '}', $params);
                    $params = json_decode($params, true);
                }
            }
            
            //If public
            if(isset($params['status']) && $params['status'] == 1)
            {
                $rules = $this->rules;
            }
            else{ //save draf
                $rules = [];
            }

            $validate = $this->validateParams($params, $rules);
            
            if(is_array($validate) && $validate['status'] == 200)
            {
                $post_id = 0;

                // $params["materials"] = isset($params['materials']) ? json_encode($params['materials']) : null;
                // $params["steps"] = isset($params['steps']) ? json_encode($params['steps']) : null;
                // $params["cooking_representation"] = isset($params['cooking_representation']) ? json_encode($params['cooking_representation']) : null;
                
                $params = array_intersect_key($params, $this->paramsDefault);

                $params['user_id'] = $user['id'];

                $post = $this->process($post_id, $params);

                return response()->json($post, 201);
            }
            else{
                return response()->json($validate, 401);
            }
        }

        return response()->json($user, 401);
        
    }

    public function update(Request $request, $id)
    {
        $user = $this->isAuthenticated();

        if(is_array($user))
        {
            if($request->json()->all())
            {
                $params = $request->json()->all();

                foreach($params as &$item)
                {
                    if(is_array($item))
                        $item = json_encode($item);
                }
                unset($item);
            }
            else{
                $params = $request->all();
            }

            //If not save draf
            if(isset($params['status']) && $params['status'] != 3)
            {
                $rules = $this->rules;
            }
            else{
                $rules = [];
            }

            $validate = $this->validateParams($params, $rules);
    
            if(is_array($validate) && $validate['status'] == 200)
            {
                $post = Post::FindOrFail($id);

                if($user['id'] == $post->user_id && $post->status != 0)
                {
                    $post_id = $post->id;

                    // $params["materials"] = isset($params['materials']) ? json_encode($params['materials']) : $post->materials;
                    // $params["steps"] = isset($params['steps']) ? json_encode($params['steps']) : $post->steps;
                    // $params["cooking_representation"] = isset($params['cooking_representation']) ? json_encode($params['cooking_representation']) : $post->cooking_representation;

                    $params = array_intersect_key($params, $this->paramsDefault);
                    // var_dump('<pre>', $params);die;

                    $post = $this->process($post_id, $params, $post);

                    return response()->json($post, 201);
                }
                else{
                    return response()->json(["You're not owner"], 401);
                }
            }
            else{
                return response()->json($validate, 401);
            }
        }
    }

    public function delete(Request $request, $id)
    {
        $user = $this->isAuthenticated();

        if(is_array($user))
        {
            if($request->json()->all())
            {
                $params = $request->json()->all();
            }
            else{
                $params = $request->all();
            }

            if(!empty($id))
            {
                $post_ids = explode(',', $id);

                foreach($post_ids as $item)
                {
                    $post = Post::FindOrFail($item);

                    if($user['id'] == $post->user_id && $post->status != 0)
                    {
                        $params = array(
                                'status' => 0,
                                'deleted_at' => date('Y-m-d H:i:s')
                            );
                    
                        $post->update($params);

                        $this->updateStatictisUser($post->user_id);

                        // $post->delete();

                        // return response()->json(null, 204);
                    }
                    // else{
                    //     return response()->json(["You're not owner"], 401);
                    // }
                } 

                return response()->json(null, 204);
            }
            
        }
    }

    public function process($post_id, $params, $post = null)
    {
        # edit
        if($post_id > 0)
        {
            $post->update($params);
        }
        else{

            $post = Post::create($params);
            
            $this->updateStatictisUser($params['user_id']);

            //update total_post for user
            // $user = User::FindOrFail($params['user_id']);

            // $params_where = [
            //     'user_id' => $params['user_id'],
            //     'status' => 1
            // ];

            // $total = Post::where($params_where)->count();

            // $params_up = [
            //     'total_post' => $total
            // ];

            // $user->update($params_up);

            $post_id = $post->id;
        }

        # Tags
        $this->processTags($post_id, $params);

        # Cooking utensils
        $this->processUtensils($post_id, $params);

        # Materials
        $this->processMaterials($post_id, $params);

        # Move media
        $this->moveMedia($params, $post);

        return $post;
    }

    public function processTags($post_id, $params)
    {
        if(isset($params['tags']) && $post_id > 0)
        {   
            if(!empty($params['tags']))
            {
                $tags_name = explode(',', $params['tags']);

                //get tags exist already
                $tags = DB::table('tags')
                            ->whereIn('name', $tags_name)
                            ->get()
                            ->pluck('name')
                            ->toArray();
                //list new tags
                $tags_new = array_values(array_diff($tags_name,$tags));

                //insert new tags to DB: tags
                foreach($tags_new as &$item)
                {
                    $item = [
                        'name' => $item,
                        'status' => 1, 
                        'created_at' => date('Y-m-d H:i:s'),
                        'updated_at' => date('Y-m-d H:i:s')
                    ];
                }
                unset($item);

                DB::table('tags')
                    ->insert($tags_new);
            }

            //case edit -> delete all old tags
            DB::table('taggables')
                ->where('taggable_id', $post_id)
                ->delete();


            //insert tags into taggable
                //get tags exist already
            if(!empty($params['tags']))
            {
                $tags_name = explode(',', $params['tags']);

                $tags_id = DB::table('tags')
                                ->whereIn('name', $tags_name)
                                ->get()
                                ->pluck('id')
                                ->toArray();

                foreach($tags_id as &$item)
                {
                    $item = [
                        'tag_id' => $item,
                        'taggable_id' => $post_id,
                        'taggable_type' => 'Post',
                        'created_at' => date('Y-m-d H:i:s'),
                        'updated_at' => date('Y-m-d H:i:s')
                    ];
                }
                unset($item);
        
                DB::table('taggables')
                    ->insert($tags_id);

            }
        }
    }

    public function processUtensils($post_id, $params)
    {
        if(isset($params['cooking_utensils']) && $post_id > 0)
        {   
            if(!empty($params['cooking_utensils']))
            {
                $utensils_name = explode(',', $params['cooking_utensils']);

                //get tags exist already
                $utensils = DB::table('utensil')
                            ->whereIn('name', $utensils_name)
                            ->get()
                            ->pluck('name')
                            ->toArray();
                //list new tags
                $utensils_new = array_values(array_diff($utensils_name,$utensils));

                //insert new tags to DB: tags
                foreach($utensils_new as &$item)
                {
                    $item = [
                        'name' => $item,
                        'status' => 1, 
                        'created_at' => date('Y-m-d H:i:s'),
                        'updated_at' => date('Y-m-d H:i:s')
                    ];
                }
                unset($item);

                DB::table('utensil')
                    ->insert($utensils_new);
            }

            //case edit -> delete all old tags
            DB::table('objects_ables')
                ->where('object_able_id', $post_id)
                ->delete();


            //insert tags into taggable
                //get tags exist already
            if(!empty($params['cooking_utensils']))
            {
                $utensils_name = explode(',', $params['cooking_utensils']);

                $utensils_id = DB::table('utensil')
                                ->whereIn('name', $utensils_name)
                                ->get()
                                ->pluck('id')
                                ->toArray();

                foreach($utensils_id as &$item)
                {
                    $item = [
                        'object_id' => $item,
                        'object_able_id' => $post_id,
                        'type' => 'Utensil',
                        'created_at' => date('Y-m-d H:i:s'),
                        'updated_at' => date('Y-m-d H:i:s')
                    ];
                }
                unset($item);
        
                DB::table('objects_ables')
                    ->insert($utensils_id);

            }
        }
    }

    public function processMaterials($post_id, $params)
    {
        if(isset($params['materials']) && $post_id > 0)
        {   
            $materials_name = array();

            if(!empty($params['materials']))
            {
                $materials = json_decode($params['materials'], true);

                foreach($materials as $item)
                {
                    if(isset($item['name']) && !empty($item['name']))
                    {
                        $materials_name[] = $item['name'];
                    }
                }
            }

            if(!empty($materials_name))
            {
                //get materials exist already
                $materials = DB::table('material')
                            ->whereIn('name', $materials_name)
                            ->get()
                            ->pluck('name')
                            ->toArray();

                //list new materials
                $materials_new = array_values(array_diff($materials_name,$materials));

                //insert new materials to DB: materials
                foreach($materials_new as &$item)
                {
                    $item = [
                        'name' => $item,
                        'status' => 1, 
                        'created_at' => date('Y-m-d H:i:s'),
                        'updated_at' => date('Y-m-d H:i:s')
                    ];
                }
                unset($item);

                DB::table('material')
                    ->insert($materials_new);
            }

            //case edit -> delete all old materials
            DB::table('objects_ables')
                ->where('object_able_id', $post_id)
                ->delete();

            //insert materials into objects_ables
                //get materials exist already
            if(!empty($materials_name))
            {
                $materials_id = DB::table('material')
                                ->whereIn('name', $materials_name)
                                ->get()
                                ->pluck('id')
                                ->toArray();

                foreach($materials_id as &$item)
                {
                    $item = [
                        'object_id' => $item,
                        'object_able_id' => $post_id,
                        'type' => 'Material',
                        'created_at' => date('Y-m-d H:i:s'),
                        'updated_at' => date('Y-m-d H:i:s')
                    ];
                }
                unset($item);
        
                DB::table('objects_ables')
                    ->insert($materials_id);

            }
        }
    }

    public function moveMedia($params, $post)
    {
        $p_update = [];

        //images
        if(isset($params['images']) && !empty($params['images']))
        {
            $medias = json_decode($params['images'], true);
            foreach($medias as &$item)
            {
                $item = $this->moveUploaded($item, 'posts/images/');
            }
            unset($item);
            $p_update['images'] = json_encode($medias);
        }

        //videos
        if(isset($params['videos']) && !empty($params['videos']))
        {
            // $medias = json_decode($params['videos'], true);
            // foreach($medias as &$item)
            // {
            //     $item = $this->moveUploaded($item, 'posts/videos/');
            // }
            // unset($item);
            // $p_update['videos'] = json_encode($medias);
        }
        else{
            unset($p_update['videos']);
        }

        //steps
        if(isset($params['steps']) && !empty($params['steps']))
        {
            $medias = json_decode($params['steps'], true);
            foreach($medias as &$item)
            {
                if(isset($item['images']) && !empty($item['images']))
                {
                    $item['images'] = $this->moveUploaded($item['images'], 'posts/images/');
                }

                if(isset($item['videos']) && !empty($item['videos']))
                {
                    $item['videos'] = $this->moveUploaded($item['videos'], 'posts/videos/');
                }
                
            }
            unset($item);
            $p_update['steps'] = json_encode($medias);
        }

        //cooking_representation
        if(isset($params['cooking_representation']) && !empty($params['cooking_representation']))
        {
            $medias = json_decode($params['cooking_representation'], true);
            foreach($medias as &$item)
            {
                if(isset($item['images']) && !empty($item['images']))
                {
                    $item['images'] = $this->moveUploaded($item['images'], 'posts/images/');
                }

                if(isset($item['videos']) && !empty($item['videos']))
                {
                    $item['videos'] = $this->moveUploaded($item['videos'], 'posts/videos/');
                }
                
            }
            unset($item);
            $p_update['cooking_representation'] = json_encode($medias);
        }

        //materials
        if(isset($params['materials']) && !empty($params['materials']))
        {
            $medias = json_decode($params['materials'], true);
            foreach($medias as &$item)
            {
                if(isset($item['images']) && !empty($item['images']))
                {
                    $item['images'] = $this->moveUploaded($item['images'], 'posts/images/');
                }

                if(isset($item['videos']) && !empty($item['videos']))
                {
                    $item['videos'] = $this->moveUploaded($item['videos'], 'posts/videos/');
                }
                
            }
            unset($item);
            $p_update['materials'] = json_encode($medias);
        }

        //update medias
        if(!empty($p_update))
        {
            $post->update($p_update);
        }

        return true;
    }

    public function updateStatictisUser($user_id)
    {
        if($user_id)
        {
            //update total_post for user
            $user = User::FindOrFail($user_id);

            $params_where = [
                'user_id' => $user_id,
                'status' => 1
            ];

            $total = Post::where($params_where)->count();

            $total_point = 0;
            // get config point
            $point = Point::select('point')
                            ->where('type', 'LIKE', '%Recipe%')->get();
            if($point)
            {
                $total_point = $total*$point[0]['point'] + $user->bonus_point + $user->cmt_point + $user->talk_point;
            }

            $params_up = [
                'total_post' => $total,
                'post_point' => $total*$point[0]['point']
            ];

            if($total_point > 0)
            {
                $params_up['total_point'] = $total_point;
            }

            $user->update($params_up);

            return true;
        }
        
        return false;
    }

    function getpost(Request $request){
        $ret = POST::selectRaw('user_id, sum(total_cmt) as total_cmt')->where('status', 1)->groupBy('user_id')->orderBy('total_cmt', 'desc')->paginate(5)->toArray();
        $arr = array();
        foreach ($ret['data'] as $k => $v) {
            $post = POST::where(['status' => 1, 'user_id' => $v['user_id']])->orderBy('total_cmt', 'desc')->limit(DEVICE_ENV==4 ? 4 : 2)->get()->toArray();
            $user = User::find($v['user_id'])->toArray();
            $arr[$k] = $user;
            $arr[$k]['post'] = $post;
        }
        return json_encode(['meta' => ['total_count' => $ret['total'], 'page_size' => 5], 'result' => $arr]);
    }
}
