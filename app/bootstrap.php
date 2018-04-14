<?php
// load config
require_once 'config/config.php';

// autoload core libraries
spl_autoload_register(function($classname){
	require_once 'libraries/' . $classname . '.php';
});

// loading all helper files
require_once 'helpers/control_messages.php';
require_once 'helpers/form_validations.php';
require_once 'helpers/misc.php';
require_once 'helpers/unique_id.php';
require_once 'helpers/misc.php';