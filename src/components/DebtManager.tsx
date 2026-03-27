import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Calendar } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

const DebtManager: React.FC = () => {
  const { debts } = useFinance();

  return (
    <div className="animate-fade-in" style={{ padding: '24px 0' }}>
      <h2 className="section-title">Qarzlar (Debt Manager)</h2>
      
      <div className="card-list">
        {debts.length === 0 ? (
          <div className="glass" style={{ padding: '20px', borderRadius: '16px', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)' }}>Hozircha qarzlar yo'q</p>
          </div>
        ) : (
          debts.map(d => (
            <div key={d.id} className="card-item">
              <div className="card-icon" style={{ 
                backgroundColor: d.type === 'lent' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)' 
              }}>
                {d.type === 'lent' ? (
                  <ArrowUpRight size={20} color="var(--income)" />
                ) : (
                  <ArrowDownLeft size={20} color="var(--expense)" />
                )}
              </div>
              <div className="card-info">
                <div className="card-name">{d.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={12} /> {d.dueDate}
                </div>
              </div>
              <div className="card-amount" style={{ 
                color: d.type === 'lent' ? 'var(--income)' : 'var(--expense)' 
              }}>
                {d.type === 'lent' ? '+' : '-'}{d.amount.toLocaleString()} so'm
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ padding: '20px' }}>
        <button className="btn-submit" style={{ background: 'var(--bg-card)', color: 'var(--text-main)', border: '1px solid var(--border)' }}>
          Yangi qarz qo'shish
        </button>
      </div>
    </div>
  );
};

export default DebtManager;
