<?php
namespace App\Repositories;

use DB;
use App\Repositories\BaseRepository;
use App\Models\Team;
use App\Helper\Util;
use Carbon\Carbon;

class TeamRepository extends BaseRepository
{
    public function getModel()
    {
        return Team::class;
    } 
    
    public function getAll()
    {
        $data = $this->model->get();
        return $data;
    }
    
    public function create(array $input)
    {
        $input['created_at'] = Carbon::now();
        $id = $this->model
        ->create($input)->id;
        return $id;
    }
    
    public function getById($id)
    {
        $data = $this->model->where('id', $id)->get();
         return $data;
        
    }
    
    public function update($id, array $params)
    {
        $data = $this->model
                ->where('id', $id)
                ->update($params);
        return $data;
    }
    
     public function delete($id)
    {
        $column = [
            'team.id',
            'team.name',
            'team.description',
            'user.team_id',
        ];
        
        $where = [
            ['team.id', $id]
        ];
        $data = $this->model
            ->where($where)
            ->leftJoin('user','user.team_id','=','team.id')
            ->get($column);
        if($data->isEmpty()){
            $data = 'team khong ton tai';
        }else{
            foreach($data as $item){
                if($item['team_id']){
                    $data = 'team da co user khong the xoa';
                }
                else{
                    $data = $this->model
                                 ->where($where)
                                 ->delete();
                }
            }
        }
        return $data;
    }
}
