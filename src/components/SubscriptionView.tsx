import React from 'react';
import { RefreshCw, Bell } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

const SubscriptionView: React.FC = () => {
  const { subscriptions } = useFinance();

  return (
    <div className="animate-fade-in" style={{ padding: '24px 0' }}>
      <h2 className="section-title">Obunalar (Subscriptions)</h2>
      
      <div className="card-list">
        {subscriptions.map(s => (
          <div key={s.id} className="card-item">
            <div className="card-icon" style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)' }}>
              <RefreshCw size={20} color="var(--primary)" />
            </div>
            <div className="card-info">
              <div className="card-name">{s.name}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{s.period} to'lov</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="card-amount">{s.amount.toLocaleString()} so'm</div>
              <div style={{ fontSize: '10px', color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: '2px', justifyContent: 'flex-end' }}>
                <Bell size={10} /> 3 kundan keyin
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass" style={{ margin: '20px', padding: '20px', borderRadius: '16px' }}>
        <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Yaqindagi to'lovlar</h4>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
          <span>Jami oylik obunalar:</span>
          <span style={{ fontWeight: '600' }}>170,000 so'm</span>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionView;
