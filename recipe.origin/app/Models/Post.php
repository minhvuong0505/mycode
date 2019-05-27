<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $table = 'post';
    // protected $fillable = [
    //     'id', 'title', 'slug', 'content', 'deleted_at'
    // ];

    protected $guarded = array('id');

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function cate_detail()
    {
        return $this->belongsTo(Category::class, 'cate');
    }

    public function op_size()
    {
        return $this->belongsTo(Option::class, 'size');
    }

    public function op_age()
    {
        return $this->belongsTo(Option::class, 'age');
    }

    public function op_dryness()
    {
        return $this->belongsTo(Option::class, 'dryness');
    }

    public function op_function()
    {
        return $this->belongsTo(Option::class, 'function');
    }

    public function op_prepare_time()
    {
        return $this->belongsTo(Option::class, 'prepare_time');
    }

    public function op_cooking_time()
    {
        return $this->belongsTo(Option::class, 'cooking_time');
    }

    public function op_difficulty()
    {
        return $this->belongsTo(Option::class, 'difficulty');
    }
}
