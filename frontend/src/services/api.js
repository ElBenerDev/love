import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor para añadir el token a las peticiones
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Continuación...

// Auth Services
export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);
export const logout = () => {
    localStorage.removeItem('token');
};

// Couple Services
export const getStats = () => api.get('/couple/stats');
export const getMoments = (params) => api.get('/couple/moments', { params });
export const addMoment = (momentData) => api.post('/couple/moments', momentData);

// Photo Services
export const getPhotos = (album) => api.get(`/photos${album !== 'all' ? `?album=${album}` : ''}`);
export const uploadPhoto = (formData) => api.post('/photos/upload', formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});
export const deletePhoto = (photoId) => api.delete(`/photos/${photoId}`);

// Tips and Advice Services
export const getTips = () => api.get('/tips');
export const getDailyTip = () => api.get('/tips/daily');
export const saveTip = (tipData) => api.post('/tips/save', tipData);

// Calendar and Events Services
export const getEvents = () => api.get('/events');
export const addEvent = (eventData) => api.post('/events', eventData);
export const updateEvent = (eventId, eventData) => api.put(`/events/${eventId}`, eventData);
export const deleteEvent = (eventId) => api.delete(`/events/${eventId}`);

// Goals Services
export const getGoals = () => api.get('/goals');
export const addGoal = (goalData) => api.post('/goals', goalData);
export const updateGoal = (goalId, goalData) => api.put(`/goals/${goalId}`, goalData);
export const completeGoal = (goalId) => api.patch(`/goals/${goalId}/complete`);

// Notification Services
export const getNotifications = () => api.get('/notifications');
export const markNotificationAsRead = (notificationId) => api.patch(`/notifications/${notificationId}/read`);
export const updateNotificationPreferences = (preferences) => api.put('/notifications/preferences', preferences);