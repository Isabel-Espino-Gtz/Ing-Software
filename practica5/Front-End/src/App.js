import './App.css';
import { useState, useEffect } from 'react';
import React from 'react';
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Editar from './components/Editar'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

// function App() {

//   const [data, setData] = useState([{}])
//   useEffect(()=> {
//     fetch('http://localhost:5000/members').then(
//       res => res.json()
//     ).then(
//       data => {
//         setData(data)
//         console.log(data)
//       }
//     )
//   }, [])
//   return (
//     <div>{(typeof data.members === 'undefined')?(<p>Loading...</p>):(data.members.map((member,i) => (<p key = {i}>{member}</p>)))}</div>
//   );
// }

function App() {
//   const [email, setUsername] = useState('');
//   const [passwd, setpasswd] = useState('');
//   const [message, setMessage] = useState('');

//   const handleLogin = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, passwd }),
//       });
  
//       if (response.ok) {
//         const data = await response.json();
//         if (data.success) {
//           // Si la respuesta es exitosa, puedes realizar alguna acción, como redirigir al usuario a otra pantalla.
//           setMessage('Inicio de sesión exitoso');
//         } else {
//           setMessage(data.message);
//         }
//       } else {
//         setMessage('Error en la solicitud');
//       }
//     } catch (error) {}
//   };

// // Verifica si los campos de usuario y contraseña están completos
// const isFormValid = email.trim() !== '' && passwd.trim() !== '';

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función para establecer el estado de autenticación
  const handleAuthentication = (authenticated) => {
    setIsAuthenticated(authenticated);
  };

  useEffect(() => {
    // Verificar si hay un token almacenado en el localStorage al cargar la página
    const token = localStorage.getItem('authToken');
    if (token) {
      // Puedes verificar la validez del token aquí si es necesario
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LoginForm onAuthentication={handleAuthentication} />}
        />
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <p>Debes iniciar sesión</p>}
        />
        <Route
          path="/editar-perfil"
          element={isAuthenticated ? <Editar/> : <p>Debes iniciar sesión</p>}
        />
      </Routes>
    </Router>
  );
}

export default App;
