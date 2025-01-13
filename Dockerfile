# Usa una imagen base ligera con soporte para Node.js y k6
FROM node:20.18 AS builder

# Instala k6
COPY --from=grafana/k6:0.56.0 /usr/bin/k6 /usr/bin/k6

# Crea un directorio para los scripts de k6
WORKDIR /app
COPY . .

# Instala dependencias para el servidor web
RUN npm install

# Configura el puerto 8080 para el servidor
EXPOSE 8080

# Define el comando de inicio
CMD ["node", "server.js"]