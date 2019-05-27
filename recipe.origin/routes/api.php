<?php

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Article;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

////////////////////////////////////////////////////////////////////////
Route::group([
    'prefix'        => 'v2',
    // 'middleware'    => config('admin.route.middleware'),
], function ($router) {
    //home
    $router->get('/main_tags', 'HomeController@getTags');
    $router->get('/banner', 'HomeController@getBannerTop');
    $router->get('/main_video', 'HomeController@getVideo');
    $router->get('/getNewRecipes', 'HomeController@getNewRecipes');
    //login
   $router->post('login', 'UserController@login');
   $router->get('checkLogin', 'UserController@checkLogin');
   $router->post('loginFacebook', 'UserController@loginFacebook');
   $router->post('/auth/register', 'Auth\RegisterController@register');
   $router->get('listchef', 'UserController@listChef');

    //upload router
    $router->post('fileupload', 'FileuploadController@store');
    $router->post('fileuploadVideo', 'FileuploadController@storeVideo');
    //register from store.bom
    $router->post('registerStore', 'UserController@registerStore'); 
});


//Dingo API
$api = app('Dingo\Api\Routing\Router');

$groups = ['namespace' => 'App\\Http\\Controllers'];

$api->version('v3', $groups, function ($api) {

    $api->post('loginstore', 'AuthenticateController@authenticate_store');

    $api->post('authenticate', 'AuthenticateController@authenticate');
    
    $api->post('authenticate_social', 'AuthenticateController@authenticateSocial');
    $api->post('logout', 'AuthenticateController@logout');
    $api->get('token', 'AuthenticateController@getToken');
    
    //register
    $api->post('register', 'UserController@register'); 
    $api->post('register/auth', 'UserController@registerAuth');

    //Find ID
    $api->post('user/find/id', 'UserController@findId');

    //Find PWD
    $api->post('user/find/pwd', 'UserController@findPassword');

    // reactions
    $api->put('reactions/view', 'ReactionController@view');

    // comment
    $api->get('comments', 'CommentController@index');
    
    // recipe
    $api->get('recipes', 'PostController@index');
    $api->get('recipes/relation/{id}', 'PostController@relation');
    $api->get('getpost', 'PostController@getpost');
});

$groups['middleware'] = 'api.auth';
$api->version('v3', $groups, function ($api) {

    $api->post('profile/{id}', 'UserController@update'); //update profile
    $api->get('authenticated_user', 'AuthenticateController@authenticatedUser');
    // $api->delete('users/{id}', 'UserController@destroy');

    //Qna
    $api->post('qna', 'QnaController@store');

    //Find PWD
    $api->post('user/find/pwd/get-auth', 'UserController@sendCodeVerifyPwd');
    $api->post('user/find/pwd/auth', 'UserController@verifyCodePwd');
    $api->post('user/find/pwd/change', 'UserController@changePwd');

    // reactions
    $api->put('reactions/react', 'ReactionController@react');
    $api->delete('reactions/react', 'ReactionController@unReact');
    
    // comments
    $api->get('comments/{id}', 'CommentController@show');
    $api->post('comments', 'CommentController@store');
    $api->put('comments/{id}', 'CommentController@update');
    $api->delete('comments/{id}', 'CommentController@delete');

    // recipes
    $api->get('recipes/{id}', 'PostController@show');
    $api->post('recipes', 'PostController@store');
    $api->put('recipes/{id}', 'PostController@update');
    $api->delete('recipes/{id}', 'PostController@delete');

    // events
    $api->get('events/{id}', 'EventController@show');
    $api->post('events', 'EventController@store');
    $api->put('events/{id}', 'EventController@update');
    $api->delete('events/{id}', 'EventController@delete');

    // talks
    $api->get('talks/{id}', 'TalkController@show');
    $api->post('talks', 'TalkController@store');
    $api->put('talks/{id}', 'TalkController@update');
    $api->delete('talks/{id}', 'TalkController@delete');

});







