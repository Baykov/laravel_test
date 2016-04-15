<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_first_name', 'user_login', 'user_password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'user_password', 'remember_token',
    ];

    protected $table = 'adverts';
    
    public function getAuthPassword() {
        //print_r($this->user_password);
       // die();
        return $this->user_password;
    }

    public function getAuthEmail() {
        //print_r($this->user_login);
       // die();
        return $this->user_login;
    }}
