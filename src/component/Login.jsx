import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { User, Lock } from "lucide-react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("LOGIN"); // after login credentials matched now set next step to verify otp
  const [message, setMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!username || !password) return;
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      // looking for otp required

      if (!res.ok) {
        return setError(data.message || "Login failed");
      }

      if (data.step === "OTP_REQUIRED") {
        setStep("OTP"); //
        setMessage(data.message);
      } else {
        setError("Unexpected response. Check backend flow.");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  // NOW WE SEND OTP TO ENDPOINT VERIFY-OTP
  const handleOtpVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        return setError(data.message || "OTP verification failed");
      }

      const refineToken = res.headers.get("Authorization");

      const token = refineToken ? refineToken.split(" ")[1] : null;
      // console.log("response status", res.status)

      // localStorage.setItem("token", data.token);
      // login(data.token)
      if (login(token)) {
        navigate("/dashboard");
      } else {
        setError("No token received, login failed");
      }
    } catch {
      setError("Server error");
    }
  };
  //   if (login(username, password)) {
  //     navigate("/dashboard");
  //   } else {
  //     setError("Invalid username or password");
  //   }

  //  resend otp function

  const resendOtp = async () => {
    if (cooldown > 0) return; //it will prevent clicking when timer is active
    try {
      const res = await fetch("http://localhost:5000/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setOtp("");
      if (res.ok) {
        setMessage(data.message); // ✅ "New OTP sent to your email"
        setCooldown(30);
        setError("");
      } else {
        setError(data.message || "Failed to resend OTP");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError(""); // Clear error when user types
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) setError(""); // Clear error when user types
  };

  const handleGoogleLogin = () => {
    window.open("http://localhost:5000/api/auth/google", "_self");
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

        {message && (
          <div className="p-2 text-sm text-green-700 bg-green-100 rounded-md">
            {message}
          </div>
        )}

        {step === "LOGIN" && (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                required
                value={email}
                onChange={handleEmailChange}
                placeholder="Please enter valid email address"
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
              <input type="checkbox" className="w-4" />
              <a href="" className="text-blue-600 hover:underline text-sm">
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              // disabled={!username || !password}
              className={`cursor-pointer w-full p-3 rounded-lg font-semibold text-white text-lg transition duration-200 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
            }`}
            >
              Login
            </button>

            <div className="flex items-center my-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="mx-2 text-gray-500 text-sm">OR</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="cursor-pointer flex items-center justify-center w-full gap-3 border border-gray-300 rounded-lg p-3 hover:bg-gray-50 transition"
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google logo"
                className="w-5 h-5"
              />
              <span className="text-gray-700 font-medium">
                Sign in with Google
              </span>
            </button>
          </form>
        )}

        {step === "OTP" && (
          <form onSubmit={handleOtpVerify} className="space-y-5">
            <input
              type="text"
              required
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                setMessage("");
              }}
              placeholder="Enter OTP from email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="cursor-pointer w-full p-3 rounded-lg font-semibold text-white text-lg bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600"
            >
              Verify OTP
            </button>

            {/* 🔄 Resend OTP Button */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={resendOtp}
                disabled={cooldown > 0}
                className={`mt-2 ${
                  cooldown > 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-600 hover:underline cursor-pointer"
                }`}
              >
                {cooldown > 0 ? `Resend OTP in ${cooldown}s` : "Resend OTP"}
              </button>

              <button
                onClick={
                  () => {
                    setStep("LOGIN"); // reset to login form
                    setOtp(""); // clear OTP field
                    setError("");
                  } // clear errors if any
                }
                className="mt-4 text-blue-600 hover:underline cursor-pointer"
              >
                Back to Login
              </button>
            </div>
          </form>
        )}

        <p className="text-center text-gray-500 text-sm mt-6 ">
          Don't have an account?
          <span>
            <Link to="/register" className="ml-2 text-blue-600 hover:underline">
              Signup
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
