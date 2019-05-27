<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Banner;
use App\Models\Tag;
use App\Models\Video;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('home');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function getBannerTop(){
        // $banners = Banner::where('position','1')->get();
        $banners = Banner::orderBy('position', 'asc')->limit(3)->get();
        return response()->json($banners, 200);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function getTags(){
        $tags = DB::table('tags')->skip(0)->take(5)->get();
        return response()->json($tags, 200);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function getVideo(){ 
        $videos = Video::where('type','0')->skip(0)->take(1)->get();
        return response()->json($videos, 200);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function getNewRecipes(){
        $posts = DB::table('post')->where('status',1)->skip(0)->take(10)->orderBy('id','desc')->get()->toArray();
        return response()->json(array_chunk($posts,5), 200);
    }

    public function test()
    {
        $url = 'https://rest.nexmo.com/sms/json?' . http_build_query([
            'api_key' => 'ec8cacbd',
            'api_secret' => 'DytVeur2iGZUkIFT',
            'to' => '+84967660065',
            'from' => 'Freetalk.info',
            'text' => 'Hello from Freetalk.info'
        ]);
    
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        
        $response = json_decode($response, true);

        if(isset($response['messages'][0]) && $response['messages'][0]['status'] == 0)
        {
            echo 'Send SMS OK';
        }

        var_dump('<pre>', $response);

        die;
    }

}
