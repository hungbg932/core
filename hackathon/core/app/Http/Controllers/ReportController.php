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
    
    public function getAll()
    {
        $data = $this->reportService->getAll();
        return $data;
    }
    
    public function create(CreateFormRequest $request)
    {
        $input = $request->all();
        $data = $this->reportService->create($input);
        return $data;
    }
    
    public function update($id, Request $request)
    {
        $input = $request->all();
        $data = $this->reportService->update($id, $input);
        return $data;
    }
}
