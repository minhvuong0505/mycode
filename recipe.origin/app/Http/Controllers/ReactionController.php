<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Talk;
use App\Models\Comment;
use App\Models\User;
use App\Models\Reaction;
use Illuminate\Support\Facades\DB;

class ReactionController extends Controller
{
    protected $rules = [
        "user_id" => "required|numeric",
        // "author_id" => "required|numeric",
        "object_id" => "required",
        "object_type" => "required",
        "type" => "required",
        "action" => "required",
    ];

    public function __construct()
    {
        // $this->middleware('api.auth');

        // Only apply to a subset of methods.
        // $this->middleware('api.auth', ['only' => ['show', 'store', 'update', 'delete']]);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
    */

    public function view(Request $request)
    {
        if($request->json()->all())
        {
            $params = $request->json()->all();
        }
        else{
            $params = $request->all();
        }

        $validate = $this->validateParams($params, $this->rules);

        if(is_array($validate) && $validate['status'] == 200)
        {
            //update view for post
            if($params['object_id'] > 0)
            {
                $post = Post::FindOrFail($params['object_id']);

                $params['author_id'] = $post->user_id;

                $params_up = [
                    'total_view' => $post->total_view + 1
                ];

                $post->update($params_up);
            }

            // if($params['user_id'] > 0)
            // {
            //     $user = $this->isAuthenticated();

            //     if(is_array($user))
            //     {
            //         $params['user_id'] = $user['id'];
            //     }
            // }

            $table = new Post;

            //update statistics
            $this->updateTotal($params, $table);
        }
        else{
            return response()->json($validate, 401);
        }
    
        return response(["message"=>"success"], 200);
    }

    /* 
    * Reaction for: Like/Unlike, Save/Unsave
    * params: {object_id: 8, object_type: Post, type: Like, action: 1} action 1: Like/Save, 0: is Unlike/Unsave
    */
    public function react(Request $request)
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

            $params['user_id'] = $user['id'];

            $validate = $this->validateParams($params, $this->rules);

            if(is_array($validate) && $validate['status'] == 200)
            {

                if($params['object_type'] == 'Post')
                {
                    $table = new Post;
                    $result = $this->updateTotal($params, $table);
                }

                if($params['object_type'] == 'Comment')
                {
                    $table = new Comment;
                    $result = $this->updateTotal($params, $table);
                }

                if($params['object_type'] == 'Talk')
                {
                    $table = new Talk;
                    $result = $this->updateTotal($params, $table);
                }

            }
            else{
                return response()->json($validate, 401);
            }

            if($result)
            {
                return response()->json($result, 200);
            }
            else{
                return response()->json(["message"=>"error"], 401);
            }
            
        }

