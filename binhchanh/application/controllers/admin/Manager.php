<?php defined('BASEPATH') OR exit('No direct script access allowed');
class Manager extends Church_Controller
{

    public function __construct()
        {
                parent::__construct();
                $this->load->model('manager');
                
        }
    
    public function index()
    {
        if($this->input->post('id'))
        if($this->manager->getAcc(array('username' => $this->input->post('id'), 'password' => $this->input->post('pass'))))
        {
            $_SESSION['login'] = 1;
            header('Location: '.$_SERVER[HTTP_ORIGIN].'/');
        }
        
        
        $this->load->view('admin/login');
    }

    
}