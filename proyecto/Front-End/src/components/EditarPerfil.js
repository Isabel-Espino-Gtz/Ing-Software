import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

function EditarPerfil() {
  const [contraseña, setContraseña] = useState('');
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmailFormat = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  const handleEditar = async () => {
    try {
      if (email) {
        if (!validateEmailFormat()) {
          setError('El formato del correo electrónico no es válido.');
          return;
        }
      }      
      const authToken = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:5000/participante/editar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          authToken,
          nuevo_nombre: nuevoNombre,
          nueva_contraseña: contraseña,
          nuevo_correo: email,
          username: username,
        }),
      });

      if (response.ok) {
        navigate('/success');
      } else {
        const errorMessage = await response.text();
        setError(`Error al actualizar datos del participante`);
      }
    } catch (error) {
      setError('Error en la solicitud.');
    }
  };

  return (
    <div className="contenedor">
      <div className='home'>
        <nav>
          <Link to="/registrar-torneo">Torneos</Link>
          <Link to="/ver-perfil">Perfil</Link>
              <Link to="/editar-perfil">Editar Perfil</Link>
              <Link to="/agregar-amigo">Agregar amigo</Link>
              <Link to = "/ver-amigo">Ver amigos</Link>
              <Link to = "/statusp">Status torneos</Link>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </nav>
      </div>
      <p></p>
      <div>
        <input
          type="text"
          placeholder="Nuevo nombre"
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Nuevo username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Nuevo correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Nueva contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          required
        />
      </div>
      <p>{error && <span style={{ color: 'red' }}>{error}</span>}</p>
      <button onClick={handleEditar}>Editar Perfil</button>
    </div>
  );
}

export default EditarPerfil;
