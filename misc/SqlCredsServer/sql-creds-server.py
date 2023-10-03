#!/bin/python3

from pathlib import Path
from os import umask
import pwd
from socket import socket, AF_UNIX, SOCK_STREAM, SOL_SOCKET, SO_PEERCRED
import struct

SQL_USERNAME = "user"
SQL_PASSWORD = "pass"
TRUSTED_USERS = { "apache" } # Users who should be allowed to know these credentials.

socket_path = Path('~/.apache_ipc/sql_creds.sock').expanduser()
if socket_path.is_socket():
	socket_path.unlink()

s = socket(AF_UNIX, SOCK_STREAM)

old_umask = umask(0)
s.bind(str(socket_path))
umask(old_umask)

s.listen()

while True:
	conn, client_addr = s.accept()

	creds = conn.getsockopt(SOL_SOCKET, SO_PEERCRED, struct.calcsize('3i'))
	pid, uid, gid = struct.unpack('3i', creds)
	pwd_entry = pwd.getpwuid(uid)
	username = pwd_entry.pw_name
	if username not in TRUSTED_USERS:
		conn.close()
		print("Refused connection from user " + username + ".")
		continue

	res = SQL_USERNAME + ':' + SQL_PASSWORD

	conn.send(bytes(res, encoding='utf-8'))
	conn.close()

	print("Granted credentials to user " + username + ".")
