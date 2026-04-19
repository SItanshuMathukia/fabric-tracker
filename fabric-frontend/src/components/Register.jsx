import { useState } from "react";
import { registerUser } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await registerUser(form);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.detail || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6f7fb] p-4 dark:bg-[#0b1020]">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl dark:bg-gray-900">
        <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Register</h2>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          Create your account to access the dashboard
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 p-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 p-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 p-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl p-3 text-white transition ${
              loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700 active:scale-[0.98]"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}