import React from 'react';

const CurrencyRates: React.FC = () => {
  const rates = [
    { code: 'USD', name: 'AQSH Dollari', rate: '12,850', change: '+15.0' },
    { code: 'EUR', name: 'Yevro', rate: '13,920', change: '-5.2' },
    { code: 'RUB', name: 'Rossiya Rubli', rate: '142', change: '+0.5' },
  ];

  return (
    <div className="animate-fade-in" style={{ padding: '24px 0' }}>
      <h2 className="section-title">Valyuta kurslari</h2>
      
      <div className="card-list">
        {rates.map(r => (
          <div key={r.code} className="card-item">
            <div className="card-icon" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
              <span style={{ fontWeight: '700', fontSize: '10px' }}>{r.code}</span>
            </div>
            <div className="card-info">
              <div className="card-name">{r.name}</div>
              <div style={{ fontSize: '12px', color: r.change.startsWith('+') ? 'var(--income)' : 'var(--expense)' }}>
                {r.change} so'm
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="card-amount">{r.rate} so'm</div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Live yangilanish</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrencyRates;
