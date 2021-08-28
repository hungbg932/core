<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    const MANAGER_ROLE = 1;
    
    const USER_ROLE = 2;
    
    protected $table = 'user';
    
    protected $primaryKey = 'id';
    
    public $timestamps = false;
    
    protected $guarded = ['id'];
}
