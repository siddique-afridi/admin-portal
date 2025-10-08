import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../component/AuthContext";

function LoginSuccess() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    console.log('called')
    // extract token from URL
    const params = new URLSearchParams(window.location.search);
    console.log("params", params)
    const token = params.get("token");
    console.log("token is", token)
    // if (!token) throw new Error("No authentication token found");


    if (token) {
      login(token); // store token in context/localStorage
      navigate("/dashboard"); // redirect to dashboard
      console.log('navigating to dashboard')

    } else {
        console.log("success-component");
        console.warn("No token found, redirecting to login");
      navigate("/login"); // fallback if no token
    }
  }, [login]);

  return (
    <div className="flex items-center justify-center h-screen text-gray-700">
      <p>Signing you in with Google...</p>
    </div>
  );
}

export default LoginSuccess;
