<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    protected $table = 'report';
    
    protected $primaryKey = 'id';
    
    protected $guarded = ['id'];
    
    public $timestamps = false;
}
