<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\UserService;

class UserController extends Controller
{
    public function __construct (
        UserService $userService
    ) {
        $this->userService = $userService;
    }
    
    public function index(Request $request) {
        return [];
    }
    
    public function getAll(Request $request)
    {
        $query = $request->query() ?? [];
        $data = $this->userService->getAll($query);
        return $data;
    }
    
    public function create(Request $request)
    {
        $input = $request->all();
        $email = $input['email'];
        $checkEmail = $this->userService->checkEmailbyEmail($email);
        if(!empty($checkEmail)) {
            return ['error' => 'Email đã tồn tại'];
        }
        $data = $this->userService->create($input);
        return ['success'];
    }
    
    public function update($id, Request $request)
    {
        $input = $request->all();
        $input = $request->all();
        $email = $input['email'];
        $checkEmail = $this->userService->checkEmailbyEmail($email, $id);
        if(!empty($checkEmail)) {
            return ['error' => 'Email đã tồn tại'];
        }
        
        $data = $this->userService->update($id, $input);
        return $data;
    }
    
    public function getById($id)
    {
        $data = $this->userService->getById($id);
        return $data;
    }
    
    
}
