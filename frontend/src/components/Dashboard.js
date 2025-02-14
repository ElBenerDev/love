import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { getMoments, getStats } from '../services/api';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [recentMoments, setRecentMoments] = useState([]);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            const [statsData, momentsData] = await Promise.all([
                getStats(),
                getMoments({ limit: 5 })
            ]);
            setStats(statsData);
            setRecentMoments(momentsData);
            initializeCharts(statsData);
        } catch (error) {
            console.error('Error cargando datos:', error);
        }
    };

    const initializeCharts = (statsData) => {
        // Gráfica de Estadísticas Generales
        new Chart(document.getElementById('statsChart'), {
            type: 'bar',
            data: {
                labels: ['Citas', 'Películas', 'Te Amo', 'Regalos'],
                datasets: [{
                    label: 'Estadísticas de la Relación',
                    data: [
                        statsData.datesCount,
                        statsData.moviesWatched,
                        statsData.iLoveYouCount,
                        statsData.giftsGiven
                    ],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Resumen de tu Relación'
                    }
                }
            }
        });
    };

    return (
        <div className="dashboard-container">
            <div className="row">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Estadísticas de la Relación</h5>
                            <canvas id="statsChart"></canvas>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Momentos Recientes</h5>
                            <div className="recent-moments">
                                {recentMoments.map(moment => (
                                    <div key={moment._id} className="moment-item">
                                        <h6>{moment.title}</h6>
                                        <p>{moment.description}</p>
                                        <small>{new Date(moment.date).toLocaleDateString()}</small>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;