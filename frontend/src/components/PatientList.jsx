import React, { useState, useEffect } from 'react';
import { UserPlus, Trash2, Frown } from 'lucide-react';

const API_URL = '/api/patients';

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ name: '', age: '', contact: '', medicalHistory: '' });

  const fetchPatients = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPatients(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchPatients(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setForm({ name: '', age: '', contact: '', medicalHistory: '' });
    fetchPatients();
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchPatients();
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <UserPlus size={28} color="var(--primary-color)" />
        <h2 style={{ marginBottom: 0 }}>Patient Management</h2>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>Register New Patient</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', alignItems: 'end', flexWrap: 'wrap' }}>
          <div className="form-group" style={{ flex: '1 1 200px', marginBottom: 0 }}>
            <label className="form-label">Full Name</label>
            <input className="form-input" name="name" value={form.name} onChange={handleChange} required placeholder="John Doe" />
          </div>
          <div className="form-group" style={{ flex: '1 1 100px', marginBottom: 0 }}>
            <label className="form-label">Age</label>
            <input className="form-input" type="number" name="age" value={form.age} onChange={handleChange} required placeholder="35" />
          </div>
          <div className="form-group" style={{ flex: '1 1 150px', marginBottom: 0 }}>
            <label className="form-label">Contact</label>
            <input className="form-input" name="contact" value={form.contact} onChange={handleChange} required placeholder="555-0199" />
          </div>
          <div className="form-group" style={{ flex: '1 1 100%', marginBottom: 0, marginTop: '0.5rem' }}>
            <label className="form-label">Medical History</label>
            <input className="form-input" name="medicalHistory" value={form.medicalHistory} onChange={handleChange} placeholder="None" />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            <UserPlus size={18} /> Register Patient
          </button>
        </form>
      </div>

      <div className="table-container">
        {patients.length === 0 ? (
          <div className="empty-state">
            <Frown className="empty-icon" />
            <p>No patients found. Please register a new patient above.</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr><th>ID</th><th>Name</th><th>Age</th><th>Contact</th><th>History</th><th>Action</th></tr>
            </thead>
            <tbody>
              {patients.map(p => (
                <tr key={p.id}>
                  <td>#{p.id}</td><td>{p.name}</td><td>{p.age}</td><td>{p.contact}</td><td>{p.medicalHistory || '-'}</td>
                  <td>
                    <button className="btn-danger" onClick={() => handleDelete(p.id)} title="Delete Patient">
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

export default PatientList;
