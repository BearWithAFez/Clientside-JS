<?php

	// includes
	require_once 'inc/config.php';

	// connect
	$db = new PDO('mysql:host=' . $host . ';dbname=' . $name . ';charset=utf8', $user, $pass);

	// get cards
	$statement = $db->prepare('SELECT * FROM cards ORDER BY ?');
	$statement->execute(array('order'));
	$cards = $statement->fetchAll(PDO::FETCH_ASSOC);

	// get pictures for each card
	for ($i = 0; $i < count($cards); $i++) {
		$card = $cards[$i];
		$statement = $db->prepare('SELECT * FROM pictures WHERE card_id = ?');
		$statement->execute(array($card['id']));
		$cards[$i]['pictures'] = $statement->fetchAll(PDO::FETCH_ASSOC);
	}

?>
<!DOCTYPE html>
<html>
<head>
	<title>Rotating CSS Cards by Creative Tim </title>
	<meta charset="utf-8" />
	<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
	<link href="css/styles.css" rel="stylesheet" />
	<link href="http://netdna.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" rel="stylesheet">
</head>
<body>
	<div class="page__wrapper">
		<header class="page__header">
			<h1 class="page__title">
				Ons team staat je bij
				<small>professioneel advies voor een professioneel resultaat</small>
			</h1>
		</header>
		<main class="page__main">
<?php

foreach ($cards as $card) :

?>			
			<div class="card-container">
				<article class="card" data-contact-id="<?php echo $card['id']; ?>">
					<div class="front">
						<header class="front__header">
							<div class="front__visual-container">
								<img src="img/<?php echo $card['visual']; ?>" alt="visual" class="front__visual">
							</div>
							<div class="front__picture-container">
<?php

	foreach ($card['pictures'] as $i=>$picture) :

?>			
								<img class="front__picture js-picture <?php echo $i == 0 ? '' : 'hidden'; ?>" src="img/<?php echo $picture['filename']; ?>">
<?php

	endforeach;

?>			
							</div>							
							<span class="front__message">click to change! <i class="fa fa-hand-o-right" aria-hidden="true"></i></span>
						</header>
						<main class="card__content">
							<h3 class="front__title"><?php echo $card['name']; ?></h3>
							<p class="front__profession">backend developer</p>
							<blockquote class="front__quote"><?php echo $card['quote']; ?></blockquote>
							<a href="#" class="quote__next">next quote &rarr;</a>
						</main>
						<footer class="card__footer">
							<ul class="card__bottommenu">
								<li><a href="#" title="toggle favorite" class="js-fav"><i class="fa <?php echo $card['is_favorite'] ? 'fa-star' : 'fa-star-o'; ?>" aria-hidden="true"></i></a></li><li><a href="#" class="js-trash" title="trash this contact"><i class="fa fa-trash-o" aria-hidden="true"></i></a></li>
							</ul>
							<a href="#" class="card__flip js-flip"><i class="fa fa-mail-forward"></i> back</a>
						</footer>
					</div> <!-- end front panel -->
					<div class="back">
						<header class="back__header">
							<h4 class="back__motto">“<?php echo $card['motto']; ?>”</h4>
						</header>
						<main class="card__content">
							<h4 class="back__title">Professional skills</h4>
							<p class="back__skills"><?php echo $card['skills']; ?>/p>
							<h4 class="back__title">Contact me!</h4>
							<p class="back__contactinfo">
								<a href="mailto:<?php echo $card['email']; ?>"><i class="fa fa-envelope-o" aria-hidden="true"></i> <?php echo $card['email']; ?></a>
								<a href="tel:<?php echo $card['tel']; ?>"><i class="fa fa-mobile" aria-hidden="true"></i> <?php echo $card['tel']; ?></a>
								<a href="https://www.facebook.com/<?php echo $card['facebook']; ?>"><i class="fa fa-facebook" aria-hidden="true"></i> <?php echo $card['facebook']; ?></a>
								<a href="https://twitter.com/<?php echo $card['twitter']; ?>"><i class="fa fa-twitter" aria-hidden="true"></i> @<?php echo $card['twitter']; ?></a>
							</p>

						</main>
						<footer class="card__footer">
							<ul class="card__bottommenu">
								<li><a href="#" title="edit details" class="js-edit"><i class="fa fa-edit" aria-hidden="true"></i></a></li>
							</ul>
							<a href="#" class="card__flip js-flip"><i class="fa fa-mail-reply"></i> front</a>
						</footer>
					</div> <!-- end back panel -->
				</article> <!-- end card -->
			</div> <!-- end card-container -->
<?php

endforeach;

?>			
		</main>
	</div>	
	<!-- modals -->
	<div id="dialog-delete" class="ui-dialog" title="Contact verwijderen">
		<p>Ben je zeker dat je {{name}} wil verwijderen? Dit kan niet ongedaan gemaakt worden.</p>
	</div>
	<footer class="page__footer">
		<p class="text-center">design inspired by <a href="http://demos.creative-tim.com/rotating-card">Creative Tim's rotating cards</a> </p>
	</footer>
</body>

<script src="vendor/jQuery.js"></script>
<script src="vendor/jquery-ui/jquery-ui.js"></script>
<script src="js/scripts.js"></script>
</html>
