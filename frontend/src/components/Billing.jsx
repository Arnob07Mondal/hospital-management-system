import React, { useState, useEffect } from 'react';
import { FileText, Trash2, FolderOpen, PlusCircle } from 'lucide-react';

const API_URL = '/api/bills';

function Billing() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ patientName: '', amount: '', status: 'Unpaid' });

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
    setForm({ patientName: '', amount: '', status: 'Unpaid' });
    fetchData();
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchData();
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <FileText size={28} color="var(--primary-color)" />
        <h2 style={{ marginBottom: 0 }}>Billing & Invoices</h2>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>Create Invoice</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', alignItems: 'end', flexWrap: 'wrap' }}>
          <div className="form-group" style={{ flex: '1 1 200px', marginBottom: 0 }}>
            <label className="form-label">Patient Name</label>
            <input className="form-input" value={form.patientName} onChange={e => setForm({...form, patientName: e.target.value})} required placeholder="John Doe" />
          </div>
          <div className="form-group" style={{ flex: '1 1 150px', marginBottom: 0 }}>
            <label className="form-label">Amount ($)</label>
            <input type="number" step="0.01" className="form-input" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} required placeholder="150.00" />
          </div>
          <div className="form-group" style={{ flex: '1 1 150px', marginBottom: 0 }}>
            <label className="form-label">Status</label>
            <select className="form-input" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
              <option>Unpaid</option>
              <option>Paid</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            <PlusCircle size={18} /> Create Bill
          </button>
        </form>
      </div>

      <div className="table-container">
        {data.length === 0 ? (
          <div className="empty-state">
            <FolderOpen className="empty-icon" />
            <p>No invoices generated yet.</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr><th>Invoice #</th><th>Patient</th><th>Amount</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              {data.map(d => (
                <tr key={d.id}>
                  <td>INV-{1000 + d.id}</td><td>{d.patientName}</td><td style={{ fontWeight: 500 }}>${Number(d.amount).toFixed(2)}</td>
                  <td>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '9999px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      backgroundColor: d.status === 'Paid' ? '#dcfce7' : '#fef3c7',
                      color: d.status === 'Paid' ? '#166534' : '#b45309'
                    }}>
                      {d.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn-danger" onClick={() => handleDelete(d.id)} title="Delete Invoice">
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
export default Billing;
