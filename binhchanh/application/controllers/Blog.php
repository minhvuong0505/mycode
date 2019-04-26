<?php
 defined('BASEPATH') OR exit('No direct script access allowed');
class Blog extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('blog_model');
    }
    public function index()
    {
        $data['blog_min'] = $this->blog_model->getBlog();
        
        $this->load->view('blog',$data);

    }

    public function view()
    {
        
        $link = $this->getParam();echo $link;
        $data['blog'] = $this->blog_model->getBlog($link);
        
        $this->load->view('blog_view',$data);
    }

    function getParam()
    {
        $params = explode('/',$_SERVER['REQUEST_URI']);
        $lastParam = sizeof($params);
        return $params[$lastParam - 1];
    }

}