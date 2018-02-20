<?php

	// includes
	require_once 'inc/config.php';

	// connect
	$db = new PDO('mysql:host=' . $host . ';dbname=' . $name . ';charset=utf8', $user, $pass);

	// die(md5( strtolower( trim( "rogier.vanderlinde@odisee.be" ) ) ));

?>
<!DOCTYPE html>
<html>
<head>
	<title>2017 Clientside Scripting Project</title>
	<meta charset="utf-8" />
	<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
	<link href="fonts/roboto/webfont.css" rel="stylesheet" />
	<link href="css/styles.css" rel="stylesheet" />
	<link href="http://netdna.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" rel="stylesheet">
</head>
<body>
	<div class="page__wrapper">
		<header class="page__header">
			<h1 class="page__title">
				Simple chatroom
			</h1>
		</header>
		<main class="page__main">
			<div class="main__wrapper">
				<div class="main__conversation">
				</div>
				<hr class="main__divider">
				<div class="main__newcomment">
					<label for="newcomment__email" class="newcomment__label">Your email *</label>
					<input type="email" id="newcomment__email">
					<label for="newcomment__text" class="newcomment__label">Your comment *</label>
					<textarea id="newcomment__text" id="comment"></textarea>
					<div class="newcomment__buttons">
						<input type="button" value="add comment" id="newcomment__add" />
					</div>
				</div>
			</div>
		</main>
	</div>	
	<footer class="page__footer">
		<p class="text-center">design inspired by <a href="http://demos.creative-tim.com/rotating-card">Creative Tim's rotating cards</a> </p>
	</footer>
</body>
</html>
