// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export const useAuth = () => {
//   const [user, setUser] = useState(() => {
//     const storedUser = localStorage.getItem('user');
//     return storedUser ? JSON.parse(storedUser) : null;
//   });
//   const navigate = useNavigate();

//   const login = (userData) => {
//     // In a real app, you would verify credentials with your backend
//     const fakeUser = {
//       email: userData.email,
//       name: 'John Doe',
//       token: 'fake-jwt-token'
//     };
//     localStorage.setItem('user', JSON.stringify(fakeUser));
//     setUser(fakeUser);
//     navigate('/');
//   };

//   const registerUser = (userData) => {
//     // In a real app, you would register the user with your backend
//     const fakeUser = {
//       email: userData.email,
//       name: userData.name,
//       token: 'fake-jwt-token'
//     };
//     localStorage.setItem('user', JSON.stringify(fakeUser));
//     setUser(fakeUser);
//     navigate('/');
//   };

//   const logout = () => {
//     localStorage.removeItem('user');
//     setUser(null);
//     navigate('/login');
//   };

//   return { user, login, registerUser, logout };
// };

// // export default useAuth;