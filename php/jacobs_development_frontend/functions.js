function create_input_element(type, name, value='') {
    input = document.createElement('input');
    input.name = name;
    input.type = type;
    input.value = value;
    return input;
}

import React, { useState } from 'react';

function login_form() {
    const head = document.createElement("h1");
    head.innerHTML = "DEMO LOGIN FORM";
    document.body.appendChild(head);

    form = document.createElement('form');
    input_u = create_input_element('text','username'); input_u.placeholder='enter username';
    input_p = create_input_element('password','password'); input_p.placeholder='enter password'
    input_s = create_input_element('submit','login', value='login');
    const [username,SetUsername] = useState('fuck');
    form.addEventListener('submit', function (event) {

        async function secure_post() {
            const rows = await fetch("https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/auth/generate_csrf");
            const response = await rows.json();
            if (!response.ok) {
                const message = `An error has occured: ${response.status}`;
                throw new Error(message);
              }
            response.then(csrf_data => {
                SetUsername(csrf_data.csrf_token);  
            });
        }
        secure_post();
        console.log(username);
    });

    br = document.createElement('br');
    inputs = [input_u, br, input_p, br, input_s];
    for (var i=0; i < inputs.length; i++) {
        form.appendChild(inputs[i]);
    }
    document.body.append(form);
}

function signup_form() {
    const head = document.createElement("h1");
    head.innerHTML = "DEMO SIGNUP FORM";
    document.body.appendChild(head);

    form = document.createElement('form');
    
    input_u = create_input_element('text','username'); input_u.placeholder='enter username';
    input_e = create_input_element('text','email'); input_e.placeholder='enter email';
    input_p = create_input_element('password','password'); input_p.placeholder = 'enter password';
    input_pc = create_input_element('password','password_check'); input_pc.placeholder = 're-enter password';
    input_s = create_input_element('submit','signup', value='signup');

    form.addEventListener('submit', function (event) {
        console.log('submitting');
        const url = "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/account_ops/update_profile";
        
        var xhr = new XMLHttpRequest();
        const request = "username=" + input_u.value + "&email="+input_e.value+"&password="+input_p.value+"&password_check="+input_pc.value;
        console.log(request);
        xhr.addEventListener('load', function (event) {
            console.log("data sent");
        });
        xhr.open('POST', url, true);
    
        const rows = fetch("https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/auth/generate_csrf");
        rows.then((response) => {
            const jsonPromise = response.json();
            jsonPromise.then((data) => {
                csrf_token = data.csrf_token;
                console.log(csrf_token);
                xhr.setRequestHeader('X-Csrf-Token', csrf_token);
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xhr.send(request);
            });
        });
        
    });

    br = document.createElement('br');
    inputs = [input_u, br, input_e, br, input_p, br, input_pc, br, input_s];
    for (var i=0; i < inputs.length; i++) {
        form.appendChild(inputs[i]);
    }
    document.body.append(form);
}

function change_profile_form() {
    const head = document.createElement("h1");
    head.innerHTML = "CHANGE PROFILE FORM";
    document.body.appendChild(head);

    form = document.createElement('form');
    
    input_u = create_input_element('text','username'); input_u.placeholder='enter username';
    input_e = create_input_element('text','email'); input_e.placeholder='enter email';
    input_p = create_input_element('password','password'); input_p.placeholder = 'enter password';
    input_pc = create_input_element('password','password_check'); input_pc.placeholder = 're-enter password';
    input_s = create_input_element('submit','save changes',value='save changes');
    
    form.addEventListener('submit', function (event) {
        console.log('submitting');
        const url = "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/account_ops/update_profile";
        
        var xhr = new XMLHttpRequest();
        const request = "username=" + input_u.value + "&email="+input_e.value+"&password="+input_p.value+"&password_check="+input_pc.value;      // forming html post request
        console.log(request);
        xhr.addEventListener('load', function (event) {
            console.log("data sent");
        });
        xhr.open('POST', url, true);
    
        const rows = fetch("https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/auth/generate_csrf");
        rows.then((response) => {
            const jsonPromise = response.json();
            jsonPromise.then((data) => {
                csrf_token = data.csrf_token;
                console.log(csrf_token);
                xhr.setRequestHeader('X-Csrf-Token', csrf_token);
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xhr.send(request);
            });
        });
        
    });

    br = document.createElement('br');
    inputs = [input_u, br, input_e, br, input_p, br, input_pc, br, input_s];
    for (var i=0; i < inputs.length; i++) {
        form.appendChild(inputs[i]);
    }
    document.body.append(form);
}

