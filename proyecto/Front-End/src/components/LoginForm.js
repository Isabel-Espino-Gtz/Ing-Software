import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginForm({ onAuthentication }) {
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
          localStorage.setItem('userRole', data.role);
          onAuthentication(true);
          if (data.role == 'super'){
            navigate('/home-super');
          }
          if (data.role == 'admin'){
            navigate('/home-admin');
          }

          if (data.role == 'participante'){
            navigate('/home-participante');
          }
          
        } else {
          setMessage(data.message);
        }
      }
    } catch (error) {
      setMessage('Error en la solicitud');
    }
  };

  const isFormValid = email.trim() !== '' && passwd.trim() !== '';

  return (
    <div className="contenedor">
      <div className='home'>
        <nav>
          <Link to="/registrar">Registrarse</Link>
        </nav>
      </div>
      <h1>Iniciar sesión</h1>
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
          value={passwd}
          onChange={(e) => setPasswd(e.target.value)}
          required
        />
      </div>
      <div>
        <p></p>
        <button type="submit" onClick={handleLogin} disabled={!isFormValid}>
          Iniciar sesión
        </button>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default LoginForm;
