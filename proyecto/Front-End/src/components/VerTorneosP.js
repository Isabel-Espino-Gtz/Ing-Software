import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

function VerTorneosP() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [nombre, setNombre] = useState('');
  const [message, setMessage] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  useEffect(() => {
    fetch('http://localhost:5000/torneo/ver')
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

  const handleSearch = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/torneo/buscar', {
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
        console.error('Error al buscar el torneo');
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
             <Link to="/crear-torneo">Crear Torneo</Link>
             <Link to="/ver-torneo">Ver Torneo</Link>
             <button onClick={handleLogout}>Cerrar Sesión</button>
        </nav>
       </div>
       <p></p>
      <div>
        <input
          className="redondo"
          type="text"
          placeholder="Buscar por nombre del torneo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <button onClick={handleSearch} disabled={!isFormValid}>
          Buscar Torneo
        </button>
      </div>

      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        data.nombres && data.inicio && data.fin && data.reglas && data.consola && data.participante && data.juego && data.status && data.nombres.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Inicio</th>
                <th>Fin</th>
                <th>Reglas</th>
                <th>Consola</th>
                <th>Participantes</th>
                <th>Juego</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.nombres.map((nombre, index) => (
                <tr key={index}>
                  <td>{nombre}</td>
                  <td>{data.inicio[index]}</td>
                  <td>{data.fin[index]}</td>
                  <td>{data.reglas[index]}</td>
                  <td>{data.consola[index]}</td>
                  <td>{data.participante[index]}</td>
                  <td>{data.juego[index]}</td>
                  <td>{data.status[index]}</td>
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

export default VerTorneosP;
