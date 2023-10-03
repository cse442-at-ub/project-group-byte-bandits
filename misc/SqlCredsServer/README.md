# SQL Credentials Server

The environment that our PHP code will be in allows any user to read through the code.
Attempts to prevent this with file permissions will also prevent the web server from reading them, so that is not feasible.
The system in this directory works around this issue by means of a UNIX socket.
This socket may be placed anywhere in the filesystem where both the user running it and the web server can access it.
When we want to open a connection to the database in PHP, we may then open a connection to the UNIX socket.
The Python program will then check to see if the connecting user is allowed to know the credentials.
If they are, the credentials will be sent through back through the socket.
Otherwise, the connection will simply be closed with no data sent.
