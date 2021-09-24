<?php
namespace App\Services;

class PaypalService{
    
    public function __construct()
    {
        $this->paypalEnv = (bool)env('PAYPAL_SANDBOX', false) ? 'sandbox' : 'production';
        $this->paypalURL = (bool)env('PAYPAL_SANDBOX', false) ? 'https://api.sandbox.paypal.com/v1/':'https://api.paypal.com/v1/';
        $this->paypalClientID = env('PAYPAL_API_CLIENT_ID', '');
        $this->paypalSecret = env('PAYPAL_API_SECRET', '');
    }
    
    public function validate($paymentID, $paymentToken, $payerID) { 
        $ch = curl_init(); 
        curl_setopt($ch, CURLOPT_URL, $this->paypalURL.'oauth2/token'); 
        curl_setopt($ch, CURLOPT_HEADER, false); 
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); 
        curl_setopt($ch, CURLOPT_POST, true); 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
        curl_setopt($ch, CURLOPT_USERPWD, $this->paypalClientID.":".$this->paypalSecret); 
        curl_setopt($ch, CURLOPT_POSTFIELDS, "grant_type=client_credentials"); 
        $response = curl_exec($ch); 
        curl_close($ch); 
         
        if(empty($response)){ 
            return false; 
        }else{
            $jsonData = json_decode($response); 
            $curl = curl_init($this->paypalURL.'payments/payment/'.$paymentID); 
            curl_setopt($curl, CURLOPT_POST, false); 
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false); 
            curl_setopt($curl, CURLOPT_HEADER, false); 
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true); 
            curl_setopt($curl, CURLOPT_HTTPHEADER, array( 
                'Authorization: Bearer ' . $jsonData->access_token, 
                'Accept: application/json', 
                'Content-Type: application/xml' 
            )); 
            $response = curl_exec($curl); 
            curl_close($curl); 
             
            // Transaction data 
            $result = json_decode($response); 
             
            return $result; 
        }
    } 

    public function getConfig() {
        return [
            'paypalEnv' => $this->paypalEnv,
            'paypalClientID' => $this->paypalClientID,
        ];
    }
    
    public function processPayment(array $input)
    {        
        $paymentID = $input['paymentID']; 
        $token = $input['token']; 
        $payerID = $input['payerID']; 
        
        $paymentCheck = $this->validate($paymentID, $token, $payerID); 

        // If the payment is valid and approved 
        if($paymentCheck && $paymentCheck->state == 'approved'){ 
    
            // Get the transaction data 
            $id = $paymentCheck->id; 
            $state = $paymentCheck->state; 
            $payerFirstName = $paymentCheck->payer->payer_info->first_name; 
            $payerLastName = $paymentCheck->payer->payer_info->last_name; 
            $payerName = $payerFirstName.' '.$payerLastName; 
            $payerEmail = $paymentCheck->payer->payer_info->email; 
            $payerID = $paymentCheck->payer->payer_info->payer_id; 
            $payerCountryCode = $paymentCheck->payer->payer_info->country_code; 
            $paidAmount = $paymentCheck->transactions[0]->amount->details->subtotal; 
            $currency = $paymentCheck->transactions[0]->amount->currency; 
            
            // Get product details 
            
            // If payment price is valid 
                
            // $data = array( 
            //     'txn_id' => $id, 
            //     'payment_gross' => $paidAmount, 
            //     'currency_code' => $currency, 
            //     'payer_id' => $payerID, 
            //     'payer_name' => $payerName, 
            //     'payer_email' => $payerEmail, 
            //     'payer_country' => $payerCountryCode, 
            //     'payment_status' => $state 
            // ); 
            
            //set money $paidAmount

            return ["status" => "success", "message" => "Giao dịch thành công"];
        } else {
            return ['status' => "error", "message" => 'Giao dịch không thành công'];
        }
    }
}