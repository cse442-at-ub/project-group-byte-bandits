import axios from "axios";

export const create_csrf = async () => {
  try {
    const response = await axios.get(
      "https://cse.buffalo.edu/~jjalessi/auth/create_csrf"
    );

    console.log("RESPONSE", response.data.csrf_token);
    return response.data.csrf_token;
  } catch (error) {
    console.log("ERROR", error);
  }
};
