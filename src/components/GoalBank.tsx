import React, { useState } from 'react';
import { Target, Plus } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

const GoalBank: React.FC = () => {
  const { goals, addGoal, updateGoal } = useFinance();
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newTarget, setNewTarget] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newTarget) return;
    addGoal({ name: newName, target: Number(newTarget) });
    setNewName('');
    setNewTarget('');
    setShowAdd(false);
  };

  return (
    <div className="animate-fade-in" style={{ padding: '24px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 20px 16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Orzu Banki (Jamg‘arma)</h2>
        <button 
          onClick={() => setShowAdd(true)}
          style={{ background: 'var(--primary)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}
        >
          <Plus size={20} />
        </button>
      </div>

      {showAdd && (
        <div className="glass" style={{ margin: '0 20px 24px', padding: '20px', borderRadius: '20px' }}>
          <form onSubmit={handleAdd}>
            <input 
              className="input" 
              placeholder="Maqsad nomi (masalan: iPhone)" 
              value={newName}
              onChange={e => setNewName(e.target.value)}
              style={{ marginBottom: '12px' }}
            />
            <input 
              className="input" 
              placeholder="Summa" 
              type="number"
              value={newTarget}
              onChange={e => setNewTarget(e.target.value)}
              style={{ marginBottom: '12px' }}
            />
            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="submit" className="btn-submit" style={{ margin: 0, padding: '12px' }}>Qo'shish</button>
              <button type="button" onClick={() => setShowAdd(false)} className="input" style={{ width: 'auto', padding: '12px' }}>Bekor qilish</button>
            </div>
          </form>
        </div>
      )}
      
      <div className="card-list">
        {goals.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Hali maqsadlar yo'q</p>
        ) : (
          goals.map(g => {
            const ratio = (g.current / g.target) * 100;
            return (
              <div key={g.id} className="card-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', marginBottom: '12px' }}>
                  <div className="card-icon" style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)' }}>
                    <Target size={20} color="var(--primary)" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600' }}>{g.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      {Math.round(ratio)}% bajarildi
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '600' }}>{g.current.toLocaleString()}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>/ {g.target.toLocaleString()}</div>
                  </div>
                </div>

                <div className="progress-container">
                  <div 
                    className="progress-bar" 
                    style={{ width: `${Math.min(ratio, 100)}%`, backgroundColor: 'var(--primary)' }} 
                  />
                </div>

                <div style={{ display: 'flex', gap: '8px', width: '100%', marginTop: '16px' }}>
                  <button 
                    onClick={() => updateGoal(g.id, 100000)}
                    style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid var(--border)', background: 'none', color: 'var(--text-main)', fontSize: '12px' }}
                  >
                    +100,000
                  </button>
                  <button 
                    onClick={() => updateGoal(g.id, 500000)}
                    style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid var(--border)', background: 'none', color: 'var(--text-main)', fontSize: '12px' }}
                  >
                    +500,000
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default GoalBank;
