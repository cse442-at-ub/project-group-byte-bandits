import axios from "axios";
import qs from "qs";

const chatroom_process_request_url =
  "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/chatroom/process_request";
const join_chatroom_url =
  "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/chatroom/join_chatroom";
const create_chatroom_url =
  "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/chatroom/create_chatroom";
const disconnect_chatroom_url =
  "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/chatroom/disconnect_chatroom";
const load_chatrooms_url =
  "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/chatroom/load_chatrooms";
  const chatroom_data_url =
  "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/chatroom/chatroom_data";
  const delete_chatroom_url =
  "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/chatroom/delete_chatroom";



const generate_csrf_token_url =
  "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/auth/generate_csrf";

const handle_login_state_url =
  "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/auth/handle_login_state";
const auto_login_url =
  "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/auth/auto_login";
const validate_login_url =
  "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/auth/validate_login";
const validate_signup_url =
  "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/auth/validate_signup";

const user_location_url =
  "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/auth/update_user_location";
const user_profile_url =
  "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/account_ops/profile_data";
const user_location_data_url =
  "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/auth/user_location_data";
const public_user_data_url =
  "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/user_ops/user_data";
const send_friend_request_url =
  "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/account_ops/send_friend_request";
const friend_data_url =
  "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/account_ops/friend_data";
const friend_request_response_url =
  "https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442a/account_ops/friend_request_response";

function post_request_headers(csrf_token) {
  return {
    "Content-Type": "application/x-www-form-urlencoded",
    "X-Csrf-Token": csrf_token,
  };
}

export async function make_csrf_token() {
  const csrf_response = await axios.get(generate_csrf_token_url);
  csrf_data = csrf_response.data;
  return csrf_data.csrf_token;
}

export async function handle_login_state(navigation) {
  const response = await axios.get(handle_login_state_url);
  login_state_data = response.data;
  if (login_state_data != "") {
    navigation.navigate("Login");
  }
}

export async function handle_auto_login(navigation) {
  const response = await axios.get(auto_login_url);
  login_state_data = response.data;
  if (login_state_data == "") {
    navigation.navigate("HomePage");
  }
}

export async function load_messages() {
  const response = await axios.get(chatroom_process_request_url);
  const data = await response.data;
  let text_messages = [];
  data.forEach((element) => {
    const text_data = JSON.parse(element);
    const user = text_data.user;
    const content = text_data.content;
    text_messages.push([user, content]);
  });
  return text_messages;
}

export async function send_text_message(content) {
  const data = qs.stringify({
    content: content,
  });
  const token = await make_csrf_token();
  const response = await axios.post(chatroom_process_request_url, data, {
    headers: post_request_headers(token),
  });
  console.log(response.data);
  return response.data;
}

export async function secure_login(username, password) {
  const data = qs.stringify({
    username: username,
    password: password,
  });
  const token = await make_csrf_token();
  const response = await axios.post(validate_login_url, data, {
    headers: post_request_headers(token),
  });
  return response.data;
}

export async function secure_signup(email, password, confirmPassword) {
  const data = qs.stringify({
    email: email,
    password: password,
    password_check: confirmPassword,
    initiate: true,
  });
  const token = await make_csrf_token();
  const response = await axios.post(validate_signup_url, data, {
    headers: post_request_headers(token),
  });
  return response.data;
}

export async function create_username(username) {
  const data = qs.stringify({
    username: username,
    initiate: false,
  });
  const token = await make_csrf_token();
  const response = await axios.post(validate_signup_url, data, {
    headers: post_request_headers(token),
  });
  return response.data;
}

export async function connect_to_chatroom(chatroom_id) {
  console.log(chatroom_id);
  const data = qs.stringify({
    id: chatroom_id,
  });

  const token = await make_csrf_token();
  const response = await axios.post(join_chatroom_url, data, {
    headers: post_request_headers(token),
  });
  console.log(response.data);
  return response.data;
}

export async function disconnect_from_chatroom() {
  const chatroom_data = await load_chatroom_data();
  const profile_data = await load_profile_data();
  if(chatroom_data.host == profile_data.id) {
    const response = await axios.get(delete_chatroom_url);
    console.log(response.data);
    return response.data;
  } else {
    const response = await axios.get(disconnect_chatroom_url);
    console.log(response.data);
    return response.data;
  }

}

