import React, { useState } from 'react';
import '../App.css'
import {  useNavigate } from 'react-router-dom';

function LoginForm({onAuthentication}) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, passwd }),
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          localStorage.setItem('authToken', data.token);
          onAuthentication(true);
          navigate('/home');
        } else {
          setMessage(data.message);
        }
      }
    } catch (error) {setMessage('Error en la solicitud');}
  };

  const isFormValid = email.trim() !== '' && passwd.trim() !== '';

  return (
    <div className="contenedor">
      <h1>Iniciar sesión</h1>
      <div>
        <input
          type="email"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Contraseña"
          value={passwd}
          onChange={(e) => setPasswd(e.target.value)}
          required
        />
      </div>
      <div>
        <button type = "submit" onClick={handleLogin} disabled={!isFormValid}>
          Iniciar sesión
        </button>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default LoginForm;
