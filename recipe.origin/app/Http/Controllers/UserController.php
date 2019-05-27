<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use App\Models\User;
use App\Notifications\UserNotify;
use Illuminate\Support\Facades\Hash;
use JWTAuth;
use DB;

class UserController extends Controller
{
    //https://regex101.com/r/lC1vM1/1
    protected $rules = [
        'name'  => 'required',
        'birthday' => 'required',
        'gender' => 'required',
        'phone' => 'required'
    ];

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
        'auth_type' => null,
        'old_email' => null
    ];

    /** 
     * login api 
     * 
     * @return \Illuminate\Http\Response 
     */
    public function checkLogin(){
        if(Session::has('user')){
            return response()->json(array(
                'status' => true
            ), 201);   
        }
    }
    /** 
     * login api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function login(Request $request){ 
        $data = [
    		'name'=>$request->id,
    		'password'=>$request->password,
        ];
        
        if(Auth::attempt($data)){ 
            $user = Auth::user(); 
            //set session
            Session::save('user', $user);
            return response()->json(array(
                'status' => true,
                'data' => $data,
                'msg' => 'Login successfully'
            ), 201); 
        } 
        else{ 
            return response()->json(['error'=>'Unauthorised'], 401);  
        } 
    }

    /** 
     * login api 
     * 
     * @return \Illuminate\Http\Response 
     */
    public function loginFacebook(Request $request){
        $user = $request->all();
        $email = $user['email'];
        $check = User::where('email', $email)->get()->toArray();

        if($check){
            //login
            $user = [
                'id' => $check['name'],
                'password' => $check['password'],
            ];

            $this->login($user);
        
        }else{
            //register
            return response()->json(array(
                'status' => true,
                'data' => $user,
                'msg' => 'Login successfully'
            ), 201);
        }
    }

    public function show($id)
    {
        $user = $this->isAuthenticated();

        if(is_array($user))
        {
            $me = User::FindOrFail($id);

            if($user['id'] == $me->id)
            {
                return response()->json($user, 200);
            }
            else{
                return response()->json(["You're not owner"], 401);
            }
        }
    }

    public function listChef()
    {
        return User::find(157)->posts;
    }

    public function store(Requests $request)
    {
        $params = $request->all();

        $params['password'] = bcrypt($params['password']);

        if (User::Create($params)) {
            return $this->response->created();
        }

        return $this->response->errorBadRequest();
    }
 
    // string(1) "0"
    // ["adultFl"]=>
    // string(1) "y"
    // ["mode"]=>
    // string(4) "join"
    // ["memId"]=>
    // string(6) "mvuong"
    // ["memPw"]=>
    // string(11) "Mv082183138"
    // ["memPwRe"]=>
    // string(11) "Mv082183138"
    // ["memNm"]=>
    // string(9) "김혜은"
    // ["email"]=>
    // string(16) "mvuong@naver.com"
    // ["emailDomain"]=>
    // string(9) "naver.com"
    // ["cellPhone"]=>
    // string(11) "78799999999"
    // ["phone"]=>
    // string(12) "442724563456"

