<?php defined('BASEPATH') OR exit('No direct script access allowed');
class Church_Model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('manager');
    }

    public function is_login()
    {
        return isset($_SESSION['login']) ? 1 : 0 ;
    }
}