// const url = "https://cse.buffalo.edu/~jderosa3/send_messages/recieve_xhr.php"

// function xhr_post_request() {
//     var xhr = new XMLHttpRequest();
//     const text_input = document.getElementById("text_input");
//     const request = "content=" + text_input.value;      // forming html post request
//     text_input.value = "";
//     xhr.addEventListener('load', function (event) {
//         console.log("data sent");
//     });
//     xhr.open('POST', url);
//     xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//     xhr.send(request);
// }

// function xhr_get_request() {
//     const rows = fetch(url);    // gives array of json records collected from the database (string)
//     rows.then((response) => {
//         const jsonPromise = response.json();    // turns the array of strings into json object filled w strings
//         jsonPromise.then((data) => {
//             result = data.map(JSON.parse);      // turn the text record string into a json obj
//             setTimeout(function(){xhr_get_request();}, 2000);   // call the function every 2 seconds
//             container = document.getElementById("content");
//             container.replaceChildren();        // clear the container
//             result.forEach((element) => {
//                 var row = document.createElement('p')   // append contents of each json obj to a p element
//                 row.innerHTML=element.user + ": " + element.content;
//                 container.appendChild(row);
//             });
//             return result;
//         });
//     });
// }
