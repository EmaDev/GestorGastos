# Proyecto de Aplicación web (módulo de gestión de usuarios)

## Descripción
Este proyecto es una aplicación web desarrollada utilizando las tecnologías Vite, React, TypeScript y React Router DOM. Está diseñada para proporcionar una plataforma de gestión de usuarios con una experiencia fluida y segura. A continuación se detallan las características principales
 Tecnologias utilizadas: 
 - Vite
 - React + TypeScript
 - react-router-dom v6
 - tailwind
 - nextUI
 - zustand
 - firebase

## Instalacion

- Clona el repositorio.
- Navega hasta el directorio del proyecto.
- Ejecuta "yarn" para instalar todas las dependencias.
- Ejecuta "yarn start" para iniciar la aplicación.


## Sistema de Navegación
La aplicación ofrece dos sistemas de navegación distintos para usuarios logeados y no logeados. Para aquellos que ya han ingresado, se presenta un 
conjunto de tres rutas principales: "/", "/admin" y "/perfil". Para quienes aún no han iniciado sesión, se proporcionan rutas separadas para 
"/registro" e "/ingresar".

## Autenticación 
Facilita la autenticación de usuarios mediante dos métodos principales: ingreso de credenciales convencionales (email y contraseña) o a través de Google OAuth. Para los 
usuarios convencionales los formularios se validan mediante el uso React Hook Form 

## Almacenamiento de Usuario
Después de que los usuarios ingresan, sus datos se almacenan de manera eficiente en un store de Zustand. Este enfoque permite una gestión simplificada del estado global de la aplicación y una experiencia de usuario más rápida y fluida.

## Gestion de usuarios
La aplicación ofrece una serie de herramientas para la gestión de usuarios. Se muestra un completo listado de todos los usuarios del sistema, con la posibilidad de examinar detalladamente sus atributos a través de un modal. Los usuarios con roles específicos, como "Admin" o "Gerente", tienen privilegios adicionales para modificar roles y datos de otros usuarios según sea necesario. 

## Perfil Personalizable
En la sección de perfil, los usuarios tienen la capacidad de visualizar y editar sus propios datos, lo que incluye la opción de cambiar su foto de perfil. Esto asegura una experiencia personalizada y adaptable a las necesidades individuales de cada usuario.

## Contacto

Para cualquier pregunta o problema, no dudes en ponerte en contacto conmigo:

- Nombre: Emanuel Cisterna

- Correo Electrónico: emanuel00developer@gmail.com
