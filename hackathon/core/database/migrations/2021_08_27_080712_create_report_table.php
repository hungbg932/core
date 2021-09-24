<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateReportTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('report', function(Blueprint $table)
		{
			$table->dateTime('date')->nullable();
			$table->string('yesterday_summary', 5000)->nullable();
			$table->string('today_summary', 5000)->nullable();
			$table->string('blocking_summary', 5000)->nullable();
			$table->string('related_tasks', 1000)->nullable();
			$table->string('other', 1000)->nullable();
			$table->timestamp('created_at')->nullable()->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->integer('created_by')->nullable();
			$table->dateTime('verified_at')->nullable();
			$table->integer('verified_by')->nullable();
			$table->integer('id', true);
			$table->integer('status')->nullable()->default(0);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('report');
	}

}
