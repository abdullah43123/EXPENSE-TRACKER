import { createContext, useEffect, useState } from 'react';
import { InsertSession, GetSession } from '../lib/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const existingToken = localStorage.getItem("token");
        const existingUser = localStorage.getItem("user")
        if (existingToken) {
            setUser(existingUser)
            setToken(existingToken);
            fetchSession(existingToken);
        }
    }, []);

    const fetchSession = async (token) => {
        try {
            const response = await GetSession({ Token: token });
            if (response.success) {
                setUser(existingUser)
                setToken(existingToken);
            }
        } catch (error) {
            return error;
        }
    };

    const login = async (userID, token) => {
        const formData = {
            userId: userID,
            token: token
        };

        try {
            await InsertSession({ formData });

            setUser(userID);
            setToken(token);

            localStorage.setItem("token", token);
            localStorage.setItem("user", userID);
        } catch (error) {
            return error;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

