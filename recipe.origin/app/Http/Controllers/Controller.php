<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Dingo\Api\Routing\Helpers;
use Illuminate\Support\Facades\Storage;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\DB;
use JWTAuth;
use Validator;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests, Helpers;

    public function isAuthenticated()
    {
        $__usi = USI;
        
        $token = JWTAuth::getToken();
        $payload = JWTAuth::getPayload($token)->toArray();

        if( //isset($_COOKIE['__usi']) && $_COOKIE['__usi'] === $__usi &&
            isset($payload['__usi']) && $payload['__usi'] === $__usi)
        {
            $user = JWTAuth::parseToken()->authenticate();

            try {
                if (!$user) {
                    return json_encode(['message' => 'user_not_found', 'status_code' => 404]);
                }
            } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
                return json_encode(['message' => 'token_expired', 'status_code' => $e->getStatusCode()]);
            } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
                return json_encode(['message' => 'token_invalid', 'status_code' => $e->getStatusCode()]);
            } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
                return json_encode(['message' => 'token_absent', 'status_code' => $e->getStatusCode()]);
            }
            // the token is valid and we have found the user via the sub claim

            if(isset($payload['findPassword']) && $payload['findPassword'] == 1)
            {
                return json_encode(['user' => $user->toArray(), 'payload' => $payload]);
            }
            
            return $user->toArray();
        }
        else{
            return json_encode(['message' => 'token_expired or not_allow', 'status_code' => 401]);
        }
    }

    public function generateToken($user, $customClaims)
    {
        $__usi = USI;

        $customClaims = array_merge($customClaims,
            [
                '__usi' => $__usi
            ]);

        try {
            // attempt to verify the credentials and create a token for the user
            if (!$token = JWTAuth::fromUser($user, $customClaims)) {
                return response()->json(['message' => 'invalid_credentials', 'status_code' => 401], 401);
            }
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['message' => 'could_not_create_token', 'status_code' => 500], 500);
        }

        return response()->json(compact(['token']))
                        ->cookie('__usi', $__usi, 60, '/', env('APP_DOMAIN'), true, true);

    }

    public function validateParams($params, $rules)
    {
        $messages = [
            'status' => 400,
		    // 'required' => 'Trường :attribute bắt buộc nhập.',
		    // 'email'    => 'Trường :attribute phải có định dạng email'
		];
		$validator = Validator::make($params, $rules, $messages);

        if ($validator->fails()) {

            return $validator->messages();

        } else {

        	return ['status' => 200];
        }

    }

    public function moveUploaded($path_file, $pre_fix)
    {
        if(strpos($path_file, 'tmp') !== false)
        {
            //check tmp existed
            if(Storage::disk('frontend')->exists($path_file))
            {
                $filename = basename($path_file);
                $directory = $pre_fix . str_replace('-','', date('Y-m-d'));

                if(!is_dir($directory))
                // if(!File::isDirectory($directory))
                {
                    Storage::disk('frontend')->makeDirectory($directory);
                }

                $path_file = $directory .'/'. $filename;

                if(!Storage::disk('frontend')->exists($path_file))
                {
                    Storage::disk('frontend')->copy(
                        'tmp/' . $filename, 
                        $path_file
                    );
                }
            }
            else{
                $path_file = 'files does not exist';
            }
        }

        return $path_file;
    }

    public function trackingUser($user_id, $request)
    {
        $params = array(
            'last_login_ip' => $request->ip(),
            'last_login_time' => date('Y-m-d H:i:s', time())
        );

        DB::table('user')->where('id',$user_id)->update($params);
    }


}
