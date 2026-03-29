import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
const [token, setToken] = useState(localStorage.getItem("token") || null);
const [role, setRole] = useState(localStorage.getItem("role") || null);

// ================= LOGIN =================
const login = (tokenData, roleData) => {
localStorage.setItem("token", tokenData);
localStorage.setItem("role", roleData);


setToken(tokenData);
setRole(roleData);


};

// ================= LOGOUT =================
const logout = () => {
localStorage.removeItem("token");
localStorage.removeItem("role");


setToken(null);
setRole(null);


};

return (
<AuthContext.Provider value={{ token, role, login, logout }}>
{children}
</AuthContext.Provider>
);
};

// custom hook for easy use
export const useAuth = () => useContext(AuthContext);
