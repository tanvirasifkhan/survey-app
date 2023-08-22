<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Validator;
use App\Services\AuthService;
use App\Http\Resources\AuthResource;
use Illuminate\Support\Str;
use Auth;
use Response;

class AuthController extends Controller {
    
    private $authService;

    public function __construct(AuthService $authService){
        $this->authService = $authService;
    }

    // create new user for registration
    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required'
        ],[
            'name.required' => 'You need to write your name first',
            'email.required' => 'Provide your email address',
            'email.email' => 'Email address has to be valid',
            'email.unique' => 'Email address has alredy been taken',
            'password.required' => 'User should have a password'
        ]);

        if($validator->fails()){
            return Response::json(['errors' => $validator->getMessageBag()->toArray()]);
        }else{
            $this->authService->create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password)
            ]);

            if(Auth::attempt(['email'=>$request->email, 'password'=>$request->password])){
                $authenticatedUser = $request->user();
                $authenticatedUser->api_token = Str::random(120);
                $authenticatedUser->save();
                $user = new AuthResource($authenticatedUser);
                return Response::json((['loggedin' => true, 'message'=>'Successfully loggedin', 'user' => $user]), 200);                
            }else{
                return Response::json((['loggedin' => false, 'error_message'=>'Login failed ! Wrong credentials']));
            }
        }
    }

    // log the ergistered user into the system
    public function login(Request $request){
        $validators = Validator::make($request->all(), [
            'email' => 'required|email',
            'password'=>'required'
        ],[
            'email.required' => 'You need to provide an email address',
            'email.email' => 'Email address has to be valid',
            'password' => 'Provide a password associated with your account'
        ]);

        if($validators->fails()){
            return Response::json(['errors' => $validators->getMessageBag()->toArray()]);
        }else{
            if(Auth::attempt(['email'=>$request->email, 'password'=>$request->password])){
                $authenticatedUser = $request->user();
                $authenticatedUser->api_token = Str::random(120);
                $authenticatedUser->save();
                $user = new AuthResource($authenticatedUser);
                return Response::json((['loggedin' => true, 'message'=>'Successfully loggedin', 'user' => $user]), 200);                
            }else{
                return Response::json((['loggedin' => false, 'error_message'=>'Login failed ! Wrong credentials']));
            }
        }
    }

    // log the registered user out of the system
    public function logout(Request $request){
        $user = $request->user();
        $user->api_token = null;
        $user->save();
        return Response::json(['message'=>'Successfully logged out !']);
    }
}