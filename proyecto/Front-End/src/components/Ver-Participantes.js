import React, { useEffect, useState } from 'react';
import {  Link, useNavigate } from 'react-router-dom';

function VerParticipantes() {
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
              </tr>
            </thead>
            <tbody>
              {data.nombres.map((nombre, index) => (
                <tr key={index}>
                  <td>{data.username[index]}</td>
                  <td>{nombre}</td>
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

export default VerParticipantes;
