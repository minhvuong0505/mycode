<?php defined('BASEPATH') OR exit('No direct script access allowed');
class Login extends Church_Controller
{
    
    public function __construct()
        {
                parent::__construct();
                $this->load->model('model_manager');
                
        }
    
    public function index()
    {
        if(isset($_SESSION['id']))
            header('Location:/admin/manager');
        else {
            if($this->input->post('id'))
            if($this->model_manager->getAcc(array('username' => $this->input->post('id'), 'password' => $this->input->post('pass'))))
            {   
                
                $_SESSION['login'] = 1;
                $_SESSION['id'] = $this->input->post('id');
                $_SESSION['pass'] = $this->input->post('pass');
                
                header('Location:/admin/manager');
            }
        }
        $this->load->view('admin/login');
    }

    
}