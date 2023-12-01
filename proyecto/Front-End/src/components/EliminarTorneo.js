import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const EliminarTorneo = () => {
  const [nombreTorneo, setNombreTorneo] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  const isFormValid = nombreTorneo.trim() !== '';

  const handleEliminar = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch('http://localhost:5000/torneo/eliminar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre: nombreTorneo, token }),
      });

      if (response.ok) {
        setMessage('Torneo eliminado exitosamente');
      } else {
        setMessage('Error al eliminar el torneo');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setMessage('Error en la solicitud, asegurate de solo eliminar torneos creados por ti');
    }
  };

  return (
    <div className="contenedor">
      <div className='home'>
       <nav>
             <Link to="/crear-torneo">Crear Torneo</Link>
             <Link to="/ver-torneo">Ver Torneo</Link>
             <Link to="/eliminar-torneo">Eliminar Torneo</Link>
             <Link to="/editar-torneo">Editar Torneo</Link>
             <button onClick={handleLogout}>Cerrar Sesión</button>
        </nav>
       </div>
       <p></p>
      <div>
      <input
          className="redondo"
          type="text"
          placeholder="Nombre del torneo"
          value={nombreTorneo}
          onChange={(e) => setNombreTorneo(e.target.value)}
        />
      </div>
      <p></p>
      <div>
        <button onClick={handleEliminar} disabled={!isFormValid}>Eliminar Torneo</button>
      </div>
      <p>{message}</p>
    </div>
  );
};

export default EliminarTorneo;
