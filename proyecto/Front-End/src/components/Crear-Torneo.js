import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function CrearTorneo({ onAuthentication }) {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [fecha_inicio, setInicio] = useState('');
  const [fecha_fin, setFin] = useState('');
  const [reglas, setReglas] = useState('');
  const [consola, setConsola] = useState('');
  const [num_participantes, setParticipantes] = useState('');
  const [juego, setJuego] = useState('');
  const [status, setStatus] = useState('');
  
  const [message, setMessage] = useState('');
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  const handleCrearTorneo = async () => {
    const authToken = localStorage.getItem('authToken');
    try {
      const response = await fetch('http://localhost:5000/torneo/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ authToken, nombre, fecha_inicio, fecha_fin, reglas, consola, num_participantes, juego, status }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
            setMessage("Torneo registrado exitosamente");
        } else {
          setMessage(data.message);
        }
      } 
    else{
        setMessage("Error al registrar, el usuario ya existe")
    }
    } catch (error) {setMessage('Error en la solicitud');}
  };

  const isFormValid = nombre.trim() !== '' && status.trim() !== '' && fecha_inicio.trim() !== '' && fecha_fin.trim() !== '' && reglas.trim() !== '' && consola.trim() !== '' && num_participantes.trim() !== '' && juego.trim() !== '';

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
      <div>
        <input
          type="text"
          placeholder="Nombre del torneo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
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
      <div>
        <p></p>
        <button type="submit" onClick={handleCrearTorneo} disabled={!isFormValid}>
          Crear Torneo
        </button>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default CrearTorneo;
