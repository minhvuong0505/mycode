<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Models\User;
use Hash;
use App\Controllers\UserController;

class BomloginController extends Controller
{
    function login(){
        

        
       
        return view('bom.bomlogin');
    }


    function decrypt($string){
        $part = explode('tilps9102a4a1',base64_decode($string));
        $key = $part[0];
        $randi = $key[strlen($key) -1];
        $res = $part[1];
      
        $lengtkey = strlen($key)- 2;
        for($i=0 ;$i < ($lengtkey/2); $i++)
        {
            $tmp = $key[$i];
            $key[$i] = $key[$lengtkey - $i];
            $key[$lengtkey - $i] = $tmp;   
        } 
        $key =  base64_decode($key);
        $j = 0;
        for($i=0 ;$i < strlen($res); $i++)
        {
            if ($i % $randi == 0)
            {
                $res[$i] = $key[$j];
                $j++;
            }
        }
    
        $res = base64_decode($res);
        $res = str_replace('"','', $res);

        $resultArray = [];

        if ($resSplit = explode(',',$res))
        {     
            if (sizeof($resSplit) > 1)
            for($i = 0; $i < sizeof($resSplit)  ;$i++)
            {
                if($i == 0 || $i == sizeof($resSplit) - 1)
                { 
                    $resSplit[$i] = str_replace('{','',$resSplit[$i]);
                    $resSplit[$i] = str_replace('}','',$resSplit[$i]);
                }
                $childArray = explode(':',$resSplit[$i]);
                $resultArray[$childArray[0]] = $childArray[1];
            }
        }
        
        return !empty($resultArray) ? $resultArray : $res;
      
    }
}