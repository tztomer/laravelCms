<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            // $table->foreignIdFor(User::class,'id');
            //  $table->foreignIdFor(Comment::class,'id');
            $table->foreignIdFor(User::class,'user_id')->constrained();
            $table->timestamps();
            $table->string('title',1000);
            $table->string('url', 1000);
            $table->string('img',1000);
            $table->string('status',30);
            $table->text('desc',5000);
            $table->timestamp('expire_date')->nullable;
            
        });
//          Schema::table('projects', function($table) {
//        $table->foreign('user_id')->references('id')->on('users');
//     //    $table->foreign('id')->on('comments');
//    });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects');
    }
};
