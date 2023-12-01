import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

function EditarTorneo() {
  const [nombre, setNombre] = useState('');
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [fecha_inicio, setInicio] = useState('');
  const [fecha_fin, setFin] = useState('');
  const [reglas, setReglas] = useState('');
  const [consola, setConsola] = useState('');
  const [num_participantes, setParticipantes] = useState('');
  const [juego, setJuego] = useState('');
  const [status, setStatus] = useState('');

  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  const handleEditar = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch('http://localhost:5000/torneo/editar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          nuevo_nombre: nuevoNombre,
          nueva_fecha_inicio: fecha_inicio,
          nueva_fecha_fin: fecha_fin,
          nuevas_reglas: reglas,       
          nueva_consola: consola,       
          nuevos_participantes: num_participantes,
          nuevo_juego: juego,        
          nuevo_status: status, token      
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('Editado exitosamente');
      } else {
        const errorData = await response.json();
        setMessage('Error en la solicitud:', errorData.error);
      }
    } catch (error) {
      setMessage('Error en la solicitud');
    }
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
      <p></p>
      <input
        type="text"
        value={nombre}
        placeholder="Nombre del torneo"
        onChange={(e) => setNombre(e.target.value)}
      />
      <div>
        <input
          type="text"
          placeholder="Nuevo nombre"
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Estatus"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Consola"
          value={consola}
          onChange={(e) => setConsola(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Fecha de inicio"
          value={fecha_inicio}
          onChange={(e) => setInicio(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Número de participantes"
          value={num_participantes}
          onChange={(e) => setParticipantes(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Fecha de término"
          value={fecha_fin}
          onChange={(e) => setFin(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Juego"
          value={juego}
          onChange={(e) => setJuego(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Reglas"
          value={reglas}
          onChange={(e) => setReglas(e.target.value)}
          required
        />
      </div>
      <p></p>
      <button onClick={handleEditar}>Editar Torneo</button>
      <p>{message}</p>
    </div>
  );
}

export default EditarTorneo;
