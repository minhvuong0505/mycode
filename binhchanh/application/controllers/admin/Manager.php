<?php defined('BASEPATH') OR exit('No direct script access allowed');
class Manager extends Church_Controller
{

    public function __construct()
        {
            parent::__construct();
            $this->load->model('model_manager');
            
        }
    
    public function index()
    {
        var_dump($_SERVER);
        if(!isset($_SESSION['id']))
            header('Location: '.$_SERVER[HTTP_ORIGIN].'/');
        else{
            $this->load->view('admin/manager');
        }
       
    }

    
}