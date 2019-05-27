<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Support\Facades\DB;

class EventController extends Controller
{
    protected $rules = [

        "title" => "required",
        "content" => "required",
        "desc" => "required",
        "content" => "required",
        "deadline" => "required",
        "media" => "json"

    ];

    protected $paramsDefault = [
        "title" => null,
        "desc" => null,
        "user_id" => 0,
        "content" => null,
        "media" => null,
        "deadline" => null
    ];

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
    */

    public function index()
    {
        return Event::all();
    }

    public function show(Event $event)
    {
        return $event;
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
                $event_id = 0;

                // $params["media"] = isset($params['media']) ? json_encode($params['media']) : null;
                
                $params = array_intersect_key($params, $this->paramsDefault);

                $params['user_id'] = $user['id'];

                $params['status'] = 1;

                $event = $this->process($event_id, $params);

                return response()->json($event, 201);
            }
            else{
                return response()->json($validate, 200);
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
                $event = Event::FindOrFail($id);

                if($user['id'] == $event->user_id && $event->status != 0)
                {
                    $event_id = $event->id;

                    // $params["media"] = isset($params['media']) ? json_encode($params['media']) : $event->media;

                    $params = array_intersect_key($params, $this->paramsDefault);
                    // var_dump('<pre>', $params);die;

                    $event = $this->process($event_id, $params, $event);

                    return response()->json($event, 200);
                }
                else{
                    return response()->json(["You're not owner"], 401);
                }
            }
            else{
                return response()->json($validate, 200);
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

            $event = Event::FindOrFail($id);

            if($user['id'] == $event->user_id && $event->status != 0)
            {
                $params = array(
                        'status' => 0,
                        'deleted_at' => date('Y-m-d H:i:s')
                    );
            
                $event->update($params);
                // $event->delete();

                return response()->json(null, 204);
            }
            else{
                return response()->json(["You're not owner"], 401);
            }
            
        }
    }

    public function process($event_id, $params, $event = null)
    {
        # edit
        if($event_id > 0)
        {
            $event->update($params);
        }
        else{

            $event = Event::create($params);

            $event_id = $event->id;
        }

        # Media
        $this->moveMedia($params, $event);

        return $event;
    }

    public function moveMedia($params, $event)
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
                    $item['images'] = $this->moveUploaded($item['images'], 'events/images/');
                }

                if(isset($item['videos']) && !empty($item['videos']))
                {
                    $item['videos'] = $this->moveUploaded($item['videos'], 'events/videos/');
                }
                
            }
            unset($item);
            $p_update['media'] = json_encode($medias);
        }

        //update medias
        if(!empty($p_update))
        {
            $event->update($p_update);
        }

        return true;
    }


}
