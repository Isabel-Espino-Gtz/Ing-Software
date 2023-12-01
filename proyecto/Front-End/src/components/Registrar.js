import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function RegistrationForm({ onAuthentication }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const validateEmailFormat = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegistration = async () => {
    try {
      if (!validateEmailFormat()) {
        setMessage('El formato del correo electrónico no es válido.');
        return;
      }

      const response = await fetch('http://localhost:5000/participante/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, nombre }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('userRole', data.role);
          onAuthentication(true);
          navigate('/home-participante');
        } else {
          setMessage(data.message);
        }
      } else {
        setMessage('Error al registrar, el usuario ya existe');
      }
    } catch (error) {
      setMessage('Error en la solicitud');
    }
  };

  const isFormValid = username.trim() !== '' && email.trim() !== '' && password.trim() !== '' && username.trim() !== '';

  return (
    <div className="contenedor">
      <h1>Registro de Usuario</h1>
      <div>
        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <p></p>
        <button type="submit" onClick={handleRegistration} disabled={!isFormValid}>
          Registrarse
        </button>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default RegistrationForm;