function create_chatroom_form() {
    const head = document.createElement("h1");
    head.innerHTML = "CREATE CHATROOM FORM";
    document.body.appendChild(head);

    form = document.createElement('form');

    input_r = create_input_element('number','radius');
    input_m = create_input_element('number','max persons');
    input_p = create_input_element('checkbox','privacy',value='true');
    input_s = create_input_element('submit','create room', value='create room');
    
    form.addEventListener('submit', function (event) {
        console.log('submitting');
        const url = "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/chatroom/create_chatroom";
        
        var xhr = new XMLHttpRequest();
        const request = "radius=" + input_r.value + "&maxpersons="+input_m.value+"&privacy="+input_p.value;      // forming html post request
        console.log(request);
        xhr.addEventListener('load', function (event) {
            console.log("data sent");
        });
        xhr.open('POST', url, true);
    
        const rows = fetch("https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/auth/generate_csrf");
        rows.then((response) => {
            const jsonPromise = response.json();
            jsonPromise.then((data) => {
                csrf_token = data.csrf_token;
                console.log(csrf_token);
                xhr.setRequestHeader('X-Csrf-Token', csrf_token);
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xhr.send(request);
            });
        });
        
    });

    br = document.createElement('br');
    inputs = [input_r, br, input_m, br, input_p, br, input_s];
    for (var i=0; i < inputs.length; i++) {
        form.appendChild(inputs[i]);
    }
    document.body.append(form);
}

function post_message() {
    const url = "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/chatroom/process_request";
    var xhr = new XMLHttpRequest();
    const text_input = document.getElementById("text_input");
    const request = "content=" + text_input.value;      // forming html post request
    text_input.value = "";
    xhr.addEventListener('load', function (event) {
        console.log("data sent");
    });
    xhr.open('POST', url, true);
    
    url = "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/auth/generate_csrf";
    const rows = fetch(url);    // gives array of json records collected from the database (string)
    rows.then((response) => {
        const jsonPromise = response.json();    // turns the array of strings into json object filled w strings
        jsonPromise.then((data) => {
            csrf_token = data.csrf_token;
            console.log(csrf_token);
            xhr.setRequestHeader('X-Csrf-Token', csrf_token);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send(request);
        });
    });
}

function load_content() {
    const url = "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/chatroom/process_request";
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
    var url = "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/chatroom/join_chatroom";
    var xhr = new XMLHttpRequest();
    const request = "id=" + id;      // forming html post request
    xhr.addEventListener('load', function (event) {
        console.log("data sent");
    });
    
    xhr.open('POST', url);

    url = "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/auth/generate_csrf";

    const rows = fetch(url);
    rows.then((response) => {
        const jsonPromise = response.json();    // turns the array of strings into json object filled w strings
        jsonPromise.then((data) => {
            csrf_token = data.csrf_token;
            console.log(csrf_token);
            xhr.setRequestHeader('X-Csrf-Token', csrf_token);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send(request);
        });
    });
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
                var row = document.createElement('button');
                row.innerHTML=element.id+ ": "+ element.location;
                row.addEventListener('click', function() {
                    request_join_chatroom(element.id);
                });
                document.body.appendChild(row);
                document.body.appendChild(document.createElement('br'));
            });
            return result;
        });
    });
}