<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
class Blog_model extends CI_Model
{
  
    public function __construct()
        {
                $this->load->database();
                $this->db->from('blog');
        }
    function getBlog($link = null)
    {
        if(!empty($link)) 
        {
            $this->db->where('link',$link);
            return $this->db->get()->row(1);
        }
        return $this->db->get()->result_array();
    }
}    