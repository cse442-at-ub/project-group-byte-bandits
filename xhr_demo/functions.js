function send_xhr_request() {
    const text = "hello jacob";

    var xhr = new XMLHttpRequest();
    const request = "test=" + text;
    xhr.addEventListener('load', function (event) {
        console.log('data sent');
    });
    xhr.open('POST', "http://127.0.0.1/recieve_xhr.php");

    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(request);
}