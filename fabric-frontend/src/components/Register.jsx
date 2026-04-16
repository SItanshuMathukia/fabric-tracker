import { useState } from "react";
import { registerUser } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold">Register</h2>

      <input name="name" placeholder="Name" onChange={handleChange} className="border p-2 w-full mt-2" />
      <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full mt-2" />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full mt-2" />

      <button onClick={handleSubmit} className="bg-green-600 text-white p-2 mt-3 w-full">
        Register
      </button>
    </div>
  );
}