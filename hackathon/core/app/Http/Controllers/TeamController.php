<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\TeamService;
use App\Services\UserService;

class TeamController extends Controller
{
    public function __construct (
        TeamService $teamService,
        UserService $userService
    ) {
        $this->teamService = $teamService;
        $this->userService = $userService;
    }
    
    public function index(Request $request) {
        return [];
    }
    
    public function getAll(Request $request)
    {
       $query = $request->query() ?? [];
        $data = $this->teamService->getAll($query);
        return $data;
    }
    
    public function create(Request $request)
    {
        $input = $request->all();
        $user = $this->userService->getById($input['id']);  // id user
        if($user['role_id'] == 1){
            $data = $this->teamService->create($input);
        }else{
            $data = 'chi addmin duoc tao'; 
        }
        return $data;
    }
    
    public function update($id, $idUser, Request $request)
    {
        $input = $request->all();
        $user = $this->userService->getById($idUser); 
       if($user['role_id'] == 1){
             $data = $this->teamService->update($id, $input);
        }else{
            $data = 'chi addmin duoc sua'; 
        }
        return $data;
    }
    
    public function getById($id)
    {
        $data = $this->teamService->getById($id);
        return $data;
    }
    
    public function delete($id, Request $request)
    {
        $input = $request->all();
        $user = $this->userService->getById($input['id']); 
       if($user['role_id'] == 1){
             $data = $this->teamService->delete($id);
        }else{
            $data = 'chi addmin duoc xoa'; 
        }
        return $data;
    }
    
    
}