<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;

class DBConnectionTest extends TestCase
{
    /**
     * Test DB Connection.
     *
     * @return void
     */
    public function testConnectionInfo()
    {
        $envDatabaseName = env('DB_DATABASE', '');
        $this->assertNotEquals($envDatabaseName, '');
        try {
            DB::connection()->getPdo();
            $dbName = DB::connection()->getDatabaseName();
            $this->assertEquals($dbName, $envDatabaseName);
            $this->assertEquals($dbName, 'hackathon_test');
            // @TODO - assert host, port, user...
            
        } catch (\Exception $ex) {
            die("Could not connect to the database.  Please check your configuration. error:" . $ex );
        }
        
    }
    
    /**
     * Test DB Tables.
     *
     * @return void
     */
    public function testTables(){
        // make sure DB has some important table
        // make sure some important table has column
    }
}
