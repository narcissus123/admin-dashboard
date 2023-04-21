import { createContext, useState, useContext } from "react";
import { getItem } from "../../core/services/storage/Storage";

const AuthContext = createContext(false);
export const AuthProvider = ({ children }) => {
  const [isEmployee, setIsEmployee] = useState(
    Boolean(getItem("employee")) === true
  );

  const login = (isEmployee) => {
    setIsEmployee(isEmployee);
    console.log("isEmployee in", isEmployee);
  };

  const logout = (isEmployee) => {
    setIsEmployee(isEmployee);
    console.log("isEmployee out", isEmployee);
  };

  return (
    <AuthContext.Provider value={{ login, logout, isEmployee }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
