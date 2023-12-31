import axios from "axios";
import { redirect } from "react-router-dom";
import Register from "../components/Register";

const RegisterPage = () => {
  return <Register />;
};

export default RegisterPage;

export const action = async ({ request }) => {
  try {
    const data = await request.formData();

    const userData = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
    };

    await axios.post(
      "https://bookstore-api12.onrender.com/api/user/register",
      userData
    );

    return redirect("/login");
  } catch (error) {
    return error.response;
  }
};
