<!DOCTYPE html>
<meta charset='utf-8'>

<html>
	<head>
	</head>

	<body>
		<?php
			return;
			$socket_path = '/web/CSE442-542/2023-Fall/cse-442a/private/sql-creds.sock';
			$sock = socket_create(AF_UNIX, SOCK_STREAM, 0);
			$success = socket_connect($sock, $socket_path);

			socket_recv($sock, $buf, 1024, MSG_WAITALL);
			socket_close($sock);

			echo $buf;
		?>
	</body>
</html>
