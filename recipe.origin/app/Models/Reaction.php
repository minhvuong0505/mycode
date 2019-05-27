<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reaction extends Model
{
    protected $table = 'reaction';

    protected $guarded = array('id');

    public function post()
    {
        return $this->belongsTo(Post::class, 'object_id');
    }

    public function talk()
    {
        return $this->belongsTo(Talk::class, 'object_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
