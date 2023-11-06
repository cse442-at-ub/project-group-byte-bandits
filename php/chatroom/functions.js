const url = "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/chatroom/process_request";

function post_message() {
    var xhr = new XMLHttpRequest();
    const text_input = document.getElementById("text_input");
    const request = "content=" + text_input.value;      // forming html post request
    text_input.value = "";
    xhr.addEventListener('load', function (event) {
        console.log("data sent");
    });
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(request);
}

function load_content() {
    const rows = fetch(url);    // gives array of json records collected from the database (string)
    rows.then((response) => {
        const jsonPromise = response.json();    // turns the array of strings into json object filled w strings
        jsonPromise.then((data) => {
            result = data.map(JSON.parse);      // turn the text record string into a json obj
            setTimeout(function(){load_content();}, 2000);   // call the function every 2 seconds
            container = document.getElementById("content");
            container.replaceChildren();        // clear the container
            result.forEach((element) => {
                var row = document.createElement('p')   // append contents of each json obj to a p element
                row.innerHTML=element.user + ": " + element.content;
                container.appendChild(row);
            });
            return result;
        });
    });
}

function request_join_chatroom(id) {
    const url = "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/chatroom/join_chatroom";
    var xhr = new XMLHttpRequest();
    const request = "id=" + id;      // forming html post request
    xhr.addEventListener('load', function (event) {
        console.log("data sent");
    });
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(request);
}

function request_disconnect_chatroom(id) {
    const url = "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/chatroom/disconnect_chatroom";
    var xhr = new XMLHttpRequest();
    const request = "id=" + id;      // forming html post request
    xhr.addEventListener('load', function (event) {
        console.log("data sent");
    });
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(request);
}

function load_chatrooms() {
    const url = "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/chatroom/load_chatrooms";
    const rows = fetch(url);    // gives array of json records collected from the database (string)
    rows.then((response) => {
        const jsonPromise = response.json();    // turns the array of strings into json object filled w strings
        jsonPromise.then((data) => {
            result = data.map(JSON.parse);      // turn the text record string into a json obj
            result.forEach((element) => {
                console.log(element);
                var row = document.createElement('button')
                row.innerHTML=element.id+ ": "+ element.location;
                row.addEventListener('click', function(){
                    request_join_chatroom(element.id);
                });
                document.body.appendChild(row);
                document.body.appendChild(document.createElement('br'));
            });
            return result;
        });
    });
}