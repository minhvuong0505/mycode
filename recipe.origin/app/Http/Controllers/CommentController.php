<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\Post;
use App\Models\Talk;
use App\Models\Event;
use App\Models\Point;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class CommentController extends Controller
{
    protected $rules = [
        // "user_id" => "required|numeric",
        "content" => "required",
        "object_id" => "required|numeric",
        "object_type" => "required",
        // "type" => "required",
    ];

    protected $paramsDefault = [
        'content' => null,
        'object_id' => 0,
        'object_type' => null,
        'parent_id' => 0,
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

    public function index()
    {
        return Comment::all();
    }

    public function show($id)
    {
        $user = $this->isAuthenticated();

        var_dump('<pre>', $user);die;

        if(is_array($user))
        {
            $comment = Comment::FindOrFail($id);

            if($user['id'] == $comment->user_id)
            {
                return response()->json($comment, 200);
            }
            else{
                return response()->json(["You're not owner"], 401);
            }
        }
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

            $validate = $this->validateParams($params, $this->rules);
    
            if(is_array($validate) && $validate['status'] == 200)
            {
                $comment_id = 0;

                $params = array_intersect_key($params, $this->paramsDefault);

                $params['user_id'] = $user['id'];

                $params['status'] = 1;

                $comment = $this->process($comment_id, $params);

                //update total comment for objects
                $this->updateStatisticsComment($params);

                return response()->json($comment, 201);
            }
            else{
                return response()->json($validate, 401);
            }
            
        }
        
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

            $validate = $this->validateParams($params, $this->rules);
    
            if(is_array($validate) && $validate['status'] == 200)
            {
                $comment = Comment::FindOrFail($id);

                if($user['id'] == $comment->user_id && $comment->status != 0)
                {
                    $comment_id = $comment->id;

                    $params = array_intersect_key($params, $this->paramsDefault);

                    $comment = $this->process($comment_id, $params, $comment);

                    //update total comment for objects
                    // do not need update

                    return response()->json($comment, 200);
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

            $rules = $this->rules;

            unset($rules['content']);

            $validate = $this->validateParams($params, $rules);
    
            if(is_array($validate) && $validate['status'] == 200)
            {
                $params['user_id'] = $user['id'];

                $comment = Comment::FindOrFail($id);

                if( $user['id'] == $comment->user_id 
                    && $comment->status != 0
                    && $comment->object_id == $params['object_id']
                    && $comment->object_type == $params['object_type']
                )
                {
                    $params_up = array(
                            'status' => 0,
                            'deleted_at' => date('Y-m-d H:i:s')
                        );
                
                    $comment->update($params_up);
                    // $comment->delete();

                    //update total comment for objects
                    $this->updateStatisticsComment($params);

                    return response()->json(null, 204);
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

    public function process($comment_id, $params, $comment = null)
    {
        # edit Comment
        if($comment_id > 0)
        {
            $comment->update($params);
        }
        else{

            $comment = Comment::create($params);

            $comment_id = $comment->id;
        }

        return $comment;
    }

    /* 
    * Update total_comment for user, post
    * params: user_id, object_type
    */
    public function updateStatisticsComment($params)
    {
        $object_id = $params['object_id'];
        $user_id = $params['user_id'];
        
        if($user_id > 0)
        {
            $user = User::FindOrFail($user_id);

            //check user comment
            $params_where = [
                'user_id' => $user_id,
                // 'object_type' => $params['object_type'],
                'status' => 1
            ];

            $total = Comment::where($params_where)->count();

            $total_point = 0;
            // get config point
            $point = Point::select('point')
                            ->where('type', 'LIKE', '%Comment%')->get();
            
            if($point)
            {
                $total_point = $total*$point[0]['point'] + $user->bonus_point + $user->post_point + $user->talk_point;
            }

            $params_up = [
                'total_cmt' => $total,
                'cmt_point' => $total*$point[0]['point']
            ];

            if($total_point > 0)
            {
                $params_up['total_point'] = $total_point;
            }

            $user->update($params_up);
        }
        
        if($object_id > 0)
        {
            if(isset($params['object_type']) && $params['object_type'] == 'Post')
            {
                $table = new Post;
            }

            if(isset($params['object_type']) && $params['object_type'] == 'Talk')
            {
                $table = new Talk;
            }

            if(isset($params['object_type']) && $params['object_type'] == 'Event')
            {
                $table = new Event;
            }

            // $table = $table->FindOrFail($object_id);

            //check comment for object
            $params_where = [
                'object_id' => $object_id,
                'object_type' => $params['object_type'],
                'parent_id' => 0,
                'status' => 1
            ];

            $total_parent = Comment::where($params_where)->count();
            $raw = 'SELECT COUNT( * ) as total
                    FROM comment c1
                    LEFT JOIN comment c2 ON c2.parent_id = c1.id
                    WHERE c2.parent_id > 0 
                    AND c2.object_id = '.$object_id.'
                    AND c2.object_type = "'.$params['object_type'].'"
                    AND c1.status = 1
                    AND c2.status = 1';
            $total_child = DB::select($raw);
            // var_dump('<pre>', $total_parent, $total_child[0]->total);die;
            $params_up = [
                'total_cmt' => $total_parent + $total_child[0]->total
            ];

            $table->where('id',$object_id)->update($params_up);

            return true;
        }
        
        return false;
    }


}
