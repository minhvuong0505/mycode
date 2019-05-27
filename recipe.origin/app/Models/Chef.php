<?php

namespace App\Models;
class Chef extends \Apify\Models\BaseModel {
    protected $table = 'users';
    public function users() {
        return $this->hasMany('App\Models\Post', 'user_id', id);
    }
}
