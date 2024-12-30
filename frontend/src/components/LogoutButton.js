import React from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="border border-gray-950 px-4 py-1 rounded"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
