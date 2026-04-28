import React, { useState } from 'react';
import { LayoutDashboard, Users, UserRound, Calendar, BedDouble, Pill, FileText, FileSignature, HeartPulse, UserCircle } from 'lucide-react';
import Dashboard from './components/Dashboard';
import PatientList from './components/PatientList';
import AppointmentScheduling from './components/AppointmentScheduling';
import DoctorManagement from './components/DoctorManagement';
import BedManagement from './components/BedManagement';
import Pharmacy from './components/Pharmacy';
import Billing from './components/Billing';
import Prescriptions from './components/Prescriptions';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'patients': return <PatientList />;
      case 'appointments': return <AppointmentScheduling />;
      case 'doctors': return <DoctorManagement />;
      case 'beds': return <BedManagement />;
      case 'pharmacy': return <Pharmacy />;
      case 'billing': return <Billing />;
      case 'prescriptions': return <Prescriptions />;
      default: return <Dashboard />;
    }
  };

  const NavButton = ({ id, label, Icon }) => (
    <button 
      className={`nav-link ${currentView === id ? 'active' : ''}`}
      onClick={() => setCurrentView(id)}
      style={{ background: currentView === id ? '' : 'none', border: 'none', cursor: 'pointer', width: '100%' }}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <HeartPulse size={28} />
          HMS Plus
        </div>
        <nav className="nav-links">
          <NavButton id="dashboard" label="Dashboard" Icon={LayoutDashboard} />
          <NavButton id="patients" label="Patients" Icon={Users} />
          <NavButton id="doctors" label="Doctors" Icon={UserRound} />
          <NavButton id="appointments" label="Appointments" Icon={Calendar} />
          <NavButton id="beds" label="Bed Management" Icon={BedDouble} />
          <NavButton id="pharmacy" label="Pharmacy" Icon={Pill} />
          <NavButton id="prescriptions" label="Prescriptions" Icon={FileSignature} />
          <NavButton id="billing" label="Billing" Icon={FileText} />
        </nav>
      </aside>
      
      <div className="main-wrapper">
        <header className="top-header">
          <div className="user-profile">
            <div className="user-info">
              <span className="user-name">Dr. Sarah Connor</span>
              <span className="user-role">Administrator</span>
            </div>
            <div className="avatar">SC</div>
          </div>
        </header>

        <main className="main-content">
          {renderView()}
        </main>
      </div>
    </div>
  );
}

export default App;
