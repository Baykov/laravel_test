<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Request;
use Auth;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;

class AuthController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Registration & Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users, as well as the
    | authentication of existing users. By default, this controller uses
    | a simple trait to add these behaviors. Why don't you explore it?
    |
    */

    use AuthenticatesAndRegistersUsers, ThrottlesLogins;

    /**
     * Where to redirect users after login / registration.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware($this->guestMiddleware(), ['except' => 'logout']);
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'user_first_name' => 'required|max:255',
            'user_login' => 'required|email|max:255|unique:users',
            'user_password' => 'required|min:6|confirmed',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    protected function create(array $data)
    {
        return User::create([
            'user_first_name' => $data['name'],
            'user_login' => $data['email'],
            'user_password' => bcrypt($data['password']),
        ]);
    }
    
    public function postLogin()
    {
        $email = Request::input('email');
        $password = Request::input('password');
        if (Auth::attempt(['user_login' => $email, 'password' => $password]))
        {
            return redirect()->intended('/');
        } else {
            return redirect()->intended('/auth/login')->withErrors('Error autorisation! Try again with valid parameters.');
        }
    }

    public function getLogout()
    {
        Auth::logout();
        return redirect()->intended('/auth/login');
    }
}
