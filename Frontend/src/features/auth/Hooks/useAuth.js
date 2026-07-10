import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login({ email, password });
      
      // SAFETY CHECK: Ensure data exists before setting the user
      if (data && data.user) {
        setUser(data.user);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      throw err; // Let the form component catch this to show a UI error
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await register({ username, email, password });
      
      if (data && data.user) {
        setUser(data.user);
      } else {
         throw new Error("Registration failed");
      }
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout(); // We don't need 'data' here
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getAndSetUser = async () => {
      try {
        const data = await getMe();
        // Safe access: only set user if data actually exists
        if (data && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        // This silently catches the 401 on initial load, which is correct behavior
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getAndSetUser();
  }, [setUser, setLoading]); // Added dependencies for React best practices

  return { user, loading, handleRegister, handleLogin, handleLogout };
};
