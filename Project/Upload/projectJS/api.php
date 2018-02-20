<?php

	// includes
	require_once 'inc/config.php';

	// connect
	$db = new PDO('mysql:host=' . $host . ';dbname=' . $name . ';charset=utf8', $user, $pass);

	// get vars
	$action = isset($_GET['action']) ? $_GET['action'] : '';
	$conversation_id = isset($_GET['conversation_id']) ? $_GET['conversation_id'] : '';

	// addcomment action
	if ($action == 'addcomment' && isset($_GET['email']) && isset($_GET['text'])) {
		// fetch conversation
		$statement = $db->prepare('SELECT * FROM conversations WHERE id = ?');
		$statement->execute(array($conversation_id));
		$conversation = $statement->fetch(PDO::FETCH_ASSOC);

		// error: conversation not found
		if (!$conversation) {
			http_response_code(404);
			exit(json_encode(array(
				'status' => 404,
				'message' => 'delete failed: conversation not found'
			)));
		}

		// add comment
		$statement = $db->prepare('INSERT INTO comments (text, email, conversation_id) VALUES(?, ?, ?)');
		$statement->execute(array($_GET['text'], $_GET['email'], $conversation_id));

		// give notice to client
		exit(json_encode(array(
			'status' => 200,
			'message' => 'comment added to conversation'
		)));
	}

	// getconversation action
	if ($action == 'getconversation') {
		// get num comments requested; defaults to 20
		$limit = isset($_GET['limit']) ? (int) $_GET['limit'] : 20;

		// fetch conversation
		$statement = $db->prepare('SELECT * FROM conversations WHERE id = ?');
		$statement->execute(array($conversation_id));
		$conversation = $statement->fetch(PDO::FETCH_ASSOC);

		// error: conversation not found
		if (!$conversation) {
			http_response_code(404);
			exit(json_encode(array(
				'status' => 404,
				'message' => 'delete failed: conversation not found'
			)));
		}

		// get conversation
		$statement = $db->prepare('
			SELECT *, c1.id FROM comments AS c1, conversations AS c2
			WHERE c1.conversation_id = c2.id AND c2.id = ?
			ORDER BY datetime
			LIMIT ' . $limit
		);
		$statement->execute(array($conversation_id));
		$comments = $statement->fetchAll(PDO::FETCH_ASSOC);
		$emails = array();
		foreach ($comments as $comment) {
			$emails[] = $comment['email'];
		}

		// give notice to client
		exit(json_encode(array(
			'status' => 200,
			'comments' => $comments,
			'emails' => array_unique($emails)
		)));
	}

	// invalid action
	http_response_code(400);
	exit(json_encode(array(
		'status' => 400,
		'message' => 'invalid API call'
	)));

