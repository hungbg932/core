<?php
namespace App\Repositories;

use DB;
use App\Repositories\BaseRepository;
use App\Models\Report;
use App\Helper\Util;
use Carbon\Carbon;

class ReportRepository extends BaseRepository
{
    const SU_DUNG = 0;
    const DELETED = 1;
    const TRANG_THAI_DUYET = 2;
    
    public function getModel()
    {
        return Report::class;
    } 
    
    public function getPartial($input)
    {
        $columns = [
            'report.*',
            'user.name as user_name',
            'team.name as team_name'
            ];
        $query = $this->model
            ->leftJoin('user', 'user.id', '=', 'report.created_by')
            ->leftJoin('team', 'team.id', '=', 'user.team_id')
            ->where([['report.status', self::SU_DUNG], ['team.id', $input['teamId']]])
            ->whereBetween('report.date', [Carbon::parse($input['from'])->startOfDay(), Carbon::parse($input['to'])->endOfDay()]);

        if($input['keywords'] != ""){
            $keywords = $input['keywords'];
            $query = $query->where(function($q) use ($keywords) {
                $q->where('report.yesterday_summary', 'like', "%$keywords%")
                        ->orWhere('report.today_summary', 'like', "%$keywords%")
                        ->orWhere('report.blocking_summary', 'like', "%$keywords%")
                        ->orWhere('report.other', 'like', "%$keywords%")
                        ->orWhere('report.related_tasks', 'like', "%$keywords%")
                        ->orWhere('user.name', 'like', "%$keywords%")
                        ->orWhere('team.name', 'like', "%$keywords%");
            });
        }
        
        $data = [];
        $page = $input['page'];
        $limit = $input['limit'];
        $offset = ($page - 1) * $limit;
        $totalRecord = $query->count();
        
        if ($totalRecord) {
            $data = $query->offset($offset)
                ->limit($limit);
            if ($columns) $data = $data->get($columns);
            else $data = $data->get();
        } else {
            $page = 0;
            $totalRecord = 0;
        }
        
        $input['page'] = $page;
        $input['totalRecord'] = $totalRecord;
        
        $result = [
            'data'          => $data,
            'conditions'    => $input
        ];
        
        return $result;
    }
    
    public function getByFilter($input) 
    {
        $data = $this->model
            ->leftJoin('user', 'user.id', '=', 'report.created_by');
        if($input['from_date']){
            $data = $data->whereDate('report.date', '>=', $input['from_date']);
        }
        if($input['to_date']){
            $data = $data->whereDate('report.date', '<=', $input['to_date']);
        }
        $data = $data->orderBy('date', 'desc')->get(['report.*', 'user.name as created_by_name']);
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
        if ($result && $result->status === self::SU_DUNG ) {
            $result->destroy($id);
        }
    }
    
    public function find($id) 
    {
        $result = $this->model->find($id); 
        return $result; 
    }
}