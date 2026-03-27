import React, { useState } from 'react';
import { User, Bell, Plus, Minus, TrendingUp, TrendingDown } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import TransactionModal from './TransactionModal';

const Dashboard: React.FC = () => {
  const { balance, transactions } = useFinance();
  const [modalType, setModalType] = useState<'income' | 'expense' | null>(null);

  const formatCurrency = (amt: number) => {
    return amt.toLocaleString('uz-UZ') + " so'm";
  };

  return (
    <div className="animate-fade-in">
      <header className="dashboard-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="card-icon" style={{ borderRadius: '50%', backgroundColor: 'var(--primary)' }}>
            <User size={20} color="white" />
          </div>
          <div>
            <h3 style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Xush kelibsiz!</h3>
            <p style={{ fontWeight: '600' }}>Foydalanuvchi</p>
          </div>
        </div>
        <div className="card-icon">
          <Bell size={20} color="var(--text-muted)" />
        </div>
      </header>

      <div className="balance-card">
        <div className="balance-label">Joriy Balans</div>
        <div className="balance-amount">{formatCurrency(balance)}</div>
      </div>

      <div className="action-buttons">
        <button className="btn-action btn-income" onClick={() => setModalType('income')}>
          <Plus size={20} />
          Kirim
        </button>
        <button className="btn-action btn-expense" onClick={() => setModalType('expense')}>
          <Minus size={20} />
          Chiqim
        </button>
      </div>

      <h2 className="section-title">So'nggi operatsiyalar</h2>
      <div className="card-list">
        {transactions.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '20px' }}>
            Hali hech qanday operatsiya yo'q
          </p>
        ) : (
          transactions.slice(0, 10).map(t => (
            <div key={t.id} className="card-item">
              <div className="card-icon" style={{ 
                backgroundColor: t.type === 'income' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)' 
              }}>
                {t.type === 'income' ? (
                  <TrendingUp size={20} color="var(--income)" />
                ) : (
                  <TrendingDown size={20} color="var(--expense)" />
                )}
              </div>
              <div className="card-info">
                <div className="card-name">{t.category}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{t.comment || 'Izohsiz'}</div>
              </div>
              <div className="card-amount" style={{ 
                color: t.type === 'income' ? 'var(--income)' : 'var(--expense)' 
              }}>
                {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
              </div>
            </div>
          ))
        )}
      </div>

      {modalType && (
        <TransactionModal 
          type={modalType} 
          onClose={() => setModalType(null)} 
        />
      )}
    </div>
  );
};

export default Dashboard;
