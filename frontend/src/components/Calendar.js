import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import { es } from 'date-fns/locale';
import { getEvents, addEvent, updateEvent, deleteEvent } from '../services/api';

const locales = {
    'es': es,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const Calendar = () => {
    const [events, setEvents] = useState([]);
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [newEvent, setNewEvent] = useState({
        title: '',
        start: new Date(),
        end: new Date(),
        description: '',
        type: 'date'
    });

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        try {
            const eventsData = await getEvents();
            setEvents(eventsData);
        } catch (error) {
            console.error('Error cargando eventos:', error);
        }
    };

    const handleSelectSlot = ({ start, end }) => {
        setSelectedEvent(null);
        setNewEvent({
            title: '',
            start,
            end,
            description: '',
            type: 'date'
        });
        setShowEventModal(true);
    };

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
        setNewEvent(event);
        setShowEventModal(true);
    };

    const handleSaveEvent = async () => {
        try {
            if (selectedEvent) {
                await updateEvent(selectedEvent._id, newEvent);
            } else {
                await addEvent(newEvent);
            }
            await loadEvents();
            setShowEventModal(false);
        } catch (error) {
            console.error('Error guardando evento:', error);
        }
    };

    const handleDeleteEvent = async () => {
        if (!selectedEvent) return;
        try {
            await deleteEvent(selectedEvent._id);
            await loadEvents();
            setShowEventModal(false);
        } catch (error) {
            console.error('Error eliminando evento:', error);
        }
    };

    return (
        <div className="calendar-container">
            <BigCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                selectable
                popup
                messages={{
                    next: "Siguiente",
                    previous: "Anterior",
                    today: "Hoy",
                    month: "Mes",
                    week: "Semana",
                    day: "Día"
                }}
            />

            {showEventModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {selectedEvent ? 'Editar Evento' : 'Nuevo Evento'}
                                </h5>
                                <button type="button" className="btn-close" onClick={() => setShowEventModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label">Título</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={newEvent.title}
                                            onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Descripción</label>
                                        <textarea
                                            className="form-control"
                                            value={newEvent.description}
                                            onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Tipo</label>
                                        <select
                                            className="form-select"
                                            value={newEvent.type}
                                            onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                                        >
                                            <option value="date">Cita</option>
                                            <option value="anniversary">Aniversario</option>
                                            <option value="special">Momento Especial</option>
                                            <option value="reminder">Recordatorio</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                {selectedEvent && (
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={handleDeleteEvent}
                                    >
                                        Eliminar
                                    </button>
                                )}
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowEventModal(false)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleSaveEvent}
                                >
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;