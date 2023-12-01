import React, { useEffect, useState } from 'react';
import {  Link, useNavigate } from 'react-router-dom';

function RegistrarTorneos() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
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

  const handleRegistrarTorneo = async (nombre) => {
    try {
      const idP = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:5000/participante/registrar-torneo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idP: idP,
          idT: nombre,
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
        console.error('Error al registrar torneo');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const handleQuitarTorneo = async (nombre) => {
    try {
        const idP = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:5000/participante/quitar-torneo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idP: idP,
          idT: nombre,
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
        console.error('Error al quitar torneo');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
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
                <th>Acciones</th>
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
                  <td>
                    <button onClick={() => handleRegistrarTorneo(nombre)}>
                      Registrar
                    </button>
                    <p></p>
                    <button onClick={() => handleQuitarTorneo(nombre)}>
                      Cancelar
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
      {message && <p>{message}</p>}
    </div>
  );
}

export default RegistrarTorneos;
