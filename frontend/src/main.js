import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configuración de Firebase (deberás reemplazar esto con tus propias credenciales)
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "TU_MESSAGING_ID",
    appId: "TU_APP_ID"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Sistema de rutas básico
const routes = {
    '/': HomePage,
    '/dashboard': DashboardPage,
    '/galeria': GalleryPage,
    '/consejos': TipsPage,
    '/calendario': CalendarPage
};

// Ejemplo de componente Dashboard
function DashboardPage() {
    const statsChart = new Chart(
        document.getElementById('statsChart'),
        {
            type: 'bar',
            data: {
                labels: ['Citas', 'Te amo', 'Películas juntos', 'Regalos'],
                datasets: [{
                    label: 'Estadísticas de la Relación',
                    data: [12, 150, 25, 8],
                    backgroundColor: [
                        'rgba(255, 75, 110, 0.5)',
                        'rgba(108, 99, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)',
                        'rgba(75, 192, 192, 0.5)'
                    ]
                }]
            }
        }
    );
}

// Sistema de notificaciones
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Ejemplo de tip aleatorio
const relationshipTips = [
    "Dedica 10 minutos al día para hablar sin distracciones",
    "Celebra los pequeños logros juntos",
    "Planea una cita sorpresa cada mes",
    "Escribe una nota de amor cada semana"
];

function getRandomTip() {
    return relationshipTips[Math.floor(Math.random() * relationshipTips.length)];
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    // Comprobar estado de autenticación
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // Usuario autenticado
            showNotification('¡Bienvenido de nuevo!');
        } else {
            // Usuario no autenticado
            window.location.href = '/login';
        }
    });

    // Mostrar tip aleatorio
    showNotification(getRandomTip());
});