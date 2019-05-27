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
        $param = $this->uri->segment('3');
        if (isset($param))
        {
            $id = explode('-',$param);;
            $data['blog'] = $this->blog_model->getBlog($id['0']);
            echo empty($data['blog']) ?  '<script>history.go(-1)</script>' : '';
            $this->load->view('blog_view',$data);
        }
        
    }

    public function add_blog()
    {
        if(is_admin())
        {
            $param = $this->input->post();
            if(!empty($param))
            {
                
            }

        } else returnMain();

        $this->load->view('blog/add_blog');
    }

    

}