export async function load_chatroom_data() {
  const response = await axios.get(chatroom_data_url);
  return response.data;

}

function encode_chatroom_data(chatroom_data) {
  return [
      " id: ", chatroom_data.id,
      " , ", "distance: ", chatroom_data.distance,
      " , ", "host: ", chatroom_data.host,
      " , ", "name: ", chatroom_data.name,
      " , ", "description: ", chatroom_data.description
  ];
}

export async function load_chatrooms(long, lat) {
  const response = await axios.get(load_chatrooms_url);
  const chatroom_data = await load_chatroom_data();
  const profile_data = await load_profile_data();

  let chatrooms = [];

  if (chatroom_data.code)
    console.log(chatroom_data);

  const data = await response.data;
  data.forEach((element) => {
    element = JSON.parse(element);
    const id = element.id;
    const ch_long = parseFloat(element.longitude);
    const ch_lat = parseFloat(element.latitude);
    const host = element.host;
    const radius = element.radius;
    const name = element.name;
    let description = element.description;

    if (description === "") {
        description = "No description";
    }
    const distance = Math.sqrt(Math.pow(long - ch_long, 2) + Math.pow(lat - ch_lat, 2));
    if (distance <= radius && host != profile_data.id && id != chatroom_data.id) {
      console.log(distance);
      chatrooms.push([
        " id: ", id,
        " , ", "distance: ", distance,
        " , ", "host: ", host,
        " , ", "name: ", name,
        " , ", "description: ", description
      ]);
    }
  });

  return chatrooms;
}

export async function create_chatroom(privacy, radius, maxpersons, description, name) {
  const data = qs.stringify({
    radius: radius,
    maxpersons: maxpersons,
    privacy: privacy,
    description: description,
    name: name
  });
  const token = await make_csrf_token();
  const response = await axios.post(create_chatroom_url, data, {
    headers: post_request_headers(token),
  });
  return response.data;
}

export async function update_location(longitue_coord, latidute_coord) {
  const data = qs.stringify({
    long: longitue_coord,
    lat: latidute_coord,
  });
  const token = await make_csrf_token();
  const response = await axios.post(user_location_url, data, {
    headers: post_request_headers(token),
  });
  return response.data;
}

export async function search_user(username) {
  const data = qs.stringify({
    username: username,
  });
  const token = await make_csrf_token();
  const response = await axios.post(public_user_data_url, data, {
    headers: post_request_headers(token),
  });

  return response.data;
}

export async function send_friend_request(user_id) {
  const data = qs.stringify({
    id: user_id,
  });
  const token = await make_csrf_token();
  const response = await axios.post(send_friend_request_url, data, {
    headers: post_request_headers(token),
  });
  return response.data;
}

export async function accept_friend_request(user_id) {
  const data = qs.stringify({
    user: user_id,
    response: "accepted",
  });
  const token = await make_csrf_token();
  const response = await axios.post(friend_request_response_url, data, {
    headers: post_request_headers(token),
  });
  return response.data;
}

export async function decline_friend_request(user_id) {
  const data = qs.stringify({
    user: user_id,
    response: "rejected",
  });
  const token = await make_csrf_token();
  const response = await axios.post(friend_request_response_url, data, {
    headers: post_request_headers(token),
  });
  return response.data;
}

export async function load_profile_data() {
  const response = await axios.get(user_profile_url);
  return response.data;
}

export async function get_friend_requests() {
  const user_response = await axios.get(user_profile_url);
  profile_data = user_response.data;
  const response = await axios.get(friend_data_url);
  let friend_requests = [];
  response.data.forEach((element) => {
    element = JSON.parse(element);
    const status = element.status;
    const recieving = element.user_r_id;
    if (status == 0 && recieving == profile_data.id) {
      friend_requests.push(element);
    }
  });
  return friend_requests;
}

export async function get_friends() {
  const user_response = await axios.get(user_profile_url);
  profile_data = user_response.data;
  const response = await axios.get(friend_data_url);
  let friends = [];
  response.data.forEach((element) => {
    element = JSON.parse(element);
    const status = element.status;
    if (status == 1) {
      if(element.user_s_id == profile_data.id) {
        friends.push([element.user_r_id, element.user_r_name]);
      } else {
        friends.push([element.user_s_id, element.user_s_name]);
      }
    }
  });
  return friends;
}
