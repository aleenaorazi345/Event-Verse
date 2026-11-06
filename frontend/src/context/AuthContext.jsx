import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../services/authService.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const me = await authService.getMe();
        setUser(me);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (email, password) => {
    const u = await authService.loginUser({ email, password });
    setUser(u);
    return u;
  };

  const register = async (data) => {
    // Now returns { message, email } instead of user
    return await authService.registerUser(data); 
  };

  const verify = async (email, otp) => {
    const u = await authService.verifyOtp({ email, otp });
    setUser(u);
    return u;
  };

  const logout = async () => {
    await authService.logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, verify, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);