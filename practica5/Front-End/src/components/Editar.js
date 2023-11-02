import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async () => {
    try {
      const response = await fetch('http://localhost:5000/user/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          newPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setMessage('Contraseña cambiada exitosamente');
          navigate('/home');
        } else {
          setMessage(data.message);
        }
      } else {
        setMessage('Error en la solicitud');
      }
    } catch (error) {
      setMessage('Error de red: ' + error.message);
    }
  };

  return (
    <div class = "contenedor">
      <h1>Cambiar Contraseña</h1>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Nueva Contraseña:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <button onClick={handleChangePassword}>Cambiar Contraseña</button>
      <p>{message}</p>
    </div>
  );
}

export default ChangePassword;
