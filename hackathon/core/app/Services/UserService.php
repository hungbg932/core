<?php
namespace App\Services;

use App\Repositories\UserRepository;

class UserService {
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }
    
    public function getPartial($query)
    {
        $limit = $query['limit'] ?? 10;
        $page = $query['page'] ?? 1;
        $keywords = $query['keywords'] ?? '';
        $data = $this->userRepository->getPartial($limit, $page, $keywords);
        return $data;
    }
    
    public function create(array $input)
    {
        $password = $input['password'];
        if(!empty($password)) {
            $input['password'] = \Hash::make($password);
        }
        
        $id = $this->userRepository->create($input);
        return $id;
    } 
    
    public function update($id, array $input)
    {
        $password = $input['password'];
        if(!empty($password)) {
            $input['password'] = \Hash::make($password);
        } else {
            unset($input['password']);
        }
        
        $this->userRepository->update($id, $input);
    }
    
    public function delete($id)
    {
        $this->userRepository->delete($id);
    }
    
    public function getById($id)
    {
        $data = $this->userRepository->getById($id);
        return $data;
    }
    
    public function getByEmail($email)
    {
        $data = $this->userRepository->getByEmail($email);
        return $data;
    }
    
    public function checkEmailbyEmail($email, $userId = 0)
    {
        $data = $this->userRepository->checkEmailbyEmail($email, $userId);
        return $data;
    }
}