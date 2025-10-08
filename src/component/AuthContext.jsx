import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("isLoggedIn") === "true"
    );

const login = (token)=>{
 
    if(token){
        setIsLoggedIn(true)
        localStorage.setItem("isLoggedIn", "true" );
        localStorage.setItem("token", token );
        return true
    }else{
        return false
    }
}
const logout = ()=>{
    setIsLoggedIn(false)
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
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