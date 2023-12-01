import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const EliminarAdmin = () => {
  const [correoAdmin, setNombreAdmin] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  const isFormValid = correoAdmin.trim() !== '';

  const handleEliminar = async () => {
    try {
      const response = await fetch('http://localhost:5000/admin/eliminar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre: correoAdmin }),
      });

      if (response.ok) {
        // Manejar la respuesta si es necesario
        setMessage('Admin eliminado exitosamente');
      } else {
        // Manejar errores
        setMessage('Error al eliminar el admin');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setMessage('Error en la solicitud');
    }
  };

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
          className="redondo"
          type="text"
          placeholder="Correo del administrador"
          value={correoAdmin}
          onChange={(e) => setNombreAdmin(e.target.value)}
        />
      </div>
      <p></p>
      <div>
        <button onClick={handleEliminar} disabled={!isFormValid}>Eliminar Administrador</button>
      </div>
      <p>{message}</p>
    </div>
  );
};

export default EliminarAdmin;
