<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;

class User extends Authenticatable
{
    use Notifiable;

    protected $table = 'user';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username',
        'email',
        'password',
        'name',
        'birthday',
        'gender',
        'phone',
        'address',
        'slogan',
        'avatar',
        'sns',
        'auth_type',
        'auth_code',
        'status',
        'cover_image',
        'total_like', 
        'total_view', 
        'total_save',
        'from_social',
        'total_point',
        'total_cmt',
        'total_talk',
        'post_point',
        'talk_point',
        'cmt_point'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 
        'remember_token', 
        // 'auth_type', 
        'last_login_ip', 
        'last_login_time', 
        'deleted_at', 
        'username', 
        'email',
        'phone',
        'birthday', 
        'address',
        'level', 
        // 'slogan', 
        'sns'
    ];

    public function comments()
    {
        return $this->hasMany(Comment::class, 'user_id');
    }

    public function post()
    {
        return $this->hasMany(Post::class, 'user_id')
                    ->where('status',1)
                    ->take(DEVICE_ENV==4 ? 4 : 2)
                    ->orderBy('id','desc');
    }

    public function posts()
    {
        return $this->hasMany(Post::class, 'user_id');
    }
}
