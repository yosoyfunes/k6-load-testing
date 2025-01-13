const express = require('express');
const { spawn } = require('child_process');
const app = express();
const PORT = 8080;
const debugLevel = 'full'; // Nivel de debug: 'full', 'body', o 'headers'

// Función auxiliar para ejecutar k6 con spawn
function runK6(scriptPath, res) {
  const k6 = spawn('k6', ['run', '--http-debug=${debugLevel}', '--verbose', scriptPath, '--out', 'json=result.json']);

  let stdoutData = '';
  let stderrData = '';

  // Captura stdout
  k6.stdout.on('data', (data) => {
    stdoutData += data.toString();
    console.log(data.toString()); // Enviar stdout al log de Cloud Run
  });

  // Captura stderr
  k6.stderr.on('data', (data) => {
    stderrData += data.toString();
    console.error(data.toString()); // Enviar stderr al log de Cloud Run
  });

  // Maneja el cierre del proceso
  k6.on('close', (code) => {
    if (code !== 0) {
      console.error(`k6 terminó con errores. Código de salida: ${code}`);
      return res.status(500).send(`Error: ${stderrData || 'Proceso fallido con código ' + code}`);
    }
    res.send(`<pre>${stdoutData}</pre>`);
  });
}

// Endpoint para ejecutar pruebas con k6
app.get('/run', (req, res) => {
  const scriptPath = './test-script.js';
  runK6(scriptPath, res);
});

// Endpoint para ejecutar pruebas con k6
app.get('/low', (req, res) => {
  const scriptPath = './low-test-script.js';
  runK6(scriptPath, res);
});

app.get('/sample', (req, res) => {
  const scriptPath = './sample-script.js';
  runK6(scriptPath, res);
});

// Endpoint para health check
app.get('/', (req, res) => {
  res.send('OK');
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});