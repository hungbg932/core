<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\User;
use App\Models\Report;
use Faker\Generator as Faker;
use App\Repositories\ReportRepository;


class ReportTest extends TestCase
{
    use WithFaker;
    
    const END_POINT = '/api/report';
    const SLASH = '/';
    const CREATE_ACTION = 'create';
    const UPDATE_ACTION = 'update';
    const CREATE_ENDPOINT = self::END_POINT.self::SLASH.self::CREATE_ACTION;
    const UPDATE_ENDPOINT = self::END_POINT.self::SLASH.self::UPDATE_ACTION;

    /**
     * test CreateReportWithEmptyRequest
     *
     * @return void
     */
    public function testCreateReportWithEmptyRequest()
    {
        $user = factory(User::class)->create();
        
        $request = [];

        $response = $this->actingAs($user)
            ->post(self::CREATE_ENDPOINT, $request);
        
        $response->assertStatus(400);
    }
    
    /**
     * test CreateReportWithInvalidRequest
     *
     * @return void
     */
    public function testCreateReportWithInvalidRequest()
    {
        $user = factory(User::class)->create();
        
        $request = [
            'invalid_key' => $this->faker->uuid
        ];

        $response = $this->actingAs($user)
            ->post(self::CREATE_ENDPOINT, $request);
        
        $response->assertStatus(400);
    }
    
    /**
     * test CreateReportHappyCase
     *
     * @return void
     */
    public function testCreateReportHappyCase()
    {
        $user = factory(User::class)->create();
        
        // valid report request params
        $request = [
            'yesterday_summary' => $this->faker->text(120),
            'today_summary' => $this->faker->text(50),
            'blocking_summary' => $this->faker->text(120),
            'other' => $this->faker->text(5)
        ];
        
        // assign an invalid status
        $request['status'] = ReportRepository::SU_DUNG;

        $response = $this->actingAs($user)
            ->post(self::CREATE_ENDPOINT, $request);
        
        $response->assertStatus(200);
    }
    
    /**
     * test CreateReportWithInvalidStatus
     *
     * @return void
     */
    public function testCreateReportWithInvalidStatus()
    {
        $user = factory(User::class)->create();
        
        // valid report request params
        $request = [
            'yesterday_summary' => $this->faker->text(120),
            'today_summary' => $this->faker->text(50),
            'blocking_summary' => $this->faker->text(120),
            'other' => $this->faker->text(5)
        ];
        
        // assign an invalid status
        $request['status'] = 999;

        $response = $this->actingAs($user)
            ->post(self::CREATE_ENDPOINT, $request);
        
        $response->assertStatus(400);
    }
    
    /**
     * test verifyReportHappyCase
     *
     * @return void
     */
    public function testVerifyReportHappyCase()
    {
        $user = factory(User::class)->create();
        
        $report = factory(User::class)->create();
        
        
        $request = [
            'verified_by' => $user->id
        ];

        $response = $this->actingAs($user)
            ->post(self::UPDATE_ENDPOINT.self::SLASH.$report->id, $request);
        
        $response->assertStatus(200);
    }
    
    /**
     * test verifyReportByInvalidUser
     *
     * @return void
     */
    public function testVerifyReportByInvalidUser()
    {
        $user = factory(User::class)->create();
        
        $report = factory(User::class)->create();
        
        
        $request = [
            'verified_by' => 1111111111111
        ];

        $response = $this->actingAs($user)
            ->post(self::UPDATE_ENDPOINT.self::SLASH.$report->id, $request);
        
        $response->assertStatus(400);
    }
    
}
