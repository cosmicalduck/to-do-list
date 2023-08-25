# To Do List

## Desplegar proyecto

### Requisitos
1. Tener Node.js instalado (versión 16 o superior)
   
   [Página oficial de Node.js para descargar](https://nodejs.org/en)

### Desplegar proyecto de forma local

1. Descargar el archivo .zip del repositorio y extraerlo, o clonarlo utilizando el comando:
   
   `git clone https://github.com/cosmicalduck/to-do-list.git`


2. Abrir una terminal y posicionarse en la carpeta del repositorio.
   
3. Instalar dependencias, ejecutando el comando:
   
   `npm install`

4. Instalar json-server para poder emular la API REST del proyecto utilizando el comando:
`npm install -g json-server`

5. Ejecutar json-server, que emula la API REST del proyecto, utilizando el comando:
 `npx json-server --watch data/db.json`


6. Abrir una nueva terminal, posicionarla en la carpeta del repositorio y desplegar la aplicación en modo de desarrollo, utilizando el comando:
`npm run dev`

7. Abrir el navegador en la dirección `http://localhost:5173/`
