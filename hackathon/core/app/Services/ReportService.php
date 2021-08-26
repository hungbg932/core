<?php
namespace App\Services;

use App\Repositories\ReportRepository;
use DateTime;

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
    
    public function getByFilter($input)
    {
        $data = $this->reportRepository->getByFilter($input);
        return $data;
    }

    public function find($id)
    {
        return $this->reportRepository->find($id);
    }

    public function create(array $input)
    {
        $input['created_at'] = new DateTime();
        $id = $this->reportRepository->create($input);

        return ['id'=>$id];
    }

    public function update($id, array $input)
    {
        $input['verified_at'] = new DateTime();
        return $this->reportRepository->update($id, $input);
    }

    public function delete($id)
    {
        $this->reportRepository->delete($id);

    }
}