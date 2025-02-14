import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Calendar from './components/Calendar';
import Goals from './components/Goals';
import Memories from './components/Memories';
import Notifications from './components/Notifications';
import PhotoGallery from './components/PhotoGallery';
import Tips from './components/Tips';
import './styles/main.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <a className="navbar-brand" href="/">❤️ LoveStats</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="/dashboard">Dashboard</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/calendar">Calendario</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/goals">Metas</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/memories">Recuerdos</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/gallery">Galería</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/tips">Consejos</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/memories" element={<Memories />} />
            <Route path="/gallery" element={<PhotoGallery />} />
            <Route path="/tips" element={<Tips />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;