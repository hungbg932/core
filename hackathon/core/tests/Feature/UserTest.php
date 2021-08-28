<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\User;


class UserTest extends TestCase
{
    /**
     * Expect user can login if supplied jwt token.
     *
     * @return void
     */
    public function testAuthSuccess()
    {
        $user = factory(User::class)->create();

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
        $user = factory(User::class)->create();

        $response = $this->get('/api/users');
        
        $response->assertStatus(401);
    }
    
}
