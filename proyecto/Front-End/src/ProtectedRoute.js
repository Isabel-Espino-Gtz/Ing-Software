// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function ProtectedRoute({ element, role }) {
  // Verificar el rol aquí, puedes ajustar esto según tu lógica exacta
  const isAuthenticated = localStorage.getItem('authToken') !== null;
  const userRole = localStorage.getItem('userRole');

  if (isAuthenticated && userRole === role) {
    return <Route element={element} />;
  } else {
    // Si no cumple con los requisitos, redirige a la página de inicio de sesión
    return <Navigate to="/" />;
  }
}

export default ProtectedRoute;
