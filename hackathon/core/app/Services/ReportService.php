<?php
namespace App\Services;

use App\Repositories\ReportRepository;

class ReportService {
    public function __construct(ReportRepository $reportRepository)
    {
        $this->reportRepository = $reportRepository;
    }
    
    public function getPartial($teamId)
    {
        $data = $this->reportRepository->getPartial($teamId);
        return $data;
    }
    
    public function create(array $input)
    {
        $id = $this->reportRepository->create($input);
        return $id;
    } 
    
    public function update($id, array $input)
    {
        $this->reportRepository->update($id, $input);
    }
}