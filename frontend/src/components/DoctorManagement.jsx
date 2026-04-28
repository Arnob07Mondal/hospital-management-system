import React, { useState, useEffect } from 'react';
import { UserPlus, Trash2, FolderOpen } from 'lucide-react';

const API_URL = '/api/doctors';

function DoctorManagement() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ name: '', specialty: '', contact: '' });

  const fetchData = async () => {
    const res = await fetch(API_URL);
    setData(await res.json());
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setForm({ name: '', specialty: '', contact: '' });
    fetchData();
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchData();
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <UserPlus size={28} color="var(--primary-color)" />
        <h2 style={{ marginBottom: 0 }}>Doctor Directory</h2>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>Add New Doctor</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', alignItems: 'end', flexWrap: 'wrap' }}>
          <div className="form-group" style={{ flex: '1 1 200px', marginBottom: 0 }}>
            <label className="form-label">Full Name</label>
            <input className="form-input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required placeholder="Dr. Jane Smith" />
          </div>
          <div className="form-group" style={{ flex: '1 1 200px', marginBottom: 0 }}>
            <label className="form-label">Specialty</label>
            <input className="form-input" value={form.specialty} onChange={e => setForm({...form, specialty: e.target.value})} required placeholder="Neurology" />
          </div>
          <div className="form-group" style={{ flex: '1 1 200px', marginBottom: 0 }}>
            <label className="form-label">Contact</label>
            <input className="form-input" value={form.contact} onChange={e => setForm({...form, contact: e.target.value})} required placeholder="555-1234" />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            <UserPlus size={18} /> Add Doctor
          </button>
        </form>
      </div>

      <div className="table-container">
        {data.length === 0 ? (
          <div className="empty-state">
            <FolderOpen className="empty-icon" />
            <p>No doctors listed yet. Add a doctor to begin.</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr><th>ID</th><th>Name</th><th>Specialty</th><th>Contact</th><th>Action</th></tr>
            </thead>
            <tbody>
              {data.map(d => (
                <tr key={d.id}>
                  <td>#{d.id}</td><td>{d.name}</td><td>{d.specialty}</td><td>{d.contact}</td>
                  <td>
                    <button className="btn-danger" onClick={() => handleDelete(d.id)} title="Delete Doctor">
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
export default DoctorManagement;
