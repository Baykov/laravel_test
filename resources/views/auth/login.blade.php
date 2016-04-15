<!-- resources/views/auth/login.blade.php -->
@extends('app')
@section('content')
    @if($errors->has())
        @foreach ($errors->all() as $error)
            <div class="alert alert-danger" role="alert"><span class="glyphicon glyphicon-warning-sign"></span> {{{ $error }}}</div>
        @endforeach
    @endif
    <form class="form-inline" method="POST" action="/auth/login">
        {!! csrf_field() !!}
        <div class="form-group">
            <label class="sr-only" for="exampleInputEmail3">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail3" placeholder="Enter email" name="email" value="{{ old('email') }}">
        </div>
        <div class="form-group">
            <label class="sr-only" for="exampleInputPassword3">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword3" placeholder="Password" name="password" id="password">
        </div>
        <div class="checkbox">
            <label>
                <input type="checkbox" name="remember"> Remember me
            </label>
        </div>
        <button type="submit" class="btn btn-primary">Sign in</button>
    </form>
@endsection