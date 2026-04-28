import React, { useState, useEffect } from 'react';
import { Calendar, Trash2, FolderOpen, CalendarPlus } from 'lucide-react';

const API_URL = '/api';

function AppointmentScheduling() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ patientId: '', doctorName: '', appointmentDate: '', timeSlot: '' });

  const fetchData = async () => {
    try {
      const aRes = await fetch(`${API_URL}/appointments`);
      const pRes = await fetch(`${API_URL}/patients`);
      setAppointments(await aRes.json());
      setPatients(await pRes.json());
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedPatient = patients.find(p => p.id.toString() === form.patientId);
      const payload = { ...form, patientName: selectedPatient ? selectedPatient.name : 'Unknown' };
      await fetch(`${API_URL}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      setForm({ patientId: '', doctorName: '', appointmentDate: '', timeSlot: '' });
      fetchData();
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/appointments/${id}`, { method: 'DELETE' });
    fetchData();
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <Calendar size={28} color="var(--primary-color)" />
        <h2 style={{ marginBottom: 0 }}>Appointment Scheduling</h2>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>Book Appointment</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', alignItems: 'end', flexWrap: 'wrap' }}>
          <div className="form-group" style={{ flex: '1 1 200px', marginBottom: 0 }}>
            <label className="form-label">Select Patient</label>
            <select className="form-input" name="patientId" value={form.patientId} onChange={handleChange} required>
              <option value="">-- Select Patient --</option>
              {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div className="form-group" style={{ flex: '1 1 200px', marginBottom: 0 }}>
            <label className="form-label">Doctor Name</label>
            <select className="form-input" name="doctorName" value={form.doctorName} onChange={handleChange} required>
              <option value="">-- Select Doctor --</option>
              <option value="Dr. Smith">Dr. Smith (Cardiology)</option>
              <option value="Dr. Johnson">Dr. Johnson (Neurology)</option>
              <option value="Dr. Williams">Dr. Williams (General)</option>
            </select>
          </div>
          <div className="form-group" style={{ flex: '1 1 150px', marginBottom: 0 }}>
            <label className="form-label">Date</label>
            <input className="form-input" type="date" name="appointmentDate" value={form.appointmentDate} onChange={handleChange} required />
          </div>
          <div className="form-group" style={{ flex: '1 1 150px', marginBottom: 0 }}>
            <label className="form-label">Time Slot</label>
            <input className="form-input" type="time" name="timeSlot" value={form.timeSlot} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            <CalendarPlus size={18} /> Book Appointment
          </button>
        </form>
      </div>

      <div className="table-container">
        {appointments.length === 0 ? (
          <div className="empty-state">
            <FolderOpen className="empty-icon" />
            <p>No appointments scheduled.</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr><th>ID</th><th>Patient</th><th>Doctor</th><th>Date</th><th>Time</th><th>Action</th></tr>
            </thead>
            <tbody>
              {appointments.map(a => (
                <tr key={a.id}>
                  <td>#{a.id}</td><td>{a.patientName}</td><td>{a.doctorName}</td><td>{a.appointmentDate}</td><td>{a.timeSlot}</td>
                  <td>
                    <button className="btn-danger" onClick={() => handleDelete(a.id)} title="Cancel Appointment">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
export default AppointmentScheduling;
