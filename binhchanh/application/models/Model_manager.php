<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
class Model_manager extends CI_Model
{
  
    public function __construct()
        {
                $this->load->database();
                $this->db->from('page_manager');
        }
    function getAcc($param)
    {
        
          $this->db->where($param);
          return $this->db->get()->result_array();
         
    }
}    