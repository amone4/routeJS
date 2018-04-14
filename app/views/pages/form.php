<form method="post" action="<?php echo URLROOT; ?>/pages/form" id="postForm">
	<input type="text" name="username">
	<input type="password" name="password">
	<button type="submit" name="submit" class="routeJSForm" routeJSTarget="postForm">submit</button>
</form>

<form method="get" action="<?php echo URLROOT; ?>/pages/form" id="getForm">
	<input type="text" name="username">
	<button type="submit" name="submit" class="routeJSForm" routeJSTarget="getForm">submit</button>
</form>