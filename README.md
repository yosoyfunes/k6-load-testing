# k6-server

Servidor Express para ejecutar pruebas de carga con [k6](https://k6.io/) a través de endpoints HTTP. Permite lanzar distintos scripts de pruebas desde una API REST, facilitando la integración y automatización de pruebas de performance.

## Contenido del repositorio

- **server.js**: Servidor Express que expone endpoints para ejecutar scripts de k6.
- **test-script.js**: Script de prueba de carga con alta concurrencia.
- **low-test-script.js**: Script de prueba de carga con baja concurrencia.
- **sample-script.js**: Script de ejemplo avanzado que utiliza usuarios desde `users.json`.
- **users.json**: Archivo de usuarios de ejemplo para autenticación en pruebas.
- **Dockerfile**: Imagen Docker lista para correr el servidor y k6.
- **package.json**: Dependencias y scripts de npm.
- **.gitignore**: Archivos y carpetas ignorados por git.

## Requisitos

- [Docker](https://www.docker.com/) instalado **o**
- Node.js 20+ y k6 instalados localmente

## Uso rápido con Docker

1. **Construir la imagen:**
   ```sh
   docker build -t k6-server .
   ```

2. **Ejecutar el contenedor:**
   ```sh
   docker run -p 8080:8080 k6-server
   ```

3. **Probar los endpoints:**

   - Ejecutar test de carga alta:
     ```
     http://localhost:8080/run
     ```
   - Ejecutar test de carga baja:
     ```
     http://localhost:8080/low
     ```
   - Ejecutar script de ejemplo:
     ```
     http://localhost:8080/sample
     ```
   - Health check:
     ```
     http://localhost:8080/
     ```

## Uso local (sin Docker)

1. Instala dependencias:
   ```sh
   npm install
   ```

2. Asegúrate de tener [k6](https://k6.io/docs/getting-started/installation/) instalado y disponible en tu PATH.

3. Inicia el servidor:
   ```sh
   npm start
   ```

4. Usa los endpoints como se describe arriba.

## Personalización

- Puedes modificar los scripts de prueba (`test-script.js`, `low-test-script.js`, `sample-script.js`) para adaptarlos a tus necesidades.
- Agrega más endpoints en `server.js` para nuevos scripts.

---

**Licencia:** ISC
