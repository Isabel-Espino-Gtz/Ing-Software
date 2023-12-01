import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

function VerPerfil() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [nombre, setNombre] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  const handleSearch = async () => {
    setIsLoading(true);

    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:5000/participante/ver-perfil', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ authToken }),
      });

      if (response.ok) {
        const searchData = await response.json();
        setData(searchData);
      } else {
        console.error('Error al buscar el participante');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEliminar = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:5000/participante/eliminar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ authToken }),
      });

      if (response.ok) {
        // Manejar la respuesta si es necesario
        console.error('Participante eliminado exitosamente');
        localStorage.removeItem('authToken');
        navigate('/');

      } else {
        // Manejar errores
        console.error('Error al eliminar el participante');
      }
    } catch (error) {
      console.error('Error en la solicitud:');
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
        <button onClick={handleSearch}>Ver perfil</button>
      </div>
      <p></p>
      <div>
        <button onClick={handleEliminar}>Eliminar perfil</button>
      </div>

      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        data.nombres && data.correos && data.nombres.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Username</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {data.nombres.map((nombre, index) => (
                <tr key={index}>
                  <td>{nombre}</td>
                  <td>{data.username[index]}</td>
                  <td>{data.correos[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay datos disponibles.</p>
        )
      )}
    </div>
  );
}

export default VerPerfil;
