import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("isLoggedIn") === "true"
    );

const login = (username, password)=>{
 
    if(username === "admin" && password === "admin123"){
        setIsLoggedIn(true)
        localStorage.setItem("isLoggedIn", "true" );
        return true
    }else{
        return false
    }
}
const logout = ()=>{
    setIsLoggedIn(false)
    localStorage.removeItem("isLoggedIn");
}

    return (
        <AuthContext.Provider value={{isLoggedIn, login, logout}}>
        {children}
        </AuthContext.Provider>
    )
}
export function useAuth(){
    return useContext(AuthContext)
}