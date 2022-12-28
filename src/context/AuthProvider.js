import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  const login = (user) => {
    setUser(user);
    setIsLogged(true);
    sessionStorage.setItem("auth", user);
  };

  const logout = () => {
    setUser(null);
    setIsLogged(false);
    sessionStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ user, isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
