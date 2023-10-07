<body onload="xhr_get_request(1337)">
    <div id='content'></div>
    <div>
    <input id="text_input" placeholder="enter message" type="text"/>
    <button onclick="xhr_post_request(1337,'admin')"> send request </button>
    <script type="text/javascript" src="functions.js"></script>
    </div>
    <a href="../auth/logout.php">logout</a>
</body>