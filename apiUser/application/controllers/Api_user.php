<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Api_user extends CI_Controller
{

    public function __construct()
    {

        parent::__construct();
        $this->load->model('User_model', 'User_model');
    }

    public function response($data)
    {
        $message = $data['message'];
        $status = $data['status'];
        $code = $data['code'];
        $data = $data['data'];
        $this->output->set_content_type('application/json', 'utf-8');
        $this->output->set_status_header($code);
        $this->output->set_header('Access-Control-Allow-Origin: *');
        $this->output->set_output(json_encode(array('status' => $status, 'message' => $message, 'data' => $data)))
            ->_display();
        exit;
    }


    public function index()
    {
        $data['data'] = $this->User_model->get_all_user();
        if (empty($data['data'])) {
            $data['message'] = "no data found";
            $data['status'] = "ko";
            $data['code'] = 404;
            $data['data'] = [];
            return $this->response($data);
        }
        $data['message'] = "success";
        $data['status'] = "ok";
        $data['code'] = 200;
        return $this->response($data);
    }


    public function deleteUser($id_user)
    {
        $this->User_model->delete_user($id_user);
        if ($this->db->affected_rows() == 0) {
            $data['message'] = "no data found";
            $data['status'] = "ko";
            $data['code'] = 404;
            $data['data'] = [];
            return $this->response($data);
        }

        $data['code'] = 204;
        return $this->response($data);
    }

    public function getUser($id_user)
    {
        $data['data'] = $this->User_model->get_user($id_user);
        if (empty($data['data'])) {
            $data['message'] = "no data found";
            $data['status'] = "ko";
            $data['code'] = 404;
            $data['data'] = [];
            return $this->response($data);
        }
        $data['message'] = "success";
        $data['status'] = "ok";
        $data['code'] = 200;
        $data['data'] = $data['data'][0];
        return $this->response($data);
    }

    public function updateUser()
    {
        $request = json_decode($this->input->raw_input_stream, true);
        $id_user = $request['id'];
        $firstname = $request['firstname'];
        $lastname = $request['lastname'];
        $email = $request['email'];

        $this->User_model->update_user($id_user, $firstname, $lastname, $email);
        if ($this->db->affected_rows() == 0) {
            $data['message'] = "request failed";
            $data['status'] = "ko";
            $data['code'] = 400;
            $data['data'] = $request;
            return $this->response($data);
        }

        $data['code'] = 204;

        return $this->response($data);
    }


    public function createUser()
    {
        $request = json_decode($this->input->raw_input_stream, true);
        $firstname = $request['firstname'];
        $lastname = $request['lastname'];
        $email = $request['email'];

        $this->User_model->insert_user($firstname, $lastname, $email);
        if ($this->db->affected_rows() == 0) {
            $data['message'] = "request failed";
            $data['status'] = "ko";
            $data['code'] = 400;
            $data['data'] = $request;
            return $this->response($data);
        }
        $data['message'] = "success";
        $data['status'] = "ok";
        $data['code'] = 201;
        $data['data'] = $request;
        return $this->response($data);
    }
}
