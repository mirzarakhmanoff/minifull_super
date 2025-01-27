"use client";
import { useState } from "react";
import axios from "../../lib/axios";
import { useRouter } from "next/navigation";
export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateInputs = () => {
    if (!email) {
      setError("Email is required.");
      return false;
    }
    if (!password) {
      setError("Password is required.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateInputs()) return;

    try {
      // Отправляем запрос на ваш бэкенд
      const { data } = await axios.post("/users/login", {
        email,
        password,
      });

      // Сохраняем токен в localStorage
      localStorage.setItem("token", data.data.token);

      // Перенаправляем пользователя на защищенную страницу
      router.push("/");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Admin Login
        </h2>
        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
        <form onSubmit={handleLogin} className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
