<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class HealthCheckTest extends TestCase
{
    /**
     * Test health check endpoint
     *
     * @return void
     */
    public function testHealthCheck()
    {
        $response = $this->get('/api/echo');
        $response->assertOk()
            ->assertSeeText('OK');
    }
}
