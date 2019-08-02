
<?php 
class encryptString{
    function encrypt($res)
    {
        if (!is_array($res) && sizeof($res) == 0)
            return false;
        //$res = array('username'=> 'vuong', 'mail'=>'1234@gmail.com','phone'=>'452','phone2' => '4151236','birtday'=>'15/3/1998');
        $res = (json_encode($res));
        $res = base64_encode($res);
        // echo $res; echo '</br>';
        $characters = array_merge(range('A','Z'), range('a','z'), range('0','9'));
        $max = count($characters) - 1;
       
        $key = '';
        $randi = 0;

        $maxi = 9;
        $randi = mt_rand(1,$maxi);
        for($i=0 ;$i < strlen($res); $i++)
        {
            $rand = mt_rand(0, $max);
            $replace_char = $characters[$rand];
            if ($i % $randi == 0)
            {           
                $key.= $res[$i];
                $res[$i] = $replace_char;
            }
        } 
        // echo $res; echo '   47 get key  </br>';
        // echo $key; echo '   48 key  </br>';
        $key = base64_encode($key);
        // echo $key; echo '   50  key encode64 </br>';
    // $key = 'abcdef';
        $lengtkey = strlen($key)- 1;
        if (strlen($res) > 15)
        for($i=0 ;$i < ($lengtkey/2); $i++)
        {
            $tmp = $key[$i];
            $key[$i] = $key[$lengtkey - $i];
            $key[$lengtkey - $i] = $tmp; 
        } 
        

        // echo $key; echo '   61  key change position </br>';
        return str_replace('=','',base64_encode($key.$randi.'tilps9102a4a1'.$res));
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
        // echo $key;  echo '   72 key default </br>';
        $key =  base64_decode($key);
        // echo $key =  base64_decode($key); echo '   key decoded </br>';
        $j = 0;
        for($i=0 ;$i < strlen($res); $i++)
        {
            if ($i % $randi == 0)
            {
                $res[$i] = $key[$j];
                $j++;
            }
        }
        // echo $res; echo '</br>';
        // echo base64_decode($res);
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
      //  echo date('Y-m-d H:i:s',time());
    }
}
