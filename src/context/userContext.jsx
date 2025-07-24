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
            // console.log(existingToken);
            setUser(existingUser)
            setToken(existingToken);
            fetchSession(existingToken);
        }
    }, []);

    const fetchSession = async (token) => {
        console.log(token);

        try {
            const response = await GetSession({ Token: token });
            // console.log(response.data.users[0].user);
            if (response.success) {
                setUser(existingUser)
                setToken(existingToken);
                // setUser(response.data.users[0].user);
            }
        } catch (error) {
            console.error("Error loading session:", error);
        }
    };

    const login = async (userID, token) => {
        const formData = {
            userId: userID,
            token: token
        };

        try {
            // Save to DB
            await InsertSession({ formData });

            setUser(userID);
            setToken(token);

            localStorage.setItem("token", token);
            localStorage.setItem("user", userID);
        } catch (error) {
            console.error("Login error:", error);
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

// import { createContext, useEffect, useState } from 'react';
// import { InsertSession, GetSession } from '../lib/auth';


// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [token, setToken] = useState(null);
//     const [user, setUser] = useState(null);

//     // useEffect(() => {

//     // }, [token])

//     const login = async (userData, token) => {
//         const FormData = {
//             user: userData,
//             token: token
//         }

//         try {
//             const data = await InsertSession({ formData: FormData })
//             console.log(data);

//         } catch (error) {
//             console.log(error);

//         }

//         async function getData() {
//             const data = await GetSession({ token: token })
//             console.log(data);

//         }
//         getData()


//         // setUser(userData);
//         // setToken(token);
//     };

//     const logout = () => {
//         setUser(null);
//         setToken(null);
//     };

//     return (
//         <AuthContext.Provider value={{ user, token, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
