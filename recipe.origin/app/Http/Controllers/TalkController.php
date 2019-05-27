<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Talk;
use App\Models\Point;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class TalkController extends Controller
{
    protected $rules = [

        // "title" => "required",
        "content" => "required",
        "media" => "json"

    ];

    protected $paramsDefault = [
        "title" => null,
        "media" => null,
        "user_id" => 0,
        "content" => null
    ];

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
    */

    public function index()
    {
        return Talk::all();
    }

    public function show(Talk $talk)
    {
        return $talk;
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
                $talk_id = 0;

                // $params["media"] = isset($params['media']) ? json_encode($params['media']) : null;
                
                $params = array_intersect_key($params, $this->paramsDefault);

                $params['user_id'] = $user['id'];

                $params['status'] = 1;

                $talk = $this->process($talk_id, $params);

                return response()->json($talk, 201);
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
                $talk = Talk::FindOrFail($id);

                if($user['id'] == $talk->user_id && $talk->status != 0)
                {
                    $talk_id = $talk->id;

                    // $params["media"] = isset($params['media']) ? json_encode($params['media']) : $talk->media;

                    $params = array_intersect_key($params, $this->paramsDefault);
                    // var_dump('<pre>', $params);die;

                    $talk = $this->process($talk_id, $params, $talk);

                    return response()->json($talk, 200);
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
                $talks_ids = explode(',', $id);

                foreach($talks_ids as $item)
                {
                    $talk = Talk::FindOrFail($item);

                    if($user['id'] == $talk->user_id && $talk->status != 0)
                    {
                        $params = array(
                                'status' => 0,
                                'deleted_at' => date('Y-m-d H:i:s')
                            );
                    
                        $talk->update($params);

                        $this->updateStatictisUser($talk->user_id);
                        
                        // $talk->delete();

                        // return response()->json(null, 204);
                    }
                    // else{
                    //     return response()->json(["You're not owner"], 401);
                    // }
                } 

                return response()->json(["Delete success"], 204);
            }

            return response()->json($user, 200);
            
        }
    }

    public function process($talk_id, $params, $talk = null)
    {
        if(isset($params['media']) && empty($params['media']))
        {
            $params['media'] = "{}";
        }

        # edit
        if($talk_id > 0)
        {
            $talk->update($params);
        }
        else{

            $talk = Talk::create($params);

            $talk_id = $talk->id;

            $this->updateStatictisUser($talk->user_id);
        }

        # Media
        $this->moveMedia($params, $talk);

        return $talk;
    }

    public function moveMedia($params, $talk)
    {
        $p_update = [];

        //media
        if(isset($params['media']) && !empty($params['media']))
        {
            $medias = json_decode($params['media'], true);
            foreach($medias as &$item)
            {
                if(isset($item['images']) && !empty($item['images']))
                {
                    $item['images'] = $this->moveUploaded($item['images'], 'talks/images/');
                }

                if(isset($item['videos']) && !empty($item['videos']))
                {
                    $item['videos'] = $this->moveUploaded($item['videos'], 'talks/videos/');
                }
                
            }
            unset($item);
            $p_update['media'] = json_encode($medias);
        }

        //update medias
        if(!empty($p_update))
        {
            $talk->update($p_update);
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

            $total = Talk::where($params_where)->count();

            $total_point = 0;
            // get config point
            $point = Point::select('point')
                            ->where('type', 'LIKE', '%Talk%')->get();
            if($point)
            {
                $total_point = $total*$point[0]['point'] + $user->bonus_point + $user->post_point + $user->cmt_point;
            }

            $params_up = [
                'total_talk' => $total,
                'talk_point' => $total*$point[0]['point']
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
}
