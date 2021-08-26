<?php
namespace App\Services;

use App\Repositories\TeamRepository;

class TeamService {
    public function __construct(TeamRepository $teamRepository)
    {
        $this->teamRepository = $teamRepository;
    }
    
    public function getAll()
    {
        $data = $this->teamRepository->getAll();
        return $data;
    }
    
    public function create(array $input)
    {
        $data = $this->teamRepository->create($input);
        return $data;
    } 
    
    public function update($id, array $input)
    {
        // $user = 
        $data = $this->teamRepository->update($id, $input);
        return $data;
    }
    
    public function delete($id)
    {
       $data = $this->teamRepository->delete($id);
        return $data;
    }
    
    public function getById($id)
    {
        $data = $this->teamRepository->getById($id);
        return $data;
    }
}