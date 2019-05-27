<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Talk extends Model
{
    protected $table = 'talk';
    // protected $fillable = [
    //     'id', 'title', 'slug', 'content', 'deleted_at'
    // ];

    protected $guarded = array('id');

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
