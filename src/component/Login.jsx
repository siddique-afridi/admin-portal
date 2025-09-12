import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { User, Lock } from "lucide-react";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) return;

    if (login(username, password)) {
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (error) setError(""); // Clear error when user types
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) setError(""); // Clear error when user types
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 relative overflow-hidden">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className=" text-white w-14  rounded-full flex items-center justify-center text-3xl font-bold">
            <img src="/src/assets/logo.png" alt="" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Admin Login
        </h2>

        {/* Error message */}
        {error && (
          <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              required
              value={username}
              onChange={handleUsernameChange}
              placeholder="Username"
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="password"
              required
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div className="flex gap-2">

          <input type="checkbox"
          className="w-4" />
          <a href="" className="text-blue-600 hover:underline text-sm">Forgot password?</a>
          </div>


          {/* Login Button */}
          <button
            type="submit"
            // disabled={!username || !password}
            className={`w-full p-3 rounded-lg font-semibold text-white text-lg transition duration-200 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
            }`}
          >
            Login
          </button>
        </form>


        <p className="text-center text-gray-500 text-sm mt-6 ">
          Don't have an account?<span><a href="" className="ml-2 text-blue-600 hover:underline">Signup</a></span>
        </p>
        
      </div>
    </div>
  );
}

export default Login;
