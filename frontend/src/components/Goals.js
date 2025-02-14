import React, { useState, useEffect } from 'react';
import { getGoals, addGoal, updateGoal, completeGoal } from '../services/api';

const Goals = () => {
    const [goals, setGoals] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newGoal, setNewGoal] = useState({
        title: '',
        description: '',
        dueDate: '',
        category: 'relationship'
    });

    useEffect(() => {
        loadGoals();
    }, []);

    const loadGoals = async () => {
        try {
            const goalsData = await getGoals();
            setGoals(goalsData);
        } catch (error) {
            console.error('Error cargando metas:', error);
        }
    };

    const handleAddGoal = async (e) => {
        e.preventDefault();
        try {
            await addGoal(newGoal);
            await loadGoals();
            setShowAddModal(false);
            setNewGoal({
                title: '',
                description: '',
                dueDate: '',
                category: 'relationship'
            });
        } catch (error) {
            console.error('Error añadiendo meta:', error);
        }
    };

    const handleCompleteGoal = async (goalId) => {
        try {
            await completeGoal(goalId);
            await loadGoals();
        } catch (error) {
            console.error('Error completando meta:', error);
        }
    };

    return (
        <div className="goals-container">
            <div className="goals-header">
                <h2>Metas en Pareja</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowAddModal(true)}
                >
                    Nueva Meta
                </button>
            </div>

            <div className="goals-grid">
                {goals.map(goal => (
                    <div key={goal._id} className={`goal-card ${goal.completed ? 'completed' : ''}`}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{goal.title}</h5>
                                <p className="card-text">{goal.description}</p>
                                <div className="goal-meta">
                                    <span className="badge bg-info">{goal.category}</span>
                                    <small className="text-muted">
                                        Fecha límite: {new Date(goal.dueDate).toLocaleDateString()}
                                    </small>
                                </div>
                                {!goal.completed && (
                                    <button
                                        className="btn btn-success btn-sm mt-2"
                                        onClick={() => handleCompleteGoal(goal._id)}
                                    >
                                        Completar Meta
                                    </button>
                                )}
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
                                <h5 className="modal-title">Nueva Meta</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowAddModal(false)}
                                ></button>
                            </div>
                            <form onSubmit={handleAddGoal}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">Título</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={newGoal.title}
                                            onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Descripción</label>
                                        <textarea
                                            className="form-control"
                                            value={newGoal.description}
                                            onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Fecha límite</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={newGoal.dueDate}
                                            onChange={(e) => setNewGoal({...newGoal, dueDate: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Categoría</label>
                                        <select
                                            className="form-select"
                                            value={newGoal.category}
                                            onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
                                        >
                                            <option value="relationship">Relación</option>
                                            <option value="travel">Viajes</option>
                                            <option value="personal">Personal</option>
                                            <option value="financial">Finanzas</option>
                                            <option value="adventure">Aventuras</option>
                                        </select>
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
                                        Guardar Meta
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

export default Goals;