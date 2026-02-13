import { createContext, useState, useEffect } from "react";
import axiosClient from "../helpers/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on load
  useEffect(() => {
    const checkUser = async () => {
      try {
        // We need an endpoint for this in backend (usually /api/users/me)
        // For now, we'll skip the auto-check or implement it later.
        // Let's just set loading to false to unblock the app.
        setLoading(false);
      } catch (err) {
        setUser(null);
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const login = async (email, password) => {
    const { data } = await axiosClient.post("/api/users/login", {
      email,
      password,
    });
    setUser(data);
    return data;
  };

  const register = async (name, email, password) => {
    const { data } = await axiosClient.post("/api/users/register", {
      name,
      email,
      password,
    });
    setUser(data);
    return data;
  };

  const logout = async () => {
    await axiosClient.post("/api/users/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
