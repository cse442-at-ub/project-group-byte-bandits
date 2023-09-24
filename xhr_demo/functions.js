function xhr_post_request() {
    var xhr = new XMLHttpRequest();
    const text_input = document.getElementById("text_input");
    const request = "content=" + text_input.value;
    xhr.addEventListener('load', function (event) {
        render_new_text(text_input.value);
    });
    xhr.open('POST', "http://127.0.0.1/xhr_demo/recieve_xhr.php");

    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(request);
}

function xhr_get_request() {
    const url = "http://127.0.0.1/xhr_demo/recieve_xhr.php"
    const rows = fetch(url);
    rows.then((response) => {
        const jsonPromise = response.json();
        jsonPromise.then((data) => {
            result = data.map(JSON.parse);
            result.forEach((element) => {
                container = document.getElementById("content");
                var row = document.createElement('p')
                row.innerHTML=element.user + ": "+element.content;
                container.appendChild(row);
            });
            return result;
        });
    });
}

function render_new_text(content) {
    container = document.getElementById("content");
    var new_text = document.createElement('p');
    new_text.innerHTML=content;
    container.appendChild(new_text);
}