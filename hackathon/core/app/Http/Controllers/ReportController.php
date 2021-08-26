<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ReportService;
use App\Http\Requests\Report\CreateFormRequest;

class ReportController extends Controller
{
    public function __construct (
        ReportService $reportService
    ) {
        $this->reportService = $reportService;
    }
    
    public function getPartial(Request $request)
    {
        $input = $request->all();
        $data = $this->reportService->getPartial($input);
        return $data;
    }
    
    public function getByFilter(Request $request) {
        $input = $request->all();
        
        $data = $this->reportService->getByFilter($input);
        return response()->json($data);
    }
    
    public function find($id) {
        $isNumericId = is_numeric($id);
        
        if($isNumericId) {
            $data = $this->reportService->find($id);
        } else {
            $this->setStatusCode(400);
            $data = [];
        }
        
        return response()->json($data);
    }
    
    public function create(Request $request) {
        if ($request->isMethod('get')) {
            return response()->json([]);
        }
        
        $input = $request->all();
        
        $id = $this->reportService->create($input);
        
        return response()->json($id);
    }
    
    public function update($id, Request $request) {
        try {
            $isNumericId = is_numeric($id);
            $input = $request->all();
            
            if($isNumericId) {
                $data = $this->reportService->update($id, $input);
                return response()->json($data);
            }
        } catch (\Exception $ex) {
            return $ex;
        }
    }
    
    public function delete($id) {
        try {
            $isNumericId = is_numeric($id);
            
            if($isNumericId) {
                $data = $this->reportService->delete($id);
                return response()->json($data);
            }
        } catch (\Exception $ex) {
            return $ex;
        }     
    }
}
