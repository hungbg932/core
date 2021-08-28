<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class Create"user"Table extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('"user"', function(Blueprint $table)
		{
			$table->integer('id')->primary('user_pkey');
			$table->string('name', 200)->nullable();
			$table->string('job_title', 200)->nullable();
			$table->dateTime('dob')->nullable();
			$table->string('image_url', 200)->nullable();
			$table->string('email', 100)->nullable();
			$table->string('password', 100)->nullable();
			$table->integer('role_id')->nullable();
			$table->integer('team_id')->nullable();
			$table->dateTime('created_at')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('"user"');
	}

}
