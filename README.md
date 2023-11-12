<a name="readme-top"></a>


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/franquirantv/prueba-nitsnets">
    <img src="foro-marvel\src\assets\Marvel_Logo.svg.png" alt="Logo" width="130" height="52">
  </a>

  <h3 align="center">Foro Marvel</h3>

  <p align="center">
    Si eres fan de Marvel, ¡este es tu sitio!
    <br />
    <a href="https://linkedin.com/in/francisco-quirant-vicente"><strong>Mira mi perfil »</strong></a>
    <br />
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Tabla de contenido</summary>
  <ol>
    <li>
      <a href="#sobre-el-proyecto">Sobre el proyecto</a>
      <ul>
        <li><a href="#herramientas">Herramientas</a></li>
      </ul>
    </li>
    <li>
      <a href="#configuracion-y-ejecucion">Configuración y ejecución</a>
      <ul>
        <li><a href="#requisitos-previos">Requisitos previos</a></li>
        <li><a href="#instalacion">Instalación</a></li>
      </ul>
    </li>
    <li><a href="#futuras-mejoras">Futuras mejoras</a></li>
    <li><a href="#licencia">Licencia</a></li>
    <li><a href="#contacto">Contacto</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## Sobre el proyecto

[![Landing Screen Shot][landing-screenshot]]

Esta aplicación es una plataforma donde puedes acceder a información relevante sobre el universo Marvel.

Hay disponibles hasta 4 páginas:

1. En la página principal se muestran: los *últimos cómics*, ordenados por la 'focDate' (fecha límite de compra para las editoriales); los *eventos más relevantes*, que los obtengo a partir de la mayor diferencia entre la fecha de inicio y final del evento; una *lista de personajes*, donde puedes buscar entre los diferentes personajes del universo Marvel.

2. En la página *personajes EXTRA* se muestra un listado de personajes paralelo al de Marvel, el cual se compone por personajes que han sido añadidos de forma manual. Para añadir un personaje, se debe pulsar en el botón a la derecha del buscador, donde aparecerá un formulario donde poder añadir un nombre, descripción e imágen. Solo será obligatorio el nombre.

3. La *página de detalles* de un personaje, donde diferenciamos dos tipos:
  - Personajes de la API, donde se muestra su imágen, nombre, descripción, eventos, series, cómics y enlaces externos.
  - Personajes EXTRA, donde aparece la imágen, nombre y descripción. Y donde además se pueden editar sus datos y borrar el personaje. 

4. Página 404, donde se muestra que la ruta a la que se ha accedido no es correcta. Esta página aparecerá cuando se introduzca manualmente una ruta desconocida, se acceda a los detalles de un personaje no almacenado, etc.

La interfaz de esta aplicación es una inspiración de la página oficial de [Marvel](https://marvel.com).

### Herramientas

La aplicación ha sido desarrollada con Angular + Bootstrap en la parte del Frontend y con NodeJS en la parte del Backend.

* [![Angular][Angular.io]][Angular-url]
* [![Typescript][Typescript]][Typescript-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![Nodejs][Nodejs.org]][Nodejs-url]

<!-- GETTING STARTED -->
## Configuración y ejecución

Para obtener una copia del proyecto y poder ejecutarlo, debes seguir los siguientes pasos:

### Requisitos previos

Es importante para la ejecución del proyecto que tengas instalado Node y NPM en tu máquina. Para instalar ambas herramientas, sigue estos pasos:

#### Windows
* [Node](https://nodejs.org/en/download/) Download page

#### Linux
  ```sh
  sudo apt install nodejs npm
  ```

### Instalación

1. Clona el repositorio
   ```sh
   git clone https://github.com/franquirantv/prueba-nitsnets.git
   ```
2. Config/Ejecutar Backend
   - Ir al directorio "backend"
   ```sh
   cd backend
   ```
   - Instalar las dependencias necesarias
   ```sh
   npm install
   ```
   - Ejecutar el servicio
   ```sh
   nodemon index.js
   ```

3. Config/Ejecutar Frontend
   - Ir al directorio "foro-marvel"
   ```sh
   cd foro-marvel
   ```
   - Instalar las dependencias necesarias
   ```sh
   npm install
   ```
   - Antes de ejecutar el servicio necesitamos configurar la Api_key y el hash para la API de Marvel. Para esto deberemos registrarnos en la página [Marvel for devs](https://developer.marvel.com/documentation/getting_started).
   Una vez tenemos los datos, tenemos que editar el archivo "environments/environment.example.ts". Primero cambiarle el nombre a "environment.ts" y después editar los campos Api_key y hash con tus datos únicos.
   - Ejecutar el servicio
   ```sh
   ng serve
   ```
   o 
   ```sh
   npm start
   ```

<p align="right">(<a href="#readme-top">Volver arriba</a>)</p>

<!-- ROADMAP -->
## Futuras mejoras

- [:x:] Implementar las páginas de detalles de cómics, eventos, series...
- [:x:] Crear la autentificación de usuarios.
- [:x:] Crear los Tests unitarios.

<!-- LICENSE -->
## Licencia

Distribuido bajo la Licencia MIT. Lee `LICENSE.txt` para más información.

<!-- CONTACT -->
## Contacto

Francisco Quirant Vicente - [Linkedin](https://linkedin.com/in/francisco-quirant-vicente) - francisco.quirant.v@gmail.com

Enlace del proyecto: [https://github.com/franquirantv/prueba-nitsnets](https://github.com/franquirantv/prueba-nitsnets)

<p align="right">(<a href="#readme-top">Volver arriba</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[landing-screenshot]: https://github.com/franquirantv/prueba-nitsnets/blob/main/foro-marvel/src/assets/landing-foro-marvel.jpeg

[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Typescript]: https://img.shields.io/badge/typescript-2d6ed6?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://www.typescriptlang.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[Nodejs.org]: https://img.shields.io/badge/NodeJS-grey?style=for-the-badge&logo=nodedotjs
[Nodejs-url]: https://nodejs.org/
