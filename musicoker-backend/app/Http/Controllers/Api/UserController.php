<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|max:20',
            'last_name' => 'required|max:20',
            'username' => 'required|max:60:unique:users,username',
            'dateofbirth' => 'required',
            'gender' => 'required',
            'email' => 'required|email|max:191:unique:users,email',
            'password' => 'required|max:191',
            're_password' => 'required|same:password'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages()
            ]);
        } else {
            $user = User::create([
                'first_name' => $request->input('first_name'),
                'last_name' => $request->input('last_name'),
                'username' => $request->input('username'),
                'dateofbirth' => $request->input('dateofbirth'),
                'gender' => $request->input('gender'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
            ]);
            $token = $user->createToken($user->email . '_TOKEN')->plainTextToken;
            return response()->json([
                'status' => 200,
                'username' => $user->username,
                'token' => $token,
                'message' => 'Registered Successfully',
            ]);

        }
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'email' => 'required|email|max:191',
            'password' => 'required|max:191',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->messages()
            ]);
        } else {
            $user = User::where('email', $request->email)->first();

            if (! $user || ! Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status' => 401,
                    'message'=>'The provided credentials are incorrect.'
                ]);
            }else {
                $token = $user->createToken($user->email . '_TOKEN')->plainTextToken;
                return response()->json([
                    'status' => 200,
                    'username' => $user->username,
                    'token' => $token,
                    'message' => 'Login Successfully',
                ]);
            }
        }
    }
    public function logout() {
        auth()->user()->tokens()->delete();
        return response()->json([
            'status'=>200,
            'message'=>'Logout Successfully'
        ]);
    }
}






