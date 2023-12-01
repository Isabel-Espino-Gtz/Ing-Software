import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

function Home_Participante() {
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
       <Link to="/registrar-torneo">Torneos</Link>
              <Link to="/ver-perfil">Perfil</Link>
              <Link to="/editar-perfil">Editar Perfil</Link>
              <Link to="/agregar-amigo">Agregar amigo</Link>
              <Link to = "/ver-amigo">Ver amigos</Link>
              <Link to = "/statusp">Status torneos</Link>
             <button onClick={handleLogout}>Cerrar Sesión</button>
        </nav>
       </div>
    </div>

  )
}

export default Home_Participante;
