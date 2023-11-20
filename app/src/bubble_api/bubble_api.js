import axios from "axios";
import qs from "qs";

const chatroom_process_request_url = "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/chatroom/process_request";
const generate_csrf_token_url = "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/auth/generate_csrf";
const handle_login_state_url = "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/auth/handle_login_state";
const auto_login_url = "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/auth/auto_login";
const validate_login_url = "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/auth/validate_login";
const validate_signup_url = "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/auth/validate_signup";
const join_chatroom_url = "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/chatroom/join_chatroom";
const disconnect_chatroom_url = "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/chatroom/disconnect_chatroom";
const load_chatrooms_url = "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/chatroom/load_chatrooms";
const user_location_url = "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/auth/update_user_location";

export async function make_csrf_token() {
    const csrf_response = await axios.get(generate_csrf_token_url);
    csrf_data = csrf_response.data;
    return csrf_data.csrf_token;
}

export async function handle_login_state(navigation) {
    const response = await axios.get(handle_login_state_url);
    login_state_data = response.data;
    console.log(login_state_data);
    if (login_state_data != "") {
        navigation.navigate("Login");
    }
}

export async function handle_auto_login(navigation) {
    const response = await axios.get(auto_login_url);
    login_state_data = response.data;
    console.log(login_state_data);
    if (login_state_data == '') {
      navigation.navigate("HomePage");
    }
}

export async function load_messages() {
    const response = await axios.get(chatroom_process_request_url);
    const data = response.data;
    let text_messages = [];
    data.forEach(element => {
        const text_data = JSON.parse(element);
        const user = text_data.user;
        const content = text_data.content;
        text_messages.push([user, content]);
    });
    return text_messages;
}

export async function send_text_message(content) {
    const data = qs.stringify({
      content: content
    });
    const token = await make_csrf_token();

    const response = await axios.post(
      chatroom_process_request_url,
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Csrf-Token": token,
        },
      }
    );
    return response.data;
}

export async function secure_login(username, password) {
    const data = qs.stringify({
        username: username,
        password: password,
    });
    const token = await make_csrf_token();
    const response = await axios.post(
        validate_login_url,
        data,
        {
            headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Csrf-Token": token,
            },
        }
    );
    return response.data;
}

export async function secure_signup(email, password, confirmPassword) {
    const data = qs.stringify({
        email: email,
        password: password,
        password_check: confirmPassword,
        initiate: true
    });
    const token = await make_csrf_token();
    const response = await axios.post(
        validate_signup_url,
        data,
        {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Csrf-Token": token,
        },
        }
    );
    return response.data;
};

export async function create_username() {
    const data = qs.stringify({
        username:username,
        initiate:false
    });
    const token = await make_csrf_token();
    const response = await axios.post(
        validate_signup_url,
        data,
        {
            headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Csrf-Token": token,
            },
        }
        );
    return response.data;
}

export async function connect_to_chatroom(chatroom_id) {
    const data = qs.stringify({
      id: chatroom_id,
    });

    const token = await make_csrf_token();
    const response = await axios.post(
      join_chatroom_url,
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Csrf-Token": token,
        },
      }
    );
    return response.data;
}

export async function disconnect_from_chatroom() {
    const response = await axios.get(disconnect_chatroom_url);
    return response.data;
}

export async function load_chatrooms() {
    const response = await axios.get(load_chatrooms_url);
    let chatrooms = [];
    const data = await response.data;
    data.forEach((element) => {
      element = JSON.parse(element);
      id = element.id;
      loc = element.location;
      host = element.host;
      chatrooms.push([id, loc, host]);
    });
    return chatrooms;
}

export async function update_location(longitue_coord, latidute_coord) {
    const data = qs.stringify({
        long: longitue_coord,
        lat: latidute_coord,
        });
    const token = await make_csrf_token();
    const response = await axios.post(
        user_location_url,
        data,
        {
            headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Csrf-Token": token,
            },
        }
    );
    return response.data;
}