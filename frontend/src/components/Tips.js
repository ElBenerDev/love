import React, { useState, useEffect } from 'react';
import { getTips, getDailyTip, saveTip } from '../services/api';

const Tips = () => {
    const [tips, setTips] = useState([]);
    const [dailyTip, setDailyTip] = useState(null);
    const [savedTips, setSavedTips] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        loadTips();
        loadDailyTip();
    }, []);

    const loadTips = async () => {
        try {
            const tipsData = await getTips();
            setTips(tipsData);
        } catch (error) {
            console.error('Error cargando consejos:', error);
        }
    };

    const loadDailyTip = async () => {
        try {
            const tip = await getDailyTip();
            setDailyTip(tip);
        } catch (error) {
            console.error('Error cargando consejo diario:', error);
        }
    };

    const handleSaveTip = async (tip) => {
        try {
            await saveTip(tip);
            setSavedTips([...savedTips, tip]);
        } catch (error) {
            console.error('Error guardando consejo:', error);
        }
    };

    const filteredTips = tips.filter(tip => {
        if (filter === 'all') return true;
        return tip.category === filter;
    });

    return (
        <div className="tips-container">
            <div className="daily-tip-section">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Consejo del Día</h5>
                        {dailyTip && (
                            <>
                                <p className="card-text">{dailyTip.content}</p>
                                <small className="text-muted">{dailyTip.category}</small>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="tips-filter">
                <select
                    className="form-select"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">Todos los consejos</option>
                    <option value="communication">Comunicación</option>
                    <option value="dates">Citas</option>
                    <option value="intimacy">Intimidad</option>
                    <option value="growth">Crecimiento Personal</option>
                </select>
            </div>

            <div className="tips-grid">
                {filteredTips.map(tip => (
                    <div key={tip._id} className="tip-card">
                        <div className="card">
                            <div className="card-body">
                                <h6 className="card-subtitle mb-2 text-muted">
                                    {tip.category}
                                </h6>
                                <p className="card-text">{tip.content}</p>
                                <button
                                    className={`btn btn-sm ${savedTips.includes(tip) ? 'btn-success' : 'btn-outline-primary'}`}
                                    onClick={() => handleSaveTip(tip)}
                                    disabled={savedTips.includes(tip)}
                                >
                                    {savedTips.includes(tip) ? 'Guardado' : 'Guardar'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tips;