import React, { createContext, useState, useContext } from "react"

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    // Se verifica si ya hay registro en el localStorage
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('auth_user');
        return saved ? JSON.parse(saved) : null;
    });

    const login = (email, password) => {
        // Se simula la validación
        if(email === 'admin@buk.com' && password === 'admin123'){
            const loggedUser = {email, role: 'ADMIN', name: 'Admin general'};
            setUser(loggedUser);
            localStorage.setItem('auth_user',JSON.stringify(loggedUser));
            return true
        };
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('auth_user');
    };

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => useContext(AuthContext);