//     username password password_confirmation name
// year date month gender(m) email_id email_host
// phone_1 phone_2
// auth_code
    public function registerStorebyLogin($params)//add from store
    {
    
        isset($params['cellPhone']) ? $phone = explode('-',$params['cellPhone']) : $phone = array('','','');
        $params['username'] = $params['u'];
        $params['password'] = $params['w'];
        
        $params['name'] = $this->unicodeString($params['memNm']);
        
        $params['birthday'] = $params['birthDt'];
        $params['gender'] = isset($params['sex']) ? $params['sex'] : 'm';
        
        $params['phone'] = $phone[0].$phone[1].$phone[2];
        $params['auth_code'] ='';
        $user_id = 0;
        $params['address'] = $this->unicodeString($params['address']);
        $params = array_intersect_key($params, $this->paramsDefault);

        $params['password'] = bcrypt($params['password']);
        
        $params['status'] = 1; // active user

        $params['auth_code'] = '';

        $user = $this->process($user_id, $params);
        
        return !empty($user) ? true : false;
    }

    function unicodeString($str, $encoding=null) {
        if (is_null($encoding)) $encoding = ini_get('mbstring.internal_encoding');
        return preg_replace_callback('/\\\\u([0-9a-fA-F]{4})/u', function($match) use ($encoding) {
            return mb_convert_encoding(pack('H*', $match[1]), $encoding, 'UTF-16BE');
        }, $str);
    }

    public function registerStore(Request $request)//add from store
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
       
        $params['username'] = $params['memId'];
        $params['password'] = $params['memPw'];
        $params['password_confirmation'] = $params['memPw'] ;
        $params['name'] = $params['memNm'];

        $params['birthday'] = isset($params['birthDt']) ? $params['birthDt'] : '0000-00-00';
        $params['gender'] = isset($params['sex']) ? $params['sex'] : 'm';

     
        $params['phone'] = isset($params['cellPhone']) ? $params['cellPhone'] : '';
        $params['auth_code'] ='';
        $user_id = 0;
        
        $params = array_intersect_key($params, $this->paramsDefault);

        $params['password'] = bcrypt($params['password']); 
        $params['status'] = 1; // active user

        $params['auth_code'] = '';

        $params_where = [
            'username' => $params['username'],
            'email' => isset($params['old_email']) && !empty($params['old_email']) ? $params['old_email'] : $params['email']
        ];

        $user = User::where($params_where)->first();
        if (empty($user))
        {
            $user = $this->process($user_id, $params);
            return response()->json($user, 201);
        } else
        {
            $user = $this->process($user['id'], $params, $user);
            return response()->json($user, 201);
        }
        
    }

    public function register(Request $request)
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

        if(    isset($params['username']) && !empty($params['username'])
            && isset($params['email']) && !empty($params['email'])
            && isset($params['password']) && !empty($params['password'])
            && isset($params['auth_code']) && !empty($params['auth_code'])
        )
        {
            $params_where = [
                'username' => $params['username'],
                'email' => $params['email'],
                'auth_type' => $params['auth_type'],
            ];

            $user = User::where($params_where)->first();
      
            if ($user && !Hash::check($params['password'], $user->password)) {
                return response()->json(['message' => '아이디와, 비밀번호를 다시 확인해주세요.', 'status_code' => 401], 401);
            }
           
            if($user && $user->status == 3)
            {
                if(isset($params['auth_code']) && $params['auth_code'] == $user->auth_code)
                {
                    $params_up['auth_code'] = '';
                    $params_up['status'] = 1; // active user
                    $user = $this->process($user->id, $params_up, $user);

                    return response()->json($user, 201);
                }
                else{
                    return response()->json(['message'=>'Wrong verify code'], 200);
                }
            }

            return response()->json(['message'=>'Not allow'], 404);
        }

        $rules = array_merge($this->rules,
                                [
                                    'username'  => 'required|unique:user|regex:/(^[A-Za-z0-9 ]+$)+/',
                                    'email' => 'required|email|unique:user',
                                    // 'password' => 'required|min:3|max:15|regex:/^.*(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\d\X])(?=.*[!@$#%^&*]).*$/|confirmed',
                                    'password' => 'required|min:3|max:15|regex:/^.*(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@$#%^&*]).*$/|confirmed',
                                    'password_confirmation' => 'required',
                                    'auth_type' => 'required',
                                ]
                            );

        $validate = $this->validateParams($params, $rules);

        if(is_array($validate) && $validate['status'] == 200)
        {
            $user_id = 0;
            
            $params = array_intersect_key($params, $this->paramsDefault);

            $params['password'] = bcrypt($params['password']);

            $params['status'] = 3; // waiting for verify

            $params['auth_code'] = rand(1000, 9999);

            $user = $this->process($user_id, $params);
            
            //send code qua email, sms
            if($user)
            {
                return $this->registerAuth($user);
            }
            
            return response()->json(['message'=>'We sent a verify code. Please check it!'], 201);
        }
        else{
            $messages = $validate->toArray();
            foreach($messages as $field => &$item)
            {
                switch ($field) {
                    case 'name':
                        $item[0] = '이름 필드는 필수 항목입니다.';
                    case 'birthday':
                        $item[0] = '생일 필드가 필요합니다.';
                    case 'gender':
                        $item[0] = '성별 입력란은 필수 입력란입니다.';
                    case 'phone':
                        $item[0] = '전화 입력란은 필수 항목입니다.';
                    case 'username':
                        $item[0] = '사용자 이름 입력란은 필수 항목입니다.';
                    case 'email':
                        $item[0] = '이메일 입력란은 필수 항목입니다.';
                    case 'password':
                        $item[0] = '암호 필드는 필수입니다.';
                    case 'password_confirmation':
                        $item[0] = '암호 확인 필드가 필요합니다.';
                    case 'auth_type':
                        $item[0] = '인증 유형 필드가 필요합니다.';
                }
            }
            unset($item);
            return response()->json($messages, 401);
            // return response()->json($validate, 401); 
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

            $rules = [];

            if(isset($params['password']))
            {
                $rules = ['password' => 'required|min:3|max:15|regex:/^.*(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@$#%^&*]).*$/|confirmed'];
            }

            $validate = $this->validateParams($params, $rules);
    
            if(is_array($validate) && $validate['status'] == 200)
            {
                $user = User::FindOrFail($id);

                if($user['id'] == $user->id)
                {
                    $user_id = $user->id;

                    unset($this->paramsDefault['username']);
                    unset($this->paramsDefault['email']);
                    // unset($this->paramsDefault['phone']);

                    $params = array_intersect_key($params, $this->paramsDefault);

                    $params['birthday'] = date('Y-m-d', strtotime($params['birthday']));

                    if(!empty($params['password']))
                    {
                        $params['password'] = bcrypt($params['password']);
                    }
                    
                  
                    $user = $this->process($user_id, $params, $user);

                    return response()->json($user, 200);
                }
                else{
                    return response()->json(["You're not owner"], 401);
                }
            }
            else{
                return response()->json($validate, 401);
            }
        }
 
        return response()->json($user, 401);
    }

    public function process($user_id, $params, $user = null)
    {
        # edit
        if($user_id > 0)
        {
            $user->update($params);
        }
        else{

            $user = User::create($params);

            $user_id = $user->id;
        }

        # Move media
        $this->moveMedia($params, $user);

        return $user;
    }

    public function moveMedia($params, $user)
    {
        $p_update = [];

        //avatar
        if(isset($params['avatar']) && !empty($params['avatar']))
        {
            $p_update['avatar'] = $this->moveUploaded($params['avatar'], 'users/');
        }

        //cover
        if(isset($params['cover_image']) && !empty($params['cover_image']))
        {
            $p_update['cover_image'] = $this->moveUploaded($params['cover_image'], 'users/cover/');
        }

        //update medias
        if(!empty($p_update))
        {
            $user->update($p_update);
        }

        return true;
    }

    public function registerAuth($user) //$user
    {
        if(!empty($user))
        {
            if($user->auth_type == 'email')
            {
                // $user = new User;
                // $user->email = 'tranquangtuyengss@gmail.com';   // This is the email you want to send to.
                // $user->auth_code = '1234';
                $user->notify(new UserNotify($user));
                // \Notification::send($user, new UserNotify($user));

                return response()->json('Sent verify code', 200);
            }

            if($user->auth_type == 'sms')
            {
                $url = 'https://rest.nexmo.com/sms/json?' . http_build_query([
                    'api_key' => 'ec8cacbd',
                    'api_secret' => 'DytVeur2iGZUkIFT',
                    'to' => $user->phone,
                    'from' => 'Recipe Bom',
                    'text' => 'Your verify code: ' . $user->auth_code
                ]);
            
                $ch = curl_init($url);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                $response = curl_exec($ch);

                $response = json_decode($response, true);
                
                if(isset($response['messages'][0]) && $response['messages'][0]['status'] == 0)
                {
                    return response()->json('Sent verify code', 200);
                }
                
            }
        }

        return response()->json('Can not send verify code. Please try again!', 500);
    }

    public function findId(Request $request)
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

        $rules = [
            'auth_type' => 'required',
            'name' => 'required',
        ];

        $paramsDefault = [
            'auth_type'  => null,
            'name'  => null,
        ];

        if(isset($params['auth_type']) && $params['auth_type'] == 'phone')
        {
            $rules['phone'] = 'required';
            $paramsDefault['phone'] = null;
        }
        if(isset($params['auth_type']) && $params['auth_type'] == 'email')
        {
            $rules['email'] = 'required|email';
            $paramsDefault['email'] = null;
        }

        $validate = $this->validateParams($params, $rules);

        if(is_array($validate) && $validate['status'] == 200)
        {
            $params = array_intersect_key($params, $paramsDefault);

            $ep_key = $ep_val = null;

            if(isset($params['email']))
            {
                $ep_key = 'email';
                $ep_val = $params['email'];
            }

            if(isset($params['phone']))
            {
                $ep_key = 'phone';
                $ep_val = $params['phone'];
            }

            $user = User::select('username', 'created_at')
                        ->where('name', 'LIKE', '%'.$params['name'].'%')
                        ->where($ep_key,$ep_val)
                        ->get()
                        ->makeVisible('username')
                        ->toArray();
            
            if($user)
            {
                foreach($user as &$item)
                {
                    $item['username'] = substr($item['username'], 0, -2) . '**';
                    $item['created_at'] = date('Y.m.d', strtotime($item['created_at']));
                }
                unset($item);

                return response()->json($user, 200);
            }
            else{
                return response()->json(['message'=>'Not found id'], 404);
            }

        }
        else{
            return response()->json($validate, 401);
        }

    }

    public function findPassword(Request $request)
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

        $rules = [
            'auth_type' => 'required',
            'name' => 'required',
            'username' => 'required',
        ];

        $paramsDefault = [
            'auth_type'  => null,
            'name'  => null,
            'username'  => null,
        ];

        if(isset($params['auth_type']) && $params['auth_type'] == 'phone')
        {
            $rules['phone'] = 'required';
            $paramsDefault['phone'] = null;
        }
        if(isset($params['auth_type']) && $params['auth_type'] == 'email')
        {
            $rules['email'] = 'required|email';
            $paramsDefault['email'] = null;
        }

        $validate = $this->validateParams($params, $rules);

        if(is_array($validate) && $validate['status'] == 200)
        {
            $params = array_intersect_key($params, $paramsDefault);

            $ep_key = $ep_val = null;

            if(isset($params['email']) && $params['auth_type'] == 'email')
            {
                $ep_key = 'email';
                $ep_val = $params['email'];
            }

            if(isset($params['phone']) && $params['auth_type'] == 'phone')
            {
                $ep_key = 'phone';
                $ep_val = $params['phone'];
            }

            $user = User::select('id', 'username', 'phone')
                        ->where('username', $params['username'])
                        ->where('name', 'LIKE', '%'.$params['name'].'%')
                        ->where($ep_key,$ep_val)
                        ->get()
                        ->makeVisible(['username', 'phone'])
                        ->first();

            if($user && isset($user->id))
            {
                $customClaims = [
                    'findPassword' => 1, 
                    'auth_type' => $params['auth_type'],
                    'auth_code' => rand(10000,99999)
                ];

                return $this->generateToken($user, $customClaims);

            }
            else{
                return response()->json(['message'=>'User not found'], 404);
            }

        }
        else{
            return response()->json($validate, 401);
        }

    }

    public function sendCodeVerifyPwd(Request $request)
    {
        $user = $this->isAuthenticated();

        $user = json_decode($user);

        if($user && isset($user->user))
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

            $code = $user->payload->auth_code;
            $type = $user->payload->auth_type;

            if(isset($params['auth_type']) && $params['auth_type'] == $type)
            {
                $user = User::FindOrFail($user->user->id);
                $user->auth_code = $code;
                $user->auth_type = $type;

                $this->registerAuth($user);
                
                return response()->json(['message'=>'Sent mail'], 200);
            }
            else{
                return response()->json(['message'=>'Wrong type'], 401);
            }
        }
        return response()->json($user, $user->status_code);
    }

    public function verifyCodePwd(Request $request)
    {
        $user = $this->isAuthenticated();

        $user = json_decode($user);

        if($user && isset($user->user))
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

            $code = $user->payload->auth_code;
            $type = $user->payload->auth_type;

            if(isset($params['auth_code']) && $params['auth_code'] == $code)
            {
                JWTAuth::invalidate(JWTAuth::getToken());

                $user = $user->user;

                $customClaims = [
                    'findPassword' => 1, 
                    'auth' => true
                ];

                return $this->generateToken($user, $customClaims);

            }
            else{
                return response()->json(['message'=>'Wrong code'], 401);
            }

        }

        return response()->json($user, $user->status_code);
    }

    public function changePwd(Request $request)
    {
        $user = $this->isAuthenticated();

        $user = json_decode($user);

        if($user && isset($user->user))
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

            if(isset($user->payload->auth) && $user->payload->auth == 1)
            {
                $rules =  [
                            // 'password' => 'required|min:6|max:15|regex:/^.*(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\d\X])(?=.*[!$#%]).*$/|confirmed',
                            'password' => 'required|min:3|max:15|regex:/^.*(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@$#%^&*]).*$/|confirmed',
                            'password_confirmation' => 'required',
                        ];
                
                $validate = $this->validateParams($params, $rules);

                if(is_array($validate) && $validate['status'] == 200)
                {
                    $user = User::FindOrFail($user->user->id);

                    $params_up = [
                        'password' => bcrypt($params['password'])
                    ];

                    $user->update($params_up);

                    JWTAuth::invalidate(JWTAuth::getToken());

                    return response()->json(['message'=>'Change password success!'], 200);

                }
                else{
                    return response()->json($validate, 401);
                }

            }
            else{
                return response()->json(['message'=>'Not verify'], 401);
            }

        }

        return response()->json($user, $user->status_code);
    }

    function test(){
        $ret = DB::table('user')->find(268);
        dd($ret->toArray());
    }

}
