import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

function Home_Super() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    navigate('/');
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
    </div>

  )
}

export default Home_Super;