        return response()->json($user, 404);
    }

    public function updateTotal($params, $table)
    {
        $result = false;

        $object_id = $params['object_id'];
        
        if($object_id > 0)
        {
            //check user reaction
            $params_where = [
                'object_id' => $object_id,
                'object_type' => $params['object_type'],
                'type' => $params['type'],
                'user_id' => $params['user_id']
            ];
            
            $reaction = Reaction::where($params_where)
                                ->first();

            $table_ = $table->FindOrFail($object_id);

            $params['author_id'] = $table_->user_id;

            if($params['type'] == 'Save' && $table_->user_id == $params['user_id'])
                return json_encode(['message' => 'You do not need save/unsave your post']);

            // had been react
            if($reaction)
            {   
                if($params['type'] == 'View')
                {
                    $result = true;
                }
                else{
                    
                    //Like/Save
                    if($reaction->status == 1)
                    {
                        // Unlike/Unsave
                        if($params['action'] == 0)
                        {
                            $params_up = [
                                'status' => 0
                            ];
            
                            $reaction->update($params_up);

                            $result = true;
                        }
                        else{
                            return json_encode(['message' => 'You had been "'.$params['type'].'"']);
                        }
                    }
                    else{
                        // Like/Save
                        if($params['action'] == 1)
                        {
                            $params_up = [
                                'status' => 1
                            ];
                
                            $reaction->update($params_up);

                            $result = true;
                        }
                        else{
                            return json_encode(['message' => 'You had been "Un'.$params['type'].'"']);
                        }
                    }

                }

            }
            else{
        
                $params_cr = [
                    'object_id' => $object_id,
                    'object_type' => $params['object_type'],
                    'type' => $params['type'],
                    'user_id' => $params['user_id'],
                    'author_id' => $params['author_id'],
                    'status' => 1
                ];

                Reaction::create($params_cr);

                $result = true;
            }

            if($params['type'] == 'View')
                $result = true;

            if($result)
            {
                //update statistics user
                $this->updateSatisticsUser($params);

                //update statistics Object
                $this->updateSatisticsObject($params, $table);

                return $params_where;
            }

        }
        
        return false;
    }

    public function unReact(Request $request)
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

            $params['user_id'] = $user['id'];

            $validate = $this->validateParams($params, $this->rules);

            if(is_array($validate) && $validate['status'] == 200)
            {

                if(!empty($params['object_id']))
                {
                    $post_ids = explode(',', $params['object_id']);

                    $params_up = [
                        'status' => 0
                    ];

                    $params_where = [
                        'object_type' => 'Post',
                        'type' => $params['type'],
                        'user_id' => $params['user_id'],
                        'status' => 1
                    ];

                    $result = Reaction::where($params_where)
                        ->whereIn('object_id', $post_ids)
                        ->update($params_up);

                    if($result)
                    {
                        //update satistics for user
                        // $this->updateSatisticsUser($params_where);

                        //update statistics for post
                        foreach($post_ids as $item)
                        {
                            $table = new Post;

                            $table_ = $table->FindOrFail($item);

                            $params = [
                                'object_id' => $item,
                                'object_type' => 'Post',
                                'type' => $params['type'],
                                'author_id' => $table_->user_id,
                                'status' => 1
                            ];
                            
                            //update statistics for objects
                            $this->updateSatisticsObject($params, $table);
                            // update satistics for user
                            $this->updateSatisticsUser($params);
                        }

                    }

                    return response()->json(["message"=>"success"], 200);
                }
                else{
                    return response()->json(["message"=>"Page not found"], 404);
                }

            }
            else{
                return response()->json($validate, 401);
            }
            
        }

        return response()->json($user, 404);
    }

    /* 
    * Update total_like, total_view, total_save User
    * params: author_id, type
    */
    public function updateSatisticsUser($params)
    {
        $author_id = $params['author_id'];

        if($author_id > 0)
        {
            $user = User::FindOrFail($author_id);

            $type = $params['type'];

            if($type != 'View')
            {
                $params_where = [
                    'author_id' => $author_id,
                    'object_type' => $params['object_type'],
                    'type' => $type,
                    'status' => 1
                ];

                $total = Reaction::where($params_where)->count();
            }
            else{
                $params_where = [
                    'user_id' => $author_id,
                    'status' => 1
                ];

                $total = Post::where($params_where)
                                    ->sum('total_view');
            }

            $total_key = 'total_'.strtolower($type);

            $params_up = [
                $total_key => $total
            ];

            $user->update($params_up);
        }
        
    }

    /* 
    * Update total_like, total_view, total_save Object: post/comment
    * params: user_id, type
    */
    public function updateSatisticsObject($params, $table)
    {
        $object_id = $params['object_id'];

        if($object_id > 0)
        {
            $table = $table->FindOrFail($object_id);

            $type = $params['type'];

            if($type != 'View')
            {
                $params_where = [
                    'object_id' => $object_id,
                    'object_type' => $params['object_type'],
                    'type' => $type,
                    'status' => 1
                ];

                $total = Reaction::where($params_where)->count();

                $total_key = 'total_'.strtolower($type);

                $params_up = [
                    $total_key => $total
                ];

                $table->update($params_up);
            }
        }
        
    }

}
