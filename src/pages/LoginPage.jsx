import axios from "axios";
import Login from "../components/Login";
import { redirect } from "react-router-dom";

const LoginPage = () => {
  return <Login />;
};

export default LoginPage;

export const action = async ({ request }) => {
  try {
    const data = await request.formData();

    const loginData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    const response = await axios.post(
      "https://bookstore-api12.onrender.com/api/user/login",
      loginData
    );

    const token = response.data.data.token;
    const userId = response.data.data.userId;
    const username = response.data.data.username;

    localStorage.setItem("token", token);
    localStorage.setItem("user", userId);
    localStorage.setItem("username", username);

    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem("expiration", expiration.toISOString());

    return redirect("/");
  } catch (error) {
    return error.response;
  }
};
