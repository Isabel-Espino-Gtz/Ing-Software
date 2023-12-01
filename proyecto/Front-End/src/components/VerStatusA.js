import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

function VerStatusA() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [nombre, setNombre] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  const isFormValid = nombre.trim() !== '';

  const handleSee = async () => {
    setIsLoading(true);

    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:5000/admin/status', {
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
        <button onClick={handleSee}>Ver status</button>
      </div>
      <p></p>

      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        data.nombres.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Participante</th>
                <th>Torneo</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.nombres.map((nombre, index) => (
                <tr key={index}>
                  <td>{nombre}</td>
                  <td>{data.torneos[index]}</td>
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

export default VerStatusA;
