import React, { useState, useEffect } from 'react';
import { getNotifications, markNotificationAsRead, updateNotificationPreferences } from '../services/api';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [preferences, setPreferences] = useState({
        email: true,
        push: true,
        daily: true,
        weekly: true,
        special: true
    });

    useEffect(() => {
        loadNotifications();
    }, []);

    const loadNotifications = async () => {
        try {
            const notificationsData = await getNotifications();
            setNotifications(notificationsData);
        } catch (error) {
            console.error('Error cargando notificaciones:', error);
        }
    };

    const handleMarkAsRead = async (notificationId) => {
        try {
            await markNotificationAsRead(notificationId);
            setNotifications(notifications.map(notif => 
                notif._id === notificationId 
                    ? { ...notif, read: true }
                    : notif
            ));
        } catch (error) {
            console.error('Error marcando notificación como leída:', error);
        }
    };

    const handlePreferencesUpdate = async () => {
        try {
            await updateNotificationPreferences(preferences);
        } catch (error) {
            console.error('Error actualizando preferencias:', error);
        }
    };

    return (
        <div className="notifications-container">
            <div className="row">
                <div className="col-md-8">
                    <h3>Notificaciones</h3>
                    <div className="notifications-list">
                        {notifications.map(notification => (
                            <div 
                                key={notification._id} 
                                className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                            >
                                <div className="notification-content">
                                    <h6>{notification.title}</h6>
                                    <p>{notification.message}</p>
                                    <small>{new Date(notification.date).toLocaleString()}</small>
                                </div>
                                {!notification.read && (
                                    <button
                                        className="btn btn-sm btn-outline-primary"
                                        onClick={() => handleMarkAsRead(notification._id)}
                                    >
                                        Marcar como leída
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Preferencias de Notificaciones</h5>
                            <div className="form-check mb-2">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={preferences.email}
                                    onChange={(e) => setPreferences({...preferences, email: e.target.checked})}
                                />
                                <label className="form-check-label">
                                    Notificaciones por email
                                </label>
                            </div>
                            <div className="form-check mb-2">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={preferences.push}
                                    onChange={(e) => setPreferences({...preferences, push: e.target.checked})}
                                />
                                <label className="form-check-label">
                                    Notificaciones push
                                </label>
                            </div>
                            // Continuación...
                            <div className="form-check mb-2">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={preferences.daily}
                                    onChange={(e) => setPreferences({...preferences, daily: e.target.checked})}
                                />
                                <label className="form-check-label">
                                    Resumen diario
                                </label>
                            </div>
                            <div className="form-check mb-2">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={preferences.weekly}
                                    onChange={(e) => setPreferences({...preferences, weekly: e.target.checked})}
                                />
                                <label className="form-check-label">
                                    Resumen semanal
                                </label>
                            </div>
                            <div className="form-check mb-3">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={preferences.special}
                                    onChange={(e) => setPreferences({...preferences, special: e.target.checked})}
                                />
                                <label className="form-check-label">
                                    Momentos especiales
                                </label>
                            </div>
                            <button
                                className="btn btn-primary w-100"
                                onClick={handlePreferencesUpdate}
                            >
                                Guardar Preferencias
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notifications;