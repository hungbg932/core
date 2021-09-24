<?php

use Faker\Generator as Faker;
use Carbon\Carbon;
use App\Repositories\ReportRepository;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\Models\Report::class, function (Faker $faker) {
    return [
        'date'                  => Carbon::now(),
        'yesterday_summary'     => $faker->text(125),
        'today_summary'         => $faker->text(100),
        'status'                => ReportRepository::SU_DUNG
    ];
});
