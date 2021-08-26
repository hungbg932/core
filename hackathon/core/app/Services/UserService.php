<?php
namespace App\Services;

use App\Repositories\UserRepository;

class UserService {
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }
    
    public function getPartial($limit, $page, $keywords, $serviceId)
    {
        $data = $this->userRepository->getPartial($limit, $page, $keywords, $serviceId);
        return $data;
    }
    
    public function getAll()
    {
        $data = $this->userRepository->getAll();
        return $data;
    }
    
    public function create(array $input)
    {
        $id = $this->userRepository->create($input);
        return $id;
    } 
    
    public function update($id, array $input)
    {
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
}