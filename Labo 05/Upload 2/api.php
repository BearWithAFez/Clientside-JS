<?php

	// includes
	require_once 'inc/config.php';

	// connect
	$db = new PDO('mysql:host=' . $host . ';dbname=' . $name . ';charset=utf8', $user, $pass);

	// to demonstrate the async aspect
	sleep(1);

	// get vars
	$action = isset($_GET['action']) ? $_GET['action'] : '';

	// delete action
	if ($action == 'delete' && isset($_GET['id'])) {		
		// get id
		$id = (int) $_GET['id'];

		// fetch card
		$statement = $db->prepare('SELECT * FROM cards WHERE id = ?');
		$statement->execute(array($id));
		$card = $statement->fetch(PDO::FETCH_ASSOC);

		// card not found
		if (!$card) {
			http_response_code(404);
			exit(json_encode(array(
				'status' => 404,				
				'message' => 'delete failed: contact not found'
			)));
		}

		// delete card
		$statement = $db->prepare('DELETE FROM cards WHERE id = ?');
		$statement->execute(array($id));

		// give notice to client
		exit(json_encode(array(				
			'status' => 200,				
			'message' => 'delete OK'
		)));
	}

	// fav action
	if ($action == 'setfav' && isset($_GET['id'])) {		
		// get id
		$id = (int) $_GET['id'];

		// fetch card
		$statement = $db->prepare('SELECT * FROM cards WHERE id = ?');
		$statement->execute(array($id));
		$card = $statement->fetch(PDO::FETCH_ASSOC);

		// card not found
		if (!$card) {
			http_response_code(404);
			exit(json_encode(array(
				'status' => 404,				
				'message' => 'favorite set failed: contact not found'
			)));
		}

		// update card
		$statement = $db->prepare('UPDATE cards SET is_favorite = ? WHERE id = ?');
		$statement->execute(array($card['is_favorite'] ? 0 : 1, $id));

		// give notice to client
		exit(json_encode(array(
			'status' => 200,				
			'message' => 'favorite set OK'
		)));
	}	

	// invalid action
	http_response_code(400);
	exit(json_encode(array(
		'status' => 400,				
		'message' => 'invalid API call'
	)));		

