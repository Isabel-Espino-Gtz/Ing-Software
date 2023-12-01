import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function RegistrationAdmin({ onAuthentication }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    navigate('/');
  };

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

      const response = await fetch('http://localhost:5000/admin/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setMessage('Admin registrado exitosamente');
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

  const isFormValid = username.trim() !== '' && email.trim() !== '' && password.trim() !== '';

  return (
    <div className="contenedor">
      <div className='home'>
        <nav>
          <Link to="/registrar-admin">Registrar admin</Link>
          <Link to="/eliminar-admin">Eliminar admins</Link>
          <Link to="/ver-participante-admin">Ver participantes</Link>
          <Link to="/ver-torneo-admin">Ver torneos</Link>
          <Link to="/ver-admin">Ver admins</Link>
          <Link to = "/statusa">Ver status torneos</Link>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </nav>
      </div>
      <p></p>
      <div>
        <input
          type="text"
          placeholder="Nombre de usuario"
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
          Registrar administrador
        </button>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default RegistrationAdmin;
