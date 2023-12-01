import React from 'react';
import { Link } from 'react-router-dom';

function SuccessMessage() {

    const userRole = localStorage.getItem('userRole');
  const getReturnLink = () => {
    // Determina la ruta de regreso según el rol del usuario
    if (userRole === 'admin') {
      return '/home-admin';
    } 
    if (userRole === 'participante') {
        return '/home-participante';
      } 
    if (userRole === 'super') {
      return '/home-super';
    } 
    
  };

  return (
    <div className="success-message">
      <p>Acción completada correctamente</p>
      <Link to={getReturnLink()}>
        <button>Volver</button>
      </Link>
    </div>
  );
}

export default SuccessMessage;

