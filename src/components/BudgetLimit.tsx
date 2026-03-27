import React from 'react';
import { useFinance } from '../context/FinanceContext';

const BudgetLimit: React.FC = () => {
  const { budgets } = useFinance();

  const getProgressColor = (spent: number, limit: number) => {
    const ratio = spent / limit;
    if (ratio >= 1) return 'bg-red';
    if (ratio >= 0.8) return 'bg-yellow';
    return 'bg-green';
  };

  return (
    <div className="animate-fade-in" style={{ padding: '24px 0' }}>
      <h2 className="section-title">Budjet va Limitlar</h2>
      
      <div className="card-list">
        {budgets.map(b => {
          const ratio = (b.spent / b.limit) * 100;
          return (
            <div key={b.category} className="card-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '8px' }}>
                <div style={{ fontWeight: '600' }}>{b.category}</div>
                <div style={{ fontSize: '14px' }}>
                  <span style={{ color: ratio >= 100 ? 'var(--expense)' : 'var(--text-main)' }}>
                    {b.spent.toLocaleString()}
                  </span>
                  <span style={{ color: 'var(--text-muted)' }}> / {b.limit.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="progress-container">
                <div 
                  className={`progress-bar ${getProgressColor(b.spent, b.limit)}`}
                  style={{ width: `${Math.min(ratio, 100)}%` }}
                />
              </div>

              {ratio >= 100 ? (
                <div style={{ fontSize: '11px', color: 'var(--expense)', marginTop: '8px' }}>
                  ⚠️ Limitdan oshib ketdingiz!
                </div>
              ) : ratio >= 80 ? (
                <div style={{ fontSize: '11px', color: 'var(--warning)', marginTop: '8px' }}>
                  🟡 Limitga yaqin qoldingiz.
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="glass" style={{ margin: '20px', padding: '20px', borderRadius: '16px' }}>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', textAlign: 'center' }}>
          Aqlli budjet tizimi xarajatlaringizni nazorat qilishga yordam beradi.
        </p>
      </div>
    </div>
  );
};

export default BudgetLimit;
