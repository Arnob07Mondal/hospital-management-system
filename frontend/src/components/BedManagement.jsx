import React, { useState, useEffect } from 'react';
import { BedDouble, Trash2, FolderOpen, PlusCircle } from 'lucide-react';

const API_URL = '/api/beds';

function BedManagement() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ bedNumber: '', wardType: 'General', isOccupied: false });

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
    setForm({ bedNumber: '', wardType: 'General', isOccupied: false });
    fetchData();
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchData();
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <BedDouble size={28} color="var(--primary-color)" />
        <h2 style={{ marginBottom: 0 }}>Bed Management</h2>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>Add New Bed</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', alignItems: 'end', flexWrap: 'wrap' }}>
          <div className="form-group" style={{ flex: '1 1 200px', marginBottom: 0 }}>
            <label className="form-label">Bed Number</label>
            <input className="form-input" value={form.bedNumber} onChange={e => setForm({...form, bedNumber: e.target.value})} required placeholder="e.g. 101A" />
          </div>
          <div className="form-group" style={{ flex: '1 1 200px', marginBottom: 0 }}>
            <label className="form-label">Ward Type</label>
            <select className="form-input" value={form.wardType} onChange={e => setForm({...form, wardType: e.target.value})}>
              <option>General</option>
              <option>ICU</option>
              <option>Private</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            <PlusCircle size={18} /> Add Bed
          </button>
        </form>
      </div>

      <div className="table-container">
        {data.length === 0 ? (
          <div className="empty-state">
            <FolderOpen className="empty-icon" />
            <p>No beds configured. Add a bed to start tracking occupancy.</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr><th>ID</th><th>Bed #</th><th>Ward</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              {data.map(d => (
                <tr key={d.id}>
                  <td>#{d.id}</td><td>{d.bedNumber}</td><td>{d.wardType}</td>
                  <td>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '9999px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      backgroundColor: d.occupied ? '#fee2e2' : '#dcfce7',
                      color: d.occupied ? '#991b1b' : '#166534'
                    }}>
                      {d.occupied ? 'Occupied' : 'Available'}
                    </span>
                  </td>
                  <td>
                    <button className="btn-danger" onClick={() => handleDelete(d.id)} title="Remove Bed">
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
export default BedManagement;
