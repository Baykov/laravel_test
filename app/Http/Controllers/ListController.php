<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class ListController extends Controller
{
    public function index(){
        return view('list.index');
    }
}
