<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $table = 'comment';
    // protected $fillable = [
    //     'id', 'title', 'slug', 'content', 'deleted_at'
    // ];

    protected $guarded = array('id');

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function childs()
    {
        return $this->hasMany(Comment::class, 'parent_id')
                    ->select('comment.*', 'user.name', 'user.avatar')
                    ->leftJoin('user', 'user.id', '=', 'comment.user_id')
                    ->where('comment.status',1)
                    // ->where('user.status',1)
                    // ->take(2)
                    ->orderBy('comment.id','desc');
    }
}
