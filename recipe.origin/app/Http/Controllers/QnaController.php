<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Qna;
use Illuminate\Support\Facades\DB;

class QnaController extends Controller
{
    protected $rules = [
        "subject" => "required",
        "title" => "required",
    ];

    protected $paramsDefault = [
        "title" => null,
        "subject" => null,
        "user_id" => 0,
        "images" => null
    ];

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
    */

    public function index()
    {
        return Qna::all();
    }

    public function show(Qna $qna)
    {
        return $qna;
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
                $qna_id = 0;

                // $params["media"] = isset($params['media']) ? json_encode($params['media']) : null;
                
                $params = array_intersect_key($params, $this->paramsDefault);

                $params['user_id'] = $user['id'];

                $params['object_type'] = 'Qna';

                $params['status'] = 2;

                $qna = $this->process($qna_id, $params);

                return response()->json($qna, 201);
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
                $qna = Qna::FindOrFail($id);

                if($user['id'] == $qna->user_id && $qna->status != 0)
                {
                    $qna_id = $qna->id;

                    // $params["media"] = isset($params['media']) ? json_encode($params['media']) : $qna->media;

                    $params = array_intersect_key($params, $this->paramsDefault);
                    // var_dump('<pre>', $params);die;

                    $qna = $this->process($qna_id, $params, $qna);

                    return response()->json($qna, 200);
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

            $qna = Qna::FindOrFail($id);

            if($user['id'] == $qna->user_id && $qna->status != 0)
            {
                $params = array(
                        'status' => 0,
                        'deleted_at' => date('Y-m-d H:i:s')
                    );
            
                $qna->update($params);
                // $qna->delete();

                return response()->json(null, 204);
            }
            else{
                return response()->json(["You're not owner"], 401);
            }
            
        }
    }

    public function process($qna_id, $params, $qna = null)
    {
        # edit
        if($qna_id > 0)
        {
            $qna->update($params);
        }
        else{

            $qna = Qna::create($params);

            $qna_id = $qna->id;
        }

        # Media
        $this->moveMedia($params, $qna);

        return $qna;
    }

    public function moveMedia($params, $qna)
    {
        $p_update = [];

        //images
        if(isset($params['images']) && !empty($params['images']))
        {
            $medias = json_decode($params['images'], true);
            foreach($medias as &$item)
            {
                $item['images']= $this->moveUploaded($item['images'], 'qna/');
            }
            unset($item);
            $p_update['images'] = json_encode($medias);
        }

        //update medias
        if(!empty($p_update))
        {
            $qna->update($p_update);
        }

        return true;
    }


}
