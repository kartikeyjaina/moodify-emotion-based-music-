import { createContext, useState } from "react";

export const AuthConext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  return (
    <AuthConext.Provider value = {{user,setUser,loading,setLoading}}>
        {children}
    </AuthConext.Provider>
  )
};
