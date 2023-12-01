import './App.css';
import { useState, useEffect } from 'react';
import React from 'react';
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/Registrar'
import AdminTabla from './components/Ver-Admin'
import RegistrationAdmin from './components/Registrar-Admin'
import CrearTorneo from './components/Crear-Torneo'
import VerParticipantes from './components/Ver-Participantes'
import VerTorneos from './components/Ver-Torneos'
import Home_Admin from './components/Home-Admin';
import Home_Super from './components/Home-Super';
import RegistrarTorneo from './components/Registrar-Torneo';
import VerTorneosAdmin from './components/Ver-Torneos-Admin';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import EditarTorneo from './components/EditarTorneo';
import EliminarTorneo from './components/EliminarTorneo';
import EliminarAdmin from './components/EliminarAdmin';
import Home_Participante from './components/Home-Participante';
import VerPerfil from './components/VerPerfil';
import EditarPerfil from './components/EditarPerfil';
import AgregarAmigo from './components/AgregarAmigo';
import SuccessMessage from './components/Success';
import VerAmigo from './components/VerAmigos';
import VerStatusA from './components/VerStatusA';
import VerStatusP from './components/VerStatusP';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar si hay un token almacenado en el localStorage al cargar la página
    const token = localStorage.getItem('authToken');
    if (token) {
      // Puedes verificar la validez del token aquí si es necesario
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>

      <Route
          path="/success"
          element = {<SuccessMessage/>}
        />

      {/* Iniciar sesión */}
      <Route
          path="/"
          element={<LoginForm onAuthentication={setIsAuthenticated} />}
        />

      {/* Casos de uso de super administradores */}
      <Route
          path="/home-super"
          element={localStorage.getItem('userRole') == 'super' ? <Home_Super/> : <p>Debes iniciar sesión</p>}
        />

      <Route
          path="/ver-participante-admin"
          element={localStorage.getItem('userRole') == 'super' ? <VerParticipantes/>: <p>Debes iniciar sesión</p>}
        />
      
      <Route
          path="/ver-torneo-admin"
          element={localStorage.getItem('userRole') == 'super' ? <VerTorneosAdmin/>: <p>Debes iniciar sesión</p>}
        />
      
      <Route
          path="/ver-admin"
          element={localStorage.getItem('userRole') == 'super' ? <AdminTabla/> : <p>Debes iniciar sesión</p>}
        />

      <Route
          path="/registrar-admin"
          element={localStorage.getItem('userRole') == 'super' ? <RegistrationAdmin/> : <p>Debes iniciar sesión</p>}
        />

      <Route
          path="/eliminar-admin"
          element={localStorage.getItem('userRole') == 'super' ? <EliminarAdmin/> : <p>Debes iniciar sesión</p>}
        />
      

      {/* Casos de uso de administradores */}
      <Route
          path="/home-admin"
          element={localStorage.getItem('userRole') == 'admin' ? <Home_Admin/> : <p>Debes iniciar sesión</p>}
        />
      
        <Route
          path="/crear-torneo"
          element={localStorage.getItem('userRole') == 'admin' ?  <CrearTorneo/> : <p>Debes iniciar sesión</p>}
        />
      
        <Route
          path="/ver-torneo"
          element={localStorage.getItem('userRole') == 'admin' ? <VerTorneos/> : <p>Debes iniciar sesión</p>}
        />

        <Route
          path="/editar-torneo"
          element={localStorage.getItem('userRole') == 'admin' ? <EditarTorneo/> : <p>Debes iniciar sesión</p>}
        />

      <Route
          path="/eliminar-torneo"
          element={localStorage.getItem('userRole') == 'admin' ? <EliminarTorneo/> : <p>Debes iniciar sesión</p>}
        />

      <Route
          path="/statusa"
          element={<VerStatusA/>}
        />


      {/* Casos de uso de participantes */}

      <Route
          path="/home-participante"
          element={localStorage.getItem('userRole') == 'participante' ? <Home_Participante/> : <p>Debes iniciar sesión</p>}
        />

        <Route
          path="/registrar"
          element={<RegistrationForm onAuthentication={setIsAuthenticated} />}
        />
       
        <Route
          path="/registrar-torneo"
          element={localStorage.getItem('userRole') == 'participante' ? <RegistrarTorneo/> : <p>Debes iniciar sesión</p>}
        />

        <Route
          path="/ver-perfil"
          element={localStorage.getItem('userRole') == 'participante' ? <VerPerfil/> : <p>Debes iniciar sesión</p>}
        />

        <Route
          path="/editar-perfil"
          element={localStorage.getItem('userRole') == 'participante' ? <EditarPerfil/> : <p>Debes iniciar sesión</p>}
        />

        <Route
          path="/agregar-amigo"
          element={localStorage.getItem('userRole') == 'participante' ? <AgregarAmigo/> : <p>Debes iniciar sesión</p>}
        />

        <Route
          path="/ver-amigo"
          element={localStorage.getItem('userRole') == 'participante' ? <VerAmigo/> : <p>Debes iniciar sesión</p>}
        />

        <Route
          path="/statusp"
          element={localStorage.getItem('userRole') == 'participante' ? <VerStatusP/> : <p>Debes iniciar sesión</p>}
        />

      </Routes>
    </Router>
  );
}

export default App;
