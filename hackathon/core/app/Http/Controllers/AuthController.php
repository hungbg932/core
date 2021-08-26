<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Validator;
use App\User;
use App\Services\UserService;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct(UserService $userService)
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
        $this->userService = $userService;
    }
    
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth('api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $user = $this->userService->getByEmail($credentials['email']);
        return $this->respondWithToken($token, $user);
    }
    
    public function register()
    {   
        $credentials = request(['name', 'email', 'password']);
        $validator = Validator::make($credentials, [
            'name' => 'required',
            'email' => 'required|unique:user',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $payload = [
            'password'  => \Hash::make($credentials['password']),
            'email'     => $credentials['email'],
            'name'      => $credentials['name'],
        ];

        $user = new User($payload);
        if ($user->save())
        {

            if (! $token = auth('api')->attempt($credentials)) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
            $user = $this->userService->getByEmail($credentials['email']);
            return $this->respondWithToken($token, $user);       
        }
        else
            $response = ['success'=>false, 'data'=>'Register Failed'];

        return response()->json($response, 201);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth('api')->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth('api')->logout();

        return response()->json(['status' => 'success']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth('api')->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token, $user)
    {
        return response()->json([
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60,
            'user_id' => $user->id,
            'team_id'   => $user->team_id
        ]);
    }
}