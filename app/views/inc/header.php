<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link rel="stylesheet" href="<?php echo URLROOT; ?>/css/main.css">
	<title><?php echo SITENAME; ?></title>
</head>
<body>
    <script>const rootURL = '<?php echo URLROOT; ?>';</script>

    <?php require_once 'navbar.php'; ?>

	<div id="routeJSLoader">
	    <div id="routeJSLoaderFiller"></div>
	</div>

    <div class="routeJSresponse" id="container">