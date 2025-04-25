import { createContext,useContext, useState } from "react";
export const AuthContext=createContext();
export const AuthProvider=({children})=>{
    const [valid,setValid]=useState(()=>localStorage.getItem("valid"));
    const [user,setUser]=useState(()=>localStorage.getItem("user"));
    const login=(user)=>{
        localStorage.setItem("valid",'true');
        localStorage.setItem("user",JSON.stringify(user));
        setUser(user);
        setValid(true);
    }
    const logout=()=>{
        localStorage.setItem("valid",'false');
        localStorage.setItem("user",null);
        setValid(false);
        setUser("");
    }
    return(
        <AuthContext.Provider value={{valid,user,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}
