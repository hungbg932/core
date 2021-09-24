<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\PaypalService;

class PaymentController extends Controller
{
    public function __construct (
        PaypalService $paypalService
    ) {
        $this->paypalService = $paypalService;
    }
    
    public function index(Request $request) {
        return [];
    }
    
    public function getPaypalConfig(Request $request)
    {        
        return $this->paypalService->getConfig();
    }
    
    public function processPayment(Request $request)
    {
        $input = $request->all();
        return $this->paypalService->processPayment($input);
    }
}
