import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { rootUrl } from "../RootUrl";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("userId") || null)
  );

  const login = async (inputs) => {
    try {
      const resp = await axios.post(`${rootUrl}/auth/login`, inputs);
      setCurrentUser(resp.data);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  };
  const logout = async () => {
    setCurrentUser(null);
  };
  useEffect(() => {
    localStorage.setItem("userId", JSON.stringify(currentUser));
  }, [currentUser]);
  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
