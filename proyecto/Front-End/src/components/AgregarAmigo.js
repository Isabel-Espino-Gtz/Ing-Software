import React, { useEffect, useState } from 'react';
import {  Link, useNavigate } from 'react-router-dom';

function AgregarAmigo() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/participante/ver')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener datos:', error);
        setIsLoading(false);
      });
  }, []);

  const isFormValid = nombre.trim() !== '';

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  const handleAgregar = async (correo) => {
    try {
        const id1 = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:5000/amigo/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id1: id1,
          id2: correo,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          navigate('/success');
        } else {
          console.error(result.message);
        }
      } else {
        console.error('Error al agregar amigo');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/participante/buscar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre }),
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
          className="redondo"
          type="text"
          placeholder="Buscar por nombre del participante"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <button onClick={handleSearch} disabled={!isFormValid}>
          Buscar Participante
        </button>
      </div>

      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        data.nombres && data.correos && data.nombres.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Agregar</th>
              </tr>
            </thead>
            <tbody>
              {data.nombres.map((nombre, index) => (
                <tr key={index}>
                  <td>{data.username[index]}</td>
                  <td>{nombre}</td>
                  <td>{data.correos[index]}</td>
                  <td>
                    <button onClick={() => handleAgregar(data.correos[index])}>
                      Agregar
                    </button>
                </td>
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

export default AgregarAmigo;
