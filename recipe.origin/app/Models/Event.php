<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $table = 'events';
    // protected $fillable = [
    //     'id', 'title', 'slug', 'content', 'deleted_at'
    // ];

    protected $guarded = array('id');
}
