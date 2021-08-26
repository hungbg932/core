<?php
namespace App\Repositories;

use DB;
use App\Repositories\BaseRepository;
use App\Models\Report;
use App\Helper\Util;

class ReportRepository extends BaseRepository
{
    const SU_DUNG = 0;
    const DELETED = 1;
    public function getModel()
    {
        return Report::class;
    } 
    
    public function getPartial($teamId)
    {
        $column = [
            'report.*',
            'user.name as user_name',
            'team.name as team_name'
            ];
        $data = $this->model
            ->leftJoin('user', 'user.id', '=', 'report.created_by')
            ->leftJoin('team', 'team.id', '=', 'user.team_id')
            ->where([['report.status', self::SU_DUNG], ['team.id', $teamId]])
            ->get($column);
        return $data;
    }
    
    public function getByFilter($input) 
    {
        $model = $this->model;
        
        $data = $model->orderBy('id', 'desc')->get();
        return $data;
    }
    
    public function create(array $input) 
    {
        $id = $this->model->create($input)->id;
        return $id;
    }
    
    public function update($id, array $input) 
    {
        $result = $this->find($id);
        if ($result) {
            $result->update($input);
        }
        return $result;
    }
    
    public function delete($id) 
    {
        $result = $this->find($id);
        if ($result) {
            $result->destroy($id);
        }
    }
    
    public function find($id) 
    {
        $result = $this->model->find($id); 
        return $result; 
    }
}