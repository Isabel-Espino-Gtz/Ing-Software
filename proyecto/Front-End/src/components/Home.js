import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
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
             <button onClick={handleLogout}>Cerrar Sesión</button>
             {/* <Link to="/editar-perfil">Editar perfil</Link> */}
        </nav>
       </div>
    </div>

  )
}

export default Home;
