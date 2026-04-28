import React, { useState, useEffect } from 'react';
import { Users, Calendar, TrendingUp } from 'lucide-react';

const API_URL = '/api';

function Dashboard() {
  const [stats, setStats] = useState({ patients: 0, appointments: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const pRes = await fetch(`${API_URL}/patients`);
        const aRes = await fetch(`${API_URL}/appointments`);
        const pData = await pRes.json();
        const aData = await aRes.json();
        setStats({ patients: pData.length, appointments: aData.length });
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <TrendingUp size={28} color="var(--primary-color)" />
        <h1 style={{ marginBottom: 0 }}>Dashboard Overview</h1>
      </div>
      <p>Welcome to HMS Plus. Here is a quick summary of your facility today.</p>
      
      <div className="dashboard-grid">
        <div className="card stat-card">
          <div className="stat-icon-wrapper">
            <Users size={28} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.patients}</div>
            <div className="stat-label">Total Patients</div>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon-wrapper" style={{ backgroundColor: '#fce7f3', color: '#db2777' }}>
            <Calendar size={28} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.appointments}</div>
            <div className="stat-label">Upcoming Appointments</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
