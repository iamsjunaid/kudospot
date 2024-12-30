import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function Welcome() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { login } = useUser();

  const handleLogin = async () => {
    try {
      await login(email);
      navigate("/landing");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid email");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8">
      <h1 className="text-4xl">WELCOME TO KUDOSPOT</h1>
      <input
        className="px-16 py-1 border border-gray-300 rounded-md"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="px-32 py-2 bg-slate-950 text-white rounded-md"
      >
        Login
      </button>
    </div>
  );
}

export default Welcome;
