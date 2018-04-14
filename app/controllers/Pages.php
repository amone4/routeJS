<?php

class Pages extends Controller {

	public function index() {
	    $this->view('pages/index');
	}

	public function about() {
	    $this->view('pages/about');
	}

	public function form() {
	    if ($_SERVER['REQUEST_METHOD'] === 'POST')
	        echo 'Username: ' . $_POST['username'] . '<br>Password: ' . $_POST['password'];
	    elseif (isset($_GET['username']))
	        echo 'Username: ' . $_GET['username'];
        else
            $this->view('pages/form');
	}
}