import { useState } from "react";
import { loginUser } from "../api/api";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
            const res = await loginUser(form);

            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("token", res.data.access_token); 
            navigate("/");
        } catch (err) {
            alert(err.response?.data?.detail || "Login failed");
        }
    };

  return (
    <div>
      <Header />
      <div className="p-6 max-w-md mx-auto">
        <h2 className="text-xl font-bold">Login</h2>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-2 w-full mt-2"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-2 w-full mt-2"
        />

        <button onClick={handleSubmit} className="bg-blue-600 text-white p-2 mt-3 w-full">
          Login
        </button>

        <p className="mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}