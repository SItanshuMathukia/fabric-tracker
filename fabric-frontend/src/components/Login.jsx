import { useState } from "react";
import { loginUser } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  function goToRegister() {
    navigate("/register");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await loginUser(form);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.access_token);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6f7fb] p-4 dark:bg-[#0b1020]">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl dark:bg-gray-900">
        <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Login</h2>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          Access your Shruti Apparels dashboard
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <button
          onClick={goToRegister}
          className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
        >
          Create an account
        </button>
      </div>
    </div>
  );
}