import React, { useState, useEffect } from 'react';
import { Pill, Trash2, FolderOpen, PlusCircle } from 'lucide-react';

const API_URL = '/api/medicines';

function Pharmacy() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', stockQuantity: '' });

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
    setForm({ name: '', price: '', stockQuantity: '' });
    fetchData();
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchData();
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <Pill size={28} color="var(--primary-color)" />
        <h2 style={{ marginBottom: 0 }}>Pharmacy & Inventory</h2>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>Add Medicine</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', alignItems: 'end', flexWrap: 'wrap' }}>
          <div className="form-group" style={{ flex: '1 1 200px', marginBottom: 0 }}>
            <label className="form-label">Medicine Name</label>
            <input className="form-input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required placeholder="e.g. Paracetamol" />
          </div>
          <div className="form-group" style={{ flex: '1 1 100px', marginBottom: 0 }}>
            <label className="form-label">Price ($)</label>
            <input type="number" step="0.01" className="form-input" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required placeholder="5.00" />
          </div>
          <div className="form-group" style={{ flex: '1 1 100px', marginBottom: 0 }}>
            <label className="form-label">Stock Quantity</label>
            <input type="number" className="form-input" value={form.stockQuantity} onChange={e => setForm({...form, stockQuantity: e.target.value})} required placeholder="100" />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            <PlusCircle size={18} /> Add Stock
          </button>
        </form>
      </div>

      <div className="table-container">
        {data.length === 0 ? (
          <div className="empty-state">
            <FolderOpen className="empty-icon" />
            <p>Inventory is empty. Add medicines to manage stock.</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr><th>ID</th><th>Name</th><th>Price</th><th>Stock</th><th>Action</th></tr>
            </thead>
            <tbody>
              {data.map(d => (
                <tr key={d.id}>
                  <td>#{d.id}</td><td>{d.name}</td><td>${Number(d.price).toFixed(2)}</td>
                  <td>
                    <span style={{ 
                      color: d.stockQuantity < 10 ? '#ef4444' : 'inherit',
                      fontWeight: d.stockQuantity < 10 ? 'bold' : 'normal'
                    }}>
                      {d.stockQuantity} units
                    </span>
                  </td>
                  <td>
                    <button className="btn-danger" onClick={() => handleDelete(d.id)} title="Delete Item">
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
export default Pharmacy;
