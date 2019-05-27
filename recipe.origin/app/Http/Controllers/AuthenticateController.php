<?php
namespace App\Http\Controllers;

// use App\Http\Requests;
use Illuminate\Http\Request;
use JWTAuth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\UserController;
class AuthenticateController extends Controller
{
    protected $paramsDefault = [
        'username'  => null,
        'email' => null,
        'password' => null,
        'name'  => null,
        'birthday' => null,
        'gender' => null,
        'phone' => null,
        'address' => null,
        'slogan' => null,
        'avatar' => null,
        'sns' => null,
        'cover_image' => null,
        'auth_type' => null
    ];

    /**
     *  API Login, on success return JWT Auth token
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function authenticate(Request $request)
    {
        $__usi = USI;

        // grab credentials from the request
        $credentials = $request->only('username', 'password');

        $customClaims = ['__usi' => $__usi];
        
        try {
            // attempt to verify the credentials and create a token for the user
            if (!$token = JWTAuth::attempt($credentials, $customClaims)) {
                return response()->json(['message' => '아이디와, 비밀번호를 다시 확인해주세요.', 'status' => 401], 401);
            }
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['message' => 'could_not_create_token', 'status' => 500], 500);
        }
        // all good so return the token

        $user = User::where('username', $credentials['username'])->firstOrFail();

        if (!Hash::check($credentials['password'], $user->password)) {
            return response()->json(['message' => '아이디와, 비밀번호를 다시 확인해주세요.', 'status' => 401], 401);
        }

        if ($user->status != 1) {
            return response()->json(['message' => '비활성 사용자', 'status' => 403], 403);
        }

        $this->trackingUser($user->id, $request);
        
      
        return response()->json(compact(['token', 'user']))
                        ->cookie('__usi', $__usi, 60, '/', env('APP_DOMAIN'), true, true);
    }

    function decrypt($string){
        $tmp = $string['0'];
        $string['0'] = $string['15'];
        $string['15'] = $tmp;

        $tmp = $string['5'];
        $string['5'] = $string['10'];
        $string['10'] = $tmp;

        $tmp = $string['9'];
        $string['9'] = $string['13'];
        $string['13'] = $tmp;

        $tmp = $string['20'];
        $string['20'] = $string['25'];
        $string['25'] = $tmp;

        $split = md5(date('d/m/d'));
        $de = base64_decode($string);
        $part = explode($split,base64_decode($string));

        
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

    public function authenticate_store(Request $request)
    {
        $__usi = USI;
        
        // grab credentials from the request
        $credentials = $request->only('accessToken');
        $credentials['accessToken'] = $this->decrypt($credentials['accessToken']);
        $credentials['username'] = $credentials['accessToken']['u'];
        $credentials['password'] = $credentials['accessToken']['w'];
        
        $userClass = new UserController;
        $userInfo = $credentials['accessToken'];
        
        if (isset($userInfo['email']) && !empty($userInfo['email'])) 
        {
            $userExistEmail = User::where('email', $userInfo['email'])
                                ->first();

            $userExistUsername = User::where('username', $userInfo['u'])
                                ->first();
     
            if (empty($userExistEmail) && empty($userExistUsername))
                if($userClass->registerStorebyLogin($userInfo) == false)
                    return response()->json(['message' => 'false'], 401);
        }
        unset($credentials['accessToken']);
        
        $customClaims = ['__usi' => $__usi];
        
        try {
            // attempt to verify the credentials and create a token for the user
            if (!$token = JWTAuth::attempt($credentials, $customClaims)) {
                return response()->json(['message' => '아이디와, 비밀번호를 다시 확인해주세요.', 'status' => 401], 401);
            }
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['message' => 'could_not_create_token', 'status' => 500], 500);
        }
        
        $user = User::where('username', $credentials['username'])->firstOrFail();
       
        // if (isset($userInfo['store_sns']) && $userInfo['store_sns'] == 1)
        // {
        //     $user = User::where('username', $credentials['username'])
        //                 ->where('email', $userInfo['email'])->firstOrFail();
        //     if(empty($user))
        //     return response()->json(['message' => '아이디와, 비밀번호를 다시 확인해주세요.', 'status' => 401], 401);
        // }
        // else
        if (!Hash::check($credentials['password'], $user->password)) {
            return response()->json(['message' => '아이디와, 비밀번호를 다시 확인해주세요.', 'status' => 401], 401);
        }

        if ($user->status != 1) {
            return response()->json(['message' => '비활성 사용자', 'status' => 403], 403);
        }

        $this->trackingUser($user->id, $request);

        return response()->json(compact(['token', 'user']))
                        ->cookie('__usi', $__usi, 60, '/', env('APP_DOMAIN'), true, true);
    }
    

    // authent social
    public function authenticateSocial(Request $request)
    {
        $__usi = USI;

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

        if(!empty($params['email']))
        {
            if(isset($params['from_social']) && $params['from_social'] == 1)
            {
                $user = User::where('email', $params['email'])
                            // ->whereIn('status', array(1,3))
                            ->first();
                
                $params['username'] = $params['email'];
                // var_dump('<pre>', $user);die;

                if(!empty($user) && $user->from_social == 0)
                {
                    // return response()->json(['message' => 'Email had been registered. If you forgot your password, please use: Find Password', 'status' => 401], 401);
                    $params['email'] = $params['social_id'].'@'.$params['social_name'].'.com';

                    $user = User::where('email', $params['email'])
                            ->where('from_social', 1)
                            ->first();
                }
                
                $params['password'] = bcrypt($params['email']);

                if(empty($user))
                {
                    $params['sns'] = json_encode(array('name'=>$params['social_name'], 'id'=>$params['social_id']));

                    // $params['username'] = $params['email'];

                    $params = array_intersect_key($params, $this->paramsDefault);
                    
                    $params['from_social'] = 1;

                    $params['status'] = 1;
                    
                    $user = User::create($params);
                }
            }
            // var_dump('<pre>', $user);die;

            if(!empty($user) && $user->from_social == 1)
            {
                $customClaims = ['__usi' => $__usi];

                $credentials = array('email'=>$params['email'], 'password'=>$params['email']);
                // var_dump('<pre>', $user);die;
                try {
                    // attempt to verify the credentials and create a token for the user
                    if (!$token = JWTAuth::attempt($credentials, $customClaims)) {
                        return response()->json(['message' => '아이디와, 비밀번호를 다시 확인해주세요.', 'status' => 401], 401);
                    }
                } catch (JWTException $e) {
                    // something went wrong whilst attempting to encode the token
                    return response()->json(['message' => 'could_not_create_token', 'status' => 500], 500);
                }

                if ($user->status != 1) {
                    return response()->json(['message' => '비활성 사용자', 'status' => 403], 403);
                }

                // var_dump('<pre>', $user);die;

                $this->trackingUser($user->id, $request);

                return response()->json(compact(['token', 'user']))
                                ->cookie('__usi', $__usi, 60, '/', env('APP_DOMAIN'), true, true);
            }
            else{
                return response()->json(['message' => 'Error while loging, try again!', 'status' => 401], 401);
            }
        }
        else{
            return response()->json(['message' => 'Email is not null', 'status' => 401], 401);
        }
    }
    /**
     * Log out
     * Invalidate the token, so user cannot use it anymore
     * They have to relogin to get a new token
     *
     * @param Request $request
     */
    public function logout(Request $request)
    {
        $this->validate($request, [
            'token' => 'required'
        ]);
        JWTAuth::invalidate($request->input('token'));
    }
    /**
     * Returns the authenticated user
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function authenticatedUser()
    {
        $__usi = USI;

        $token = JWTAuth::getToken();
        $payload = JWTAuth::getPayload($token)->toArray();

        if( //isset($_COOKIE['__usi']) && $_COOKIE['__usi'] === $__usi &&
            isset($payload['__usi']) && $payload['__usi'] === $__usi)
        {
            try {
                if (!$user = JWTAuth::parseToken()->authenticate()) {
                    return response()->json(['message' => 'user_not_found', 'status' => 404], 404);
                }
            } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
                return response()->json(['message' => 'token_expired', 'status' => $e->getStatusCode()], $e->getStatusCode());
            } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
                return response()->json(['message' => 'token_invalid', 'status' => $e->getStatusCode()], $e->getStatusCode());
            } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
                return response()->json(['message' => 'token_absent', 'status' => $e->getStatusCode()], $e->getStatusCode());
            }

            $user = User::FindOrFail($user->id)
                        ->makeVisible(['username', 'phone', 'email', 'birthday', 'slogan']);
            
            // the token is valid and we have found the user via the sub claim
            return $user->toArray();
        }
        else{
            return response()->json(['message' => 'token_expired or not_allow', 'status' => 401], 401);
        }
    }
    /**
     * Refresh the token
     *
     * @return mixed
     */
    public function getToken()
    {
        $token = JWTAuth::getToken();
        if (!$token) {
            return $this->response->errorMethodNotAllowed('Token not provided');
        }
        try {
            $refreshedToken = JWTAuth::refresh($token);
        } catch (JWTException $e) {
            return $this->response->errorInternal('Not able to refresh Token');
        }
        return $this->response->withArray(['token' => $refreshedToken]);
    }
}