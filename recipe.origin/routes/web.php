<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/bomlogin', 'BomloginController@login');
// Route::get('/join', 'http://store.bom.co.kr');

Route::get('/', function () {
    if(DEVICE_ENV == 4)
    {
        return view('default');
    }else{
        return view('index');
    }
});

Route::get('/aaa', function () {
    var_dump('<pre>', 'okokokoko');die(123);
    if(DEVICE_ENV == 4)
    {
        return view('default');
    }else{
        return view('index');
    }
});

Route::get('/pc/index', function () {
    return view('default');
});

Route::get('/test', 'HomeController@test');

Route::get('/{slug}', function () {
    if(DEVICE_ENV == 4)
    {
        return view('default');
    }else{
        return view('index');
    }
});

Route::get('/articles/{id}/edit', function ($id) {
    if(DEVICE_ENV == 4)
    {
        return view('default');
    }else{
        return view('index');
    }
});

Route::get('/event/{id}/detail', function ($id) {
    if(DEVICE_ENV == 4)
    {
        return view('default');
    }else{
        return view('index');
    }
}, 'HomeController@postDetail');

Route::get('/chefs/{id}/lists', function ($id) {
    if(DEVICE_ENV == 4)
    {
        return view('default');
    }else{
        return view('index');
    }
});

Route::get('/recipe/{id}/detail', function ($id) {
    if(DEVICE_ENV == 4)
    {
        return view('default');
    }else{
        return view('index');
    }
});

Route::get('/recipe/{id}/edit', function ($id) {
    if(DEVICE_ENV == 4)
    {
        return view('default');
    }else{
        return view('index');
    }
});

Route::get('/edit_write/{id}/edit', function ($id) {
    if(DEVICE_ENV == 4)
    {
        return view('default');
    }else{
        return view('index');
    }
});

Route::get('/qna/{id}/detail', function ($id) {
    if(DEVICE_ENV == 4)
    {
        return view('default');
    }else{
        return view('index');
    }
});

Route::get('/myinfo', function ($id) {
    if(DEVICE_ENV == 4)
    {
        return view('default');
    }else{
        return view('index');
    }
});

Route::get('/anounce/{id}/detail', function ($id) {
    if(DEVICE_ENV == 4)
    {
        return view('default');
    }else{
        return view('index');
    }
});

Route::get('/faq/{id}/detail', function ($id) {
    if(DEVICE_ENV == 4)
    {
        return view('default');
    }else{
        return view('index');
    }
});

Route::get('/talk/{id}/view', function ($id) {
    if(DEVICE_ENV == 4)
    {
        return view('default');
    }else{
        return view('index');
    }
});

Route::get('/login/naver', function () {
    if(DEVICE_ENV == 4)
    {
        return view('default');
    }else{
        return view('index');
    }
});

//Auth::routes();

//Route::get('/home', 'HomeController@index');

Route::get('/redirect/{social}', 'UserController@redirect');
Route::get('/callback/{social}', 'UserController@callback');

