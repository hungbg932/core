<?php
namespace App\Repositories;

use DB;
use App\Repositories\BaseRepository;
use App\Models\User;
use App\Helper\Util;

class UserRepository extends BaseRepository
{
    public function getModel()
    {
        return User::class;
    } 
    
    public function getAll()
    {
        $data = $this->model->get();
        return $data;
    }
    
    public function getPartial($keyword, $page, $limit)
    {
        $column = [
            '*',
        ];
        
        $data = $this->model->query();

        $data->orderBy('id', 'desc');
        return Util::getPartial($data, $limit, $page, $column);
    }
    
    public function create(array $input)
    {
        $id = $this->model->create($input)->id;
        return $id;
    }
    
    public function getById($id)
    {
        return $this->model->where('id', $id)->first();
    }
    
    public function update($id, array $params)
    {
        return $this->model
                ->where('id', $id)
                ->update($params);
    }
    
    public function getByEmail($email)
    {
        return $this->model->where('email', $email)->first();
    }
}