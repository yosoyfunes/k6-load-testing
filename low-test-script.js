import http from 'k6/http';

// Configuración del test
export const options = {
  scenarios: {
    constant_rate: {
      executor: 'constant-arrival-rate',
      rate: 25, // Solicitudes por segundo
      timeUnit: '1s', // Unidad de tiempo (segundos)
      duration: '1m', // Duración total del test (1 minuto)
      preAllocatedVUs: 50, // Usuarios virtuales pre-asignados
      maxVUs: 100, // Máximo de usuarios virtuales
    },
  },
};

export default function () {
  http.get('https://test.k6.io/contacts.php');
}