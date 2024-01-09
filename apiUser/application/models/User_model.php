<?php
defined('BASEPATH') or exit('No direct script access allowed');

class User_model extends CI_Model
{
    private $firstname, $lastname, $email;
    public function __construct()
    {
        parent::__construct();
    }

    public function insert_user($firstname, $lastname, $email)
    {
        $this->firstname = $firstname;
        $this->lastname = $lastname;
        $this->email = $email;
        $this->db->insert('user', array('firstname' => $this->firstname, 'lastname' => $this->lastname, 'email' => $this->email));
    }

    public function get_all_user()
    {
        $this->db->select('*');
        $this->db->from('user');
        $query = $this->db->get();
        return $query->result();
    }

    public function get_user($id)
    {
        $this->db->select('*');
        $this->db->from('user');
        $this->db->where('id', $id);
        $query = $this->db->get();
        return $query->result();
    }

    public function update_user($id_user, $firstname, $lastname, $email)
    {
        $this->db->set('firstname', $firstname);
        $this->db->set('lastname', $lastname);
        $this->db->set('email', $email);
        $this->db->where('id', $id_user);
        $this->db->update('user');
    }

    public function delete_user($id_user)
    {
        $this->db->where('id', $id_user);
        $this->db->delete('user');
    }

}