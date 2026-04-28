import React, { useState, useEffect } from 'react';
import { FileSignature, Trash2, FolderOpen, PlusCircle } from 'lucide-react';

const API_URL = '/api/prescriptions';

function Prescriptions() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ patientName: '', doctorName: '', medicines: '', instructions: '' });

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
    setForm({ patientName: '', doctorName: '', medicines: '', instructions: '' });
    fetchData();
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchData();
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <FileSignature size={28} color="var(--primary-color)" />
        <h2 style={{ marginBottom: 0 }}>Digital Prescriptions</h2>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>Write Prescription</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', alignItems: 'end', flexWrap: 'wrap' }}>
          <div className="form-group" style={{ flex: '1 1 200px', marginBottom: 0 }}>
            <label className="form-label">Patient Name</label>
            <input className="form-input" value={form.patientName} onChange={e => setForm({...form, patientName: e.target.value})} required placeholder="John Doe" />
          </div>
          <div className="form-group" style={{ flex: '1 1 200px', marginBottom: 0 }}>
            <label className="form-label">Doctor Name</label>
            <input className="form-input" value={form.doctorName} onChange={e => setForm({...form, doctorName: e.target.value})} required placeholder="Dr. Smith" />
          </div>
          <div className="form-group" style={{ flex: '1 1 100%', marginBottom: 0, marginTop: '0.5rem' }}>
            <label className="form-label">Medicines</label>
            <input className="form-input" value={form.medicines} onChange={e => setForm({...form, medicines: e.target.value})} required placeholder="Amoxicillin 500mg, Paracetamol" />
          </div>
          <div className="form-group" style={{ flex: '1 1 100%', marginBottom: 0 }}>
            <label className="form-label">Instructions</label>
            <input className="form-input" value={form.instructions} onChange={e => setForm({...form, instructions: e.target.value})} required placeholder="Take 1 tablet after meals" />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            <PlusCircle size={18} /> Issue Prescription
          </button>
        </form>
      </div>

      <div className="table-container">
        {data.length === 0 ? (
          <div className="empty-state">
            <FolderOpen className="empty-icon" />
            <p>No prescriptions have been issued.</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr><th>ID</th><th>Patient</th><th>Doctor</th><th>Medicines</th><th>Instructions</th><th>Action</th></tr>
            </thead>
            <tbody>
              {data.map(d => (
                <tr key={d.id}>
                  <td>#{d.id}</td><td>{d.patientName}</td><td>{d.doctorName}</td><td>{d.medicines}</td><td>{d.instructions}</td>
                  <td>
                    <button className="btn-danger" onClick={() => handleDelete(d.id)} title="Delete Prescription">
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
export default Prescriptions;
