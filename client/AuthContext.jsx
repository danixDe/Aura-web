import {createContext,useState} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [valid,setValid] = useState(localStorage.getItem("valid") || "false");
    const [role,setRole] = useState(localStorage.getItem("role")|| null);

    const login = (userRole) =>{
        setValid("true");
        setRole(userRole);
        localStorage.setItem("valid","true");
        localStorage.setItem("role",userRole);
    };
    const logout = () =>{
        setValid("false");
        setRole(null);
        localStorage.removeItem("valid");
        localStorage.removeItem("role");
    };
    return (
        <AuthContext.Provider value={{valid,login,logout,role}}>
            {children}
        </AuthContext.Provider>
    );
};