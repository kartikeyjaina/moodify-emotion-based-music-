import { login, register, getMe, logout } from "../services/auth.api";
import { useContext, useEffect } from "react";
import { AuthConext } from "../auth.context";

export const useAuth = () => {
  const context = useContext(AuthConext);
  const { user, setUser, loading, setLoading } = context;

  async function handleRegister({ username, email, password }) {
    setLoading(true);
    const data = await register({ username, email, password });
    setUser(data.user);
    setLoading(false);
  }
  async function handleLogin({ username, email, password }) {
    setLoading(true);
    const data = await login({ username, email, password });
    console.log(data);
    setUser(data.user);
    setLoading(false);
  }

  async function handleGetMe() {
    
      try {
        setLoading(true);
        const data = await getMe();
        setUser(data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }

  }

  async function handleLogout({ username, email, password }) {
    setLoading(true);
    const data = await logout();
    setUser(null);
    setLoading(false);
  }

  useEffect(() => {
    if(user===null){
      handleGetMe();
    }
    
  }, []);

  return {
    user,
    loading,
    handleRegister,
    handleLogin,
    handleLogout,
    handleGetMe,
  };
};
