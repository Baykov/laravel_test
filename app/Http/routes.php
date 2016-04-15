<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

//Route::get('/', function () {
//    return view('welcome');
//});


if (Auth::check()) {
    Route::group(array('as' => 'api'), function () {
        Route::get('/api/selects', ['as'=>'api', 'uses'=>'ApiController@selects'] );
        Route::get('/api/authenticate', ['as'=>'api', 'uses'=>'ApiController@authenticate'] );
        Route::get('/api/listorders', ['as'=>'api', 'uses'=>'ApiController@listorders'] );
    });
    Route::get('/', ['as'=>'list', 'uses'=>'ListController@index'] );
    Route::get('auth/logout', 'Auth\AuthController@getLogout');
    echo "I'm logged in as " . Auth::user()->user_name . "<br />";
    echo "<a href='/auth/logout'>Log out</a>";
} else {
    Route::get('/', ['as'=>'list', 'uses'=>'Auth\AuthController@getLogin'] );
    Route::group(array('as' => 'auth'), function () {
        Route::get('auth/login', 'Auth\AuthController@getLogin');
        Route::post('auth/login', 'Auth\AuthController@postLogin');

        // Registration routes...
        Route::get('auth/register', 'Auth\AuthController@getRegister');
        Route::post('auth/register', 'Auth\AuthController@postRegister');
    });
}





// Authentication routes...


