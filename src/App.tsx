import React, { useState } from 'react';
import { Home, BarChart2, Target, CreditCard, User, Plus, Bell, LayoutGrid, Sparkles, TrendingUp } from 'lucide-react';
import Dashboard from './components/Dashboard';
import StatsView from './components/StatsView';
import BudgetLimit from './components/BudgetLimit';
import GoalBank from './components/GoalBank';
import ProfileView from './components/ProfileView';
import DebtManager from './components/DebtManager';
import SubscriptionView from './components/SubscriptionView';
import AIAdvisor from './components/AIAdvisor';
import CurrencyRates from './components/CurrencyRates';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'home': return <Dashboard />;
      case 'stats': return <StatsView />;
      case 'budget': return <BudgetLimit />;
      case 'savings': return <GoalBank />;
      case 'profile': return <ProfileView />;
      case 'debts': return <DebtManager />;
      case 'subs': return <SubscriptionView />;
      case 'ai': return <AIAdvisor />;
      case 'rates': return <CurrencyRates />;
      case 'menu': return <MenuView setActiveTab={setActiveTab} />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      {renderScreen()}

      <nav className="bottom-nav glass">
        <div className={`nav-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>
          <Home size={24} />
          <span>Home</span>
        </div>
        <div className={`nav-item ${activeTab === 'stats' ? 'active' : ''}`} onClick={() => setActiveTab('stats')}>
          <BarChart2 size={24} />
          <span>Statistika</span>
        </div>
        <div className={`nav-item ${activeTab === 'budget' ? 'active' : ''}`} onClick={() => setActiveTab('budget')}>
          <Target size={24} />
          <span>Budjet</span>
        </div>
        <div className={`nav-item ${activeTab === 'savings' ? 'active' : ''}`} onClick={() => setActiveTab('savings')}>
          <CreditCard size={24} />
          <span>Jamg‘arma</span>
        </div>
        <div className={`nav-item ${activeTab === 'menu' ? 'active' : ''}`} onClick={() => setActiveTab('menu')}>
          <LayoutGrid size={24} />
          <span>Menyu</span>
        </div>
      </nav>
    </div>
  );
};

const MenuView: React.FC<{ setActiveTab: (t: string) => void }> = ({ setActiveTab }) => {
  const menuItems = [
    { id: 'debts', title: 'Qarzlar', icon: <Plus size={20} />, color: 'var(--expense)' },
    { id: 'subs', title: 'Obunalar', icon: <Bell size={20} />, color: 'var(--primary)' },
    { id: 'ai', title: 'AI Maslahatchi', icon: <Sparkles size={20} />, color: '#ec4899' },
    { id: 'rates', title: 'Valyuta', icon: <TrendingUp size={20} />, color: 'var(--income)' },
    { id: 'profile', title: 'Profil', icon: <User size={20} />, color: 'var(--text-muted)' },
  ];

  return (
    <div className="animate-fade-in" style={{ padding: '24px 0' }}>
      <h2 className="section-title">Xizmatlar</h2>
      <div className="action-buttons" style={{ gridTemplateColumns: '1fr 1fr', padding: '0 20px' }}>
        {menuItems.map(item => (
          <div 
            key={item.id} 
            className="glass" 
            onClick={() => setActiveTab(item.id)}
            style={{ 
              padding: '24px', borderRadius: '24px', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px'
            }}
          >
            <div className="card-icon" style={{ backgroundColor: item.color + '20', color: item.color }}>
              {item.icon}
            </div>
            <span style={{ fontWeight: '600', fontSize: '14px' }}>{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
