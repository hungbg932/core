<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
     protected $table = 'team';
    
    protected $primaryKey = 'id';
    
    protected $guarded = ['id'];
    
    public $timestamps = false;
    
    public function user()
    {
        return $this->hasMany('App\Models\User');
    }
}