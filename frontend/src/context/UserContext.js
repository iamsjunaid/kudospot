import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";

// Create the context
const UserContext = createContext();

// Custom hook for consuming UserContext
export const useUser = () => useContext(UserContext);

// Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user info on initial load if available
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    const userName = localStorage.getItem("userName");

    if (userEmail) {
      setUser({ email: userEmail, name: userName });
    }
    setLoading(false);
  }, []);

  const login = async (email) => {
    const response = await api.post("/auth/login", { email });
    const userData = { email, name: response.data.user.name };

    localStorage.setItem("userEmail", userData.email);
    localStorage.setItem("userName", userData.name);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
