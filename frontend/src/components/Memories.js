import React, { useState, useEffect } from 'react';
import { getMoments, addMoment } from '../services/api';

const Memories = () => {
    const [memories, setMemories] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newMemory, setNewMemory] = useState({
        title: '',
        description: '',
        date: '',
        photos: [],
        mood: 'happy',
        location: ''
    });

    useEffect(() => {
        loadMemories();
    }, []);

    const loadMemories = async () => {
        try {
            const memoriesData = await getMoments();
            setMemories(memoriesData);
        } catch (error) {
            console.error('Error cargando recuerdos:', error);
        }
    };

    const handlePhotoUpload = (event) => {
        const files = Array.from(event.target.files);
        setNewMemory({
            ...newMemory,
            photos: [...newMemory.photos, ...files]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            Object.keys(newMemory).forEach(key => {
                if (key === 'photos') {
                    newMemory.photos.forEach(photo => {
                        formData.append('photos', photo);
                    });
                } else {
                    formData.append(key, newMemory[key]);
                }
            });

            await addMoment(formData);
            await loadMemories();
            setShowAddModal(false);
            setNewMemory({
                title: '',
                description: '',
                date: '',
                photos: [],
                mood: 'happy',
                location: ''
            });
        } catch (error) {
            console.error('Error guardando recuerdo:', error);
        }
    };

    return (
        <div className="memories-container">
            <div className="memories-header">
                <h2>Nuestros Recuerdos</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowAddModal(true)}
                >
                    Añadir Recuerdo
                </button>
            </div>

            <div className="memories-timeline">
                {memories.map(memory => (
                    <div key={memory._id} className="memory-card">
                        <div className="card">
                            {memory.photos.length > 0 && (
                                <img
                                    src={memory.photos[0].url}
                                    className="card-img-top"
                                    alt={memory.title}
                                />
                            )}
                            <div className="card-body">
                                <h5 className="card-title">{memory.title}</h5>
                                <p className="card-text">{memory.description}</p>
                                <div className="memory-meta">
                                    <span className={`mood-badge mood-${memory.mood}`}>
                                        {memory.mood}
                                    </span>
                                    <small className="text-muted">
                                        {new Date(memory.date).toLocaleDateString()}
                                    </small>
                                    {memory.location && (
                                        <small className="text-muted">
                                            📍 {memory.location}
                                        </small>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showAddModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Nuevo Recuerdo</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowAddModal(false)}
                                ></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">Título</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={newMemory.title}
                                            onChange={(e) => setNewMemory({...newMemory, title: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Descripción</label>
                                        <textarea
                                            className="form-control"
                                            value={newMemory.description}
                                            onChange={(e) => setNewMemory({...newMemory, description: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Fecha</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={newMemory.date}
                                            onChange={(e) => setNewMemory({...newMemory, date: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Fotos</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            multiple
                                            accept="image/*"
                                            onChange={handlePhotoUpload}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Estado de ánimo</label>
                                        <select
                                            className="form-select"
                                            value={newMemory.mood}
                                            onChange={(e) => setNewMemory({...newMemory, mood: e.target.value})}
                                        >
                                            <option value="happy">Feliz</option>
                                            <option value="romantic">Romántico</option>
                                            <option value="fun">Divertido</option>
                                            <option value="peaceful">Tranquilo</option>
                                            <option value="adventurous">Aventurero</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Ubicación</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={newMemory.location}
                                            onChange={(e) => setNewMemory({...newMemory, location: e.target.value})}
                                            placeholder="Ej: París, Francia"
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setShowAddModal(false)}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Guardar Recuerdo
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Memories;