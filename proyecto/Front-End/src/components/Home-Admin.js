import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

function Home_Admin() {
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
            <Link to="/crear-torneo">Crear Torneo</Link>
             <Link to="/ver-torneo">Ver Torneo</Link>
             <Link to="/eliminar-torneo">Eliminar Torneo</Link>
             <Link to="/editar-torneo">Editar Torneo</Link>
             <button onClick={handleLogout}>Cerrar Sesión</button>
        </nav>
       </div>
    </div>

  )
}

export default Home_Admin;
