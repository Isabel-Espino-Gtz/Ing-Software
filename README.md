# Ing-Software proyecto: TorneoTracker 

## Descripción

**Torneo Tracker** es una aplicación web diseñada para facilitar la participación, administración y registro de torneos. La aplicación cuenta con un backend desarrollado en Flask y un frontend construido en React. Permite a los usuarios iniciar sesión, gestionar torneos, ver participantes y realizar diversas acciones según su rol de usuario (super administrador, administrador o participante).

## Características Principales

- **Inicio de Sesión Seguro:**
  - La aplicación garantiza un inicio de sesión seguro mediante la autenticación de usuarios.

- **Roles de Usuario:**
  - Super administradores pueden acceder a funciones de alto nivel, como la gestión de administradores y la visualización de participantes y torneos.
  - Administradores pueden crear, editar y eliminar torneos, así como ver información relevante sobre participantes.
  - Participantes tienen acceso a funciones relacionadas con su participación en torneos, como registrar torneos, ver su perfil y agregar amigos.

- **Gestión de Torneos:**
  - Los administradores pueden crear, editar y eliminar torneos de manera eficiente.
  - Los participantes pueden registrar su participación en torneos y verificar el estado de sus torneos registrados.

- **Interfaz de Usuario Intuitiva:**
  - El frontend en React proporciona una interfaz de usuario intuitiva y fácil de navegar.

## Tecnologías Utilizadas

- **Backend (Flask):**
  - El backend de la aplicación está desarrollado en Flask, un framework de Python para construir aplicaciones web.

- **Frontend (React):**
  - El frontend está implementado en React, una biblioteca de JavaScript para construir interfaces de usuario interactivas.

- **Enrutamiento con React Router:**
  - React Router se utiliza para gestionar la navegación y las rutas dentro de la aplicación.

- **Almacenamiento Seguro:**
  - La aplicación utiliza el almacenamiento local para gestionar tokens de autenticación y proporcionar una experiencia de usuario persistente.


## Instalación y ejecución 
1. Clona el repositorio
2. Instala las dependencias del backend y frontend
3. Ejecuta el backend desde la carpeta Back-End con python -m flask run y el frontend por separado desde la carpeta Front-End con npm start.

**Asegurate de tener la base de datos proyecto_ing_soft con usuario ferfong y contraseña Developer123! en mysql de tu dispositivo como se vio desde la práctica3**
En el repositorio del proyecto se incluyen las instrucciones en SQL para crear la base de datos.

Además, se tiene ya un usuario para un admin y para el super admin. 
Para el administrador es:
Correo: admin@gmail.com
Password: a

Para el super administrador es:
Correo: super@gmail.com
Password: a

Para los participantes se tiene que registrar.

## Nota: 
Al iniciar sesión correctamente puede que la aplicacion diga que se debe iniciar sesión, esto 
pasa porque a veces la conexión que se tiene del front al back y del back a la base de datos 
tarda, en estos casos basta con darle refresh a la página para resolverlo.