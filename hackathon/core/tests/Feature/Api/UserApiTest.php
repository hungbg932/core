<?php

namespace Tests\Feature\Api;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\User;


class UserApiTest extends TestCase
{
    use RefreshDatabase; // use only migration script is correct!!
    
    /**
     * Expect user can login if supplied jwt token.
     *
     * @return void
     */
    public function testAuthSuccess()
    {

        $user = factory(User::class)->create([
            'name' => 'Bui Gia Hung',
            'email' => 'hung.bui.@gmail.com',
            'job_title' => 'DEV'
        ]);

        $response = $this->actingAs($user)
            ->get('/api/users');
        
        $response->assertStatus(200);
    }
    
    /**
     * Expect user cannot loggin if don't supplied jwt token.
     *
     * @return void
     */
    public function testAuthFail()
    {
        $response = $this->get('/api/users');
        
        $response->assertStatus(401);
    }
    
}
