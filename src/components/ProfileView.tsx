import React from 'react';
import { User, Shield, Globe, Award, LogOut, ChevronRight } from 'lucide-react';

const ProfileView: React.FC = () => {
  const menuItems = [
    { icon: <Shield size={20} />, title: 'Xavfsizlik', subtitle: 'PIN kod va Face ID' },
    { icon: <Globe size={20} />, title: 'Til', subtitle: 'O‘zbek (Lotin)' },
    { icon: <Award size={20} />, title: 'Premium', subtitle: 'Barcha imkoniyatlar', color: 'var(--primary)' },
  ];

  return (
    <div className="animate-fade-in" style={{ padding: '24px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ 
          width: '100px', height: '100px', borderRadius: '50%', 
          backgroundColor: 'var(--bg-card)', border: '4px solid var(--primary)',
          margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <User size={48} color="var(--primary)" />
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: '700' }}>Foydalanuvchi</h2>
        <p style={{ color: 'var(--text-muted)' }}>premium a'zosi</p>
      </div>

      <div className="card-list">
        {menuItems.map((item, idx) => (
          <div key={idx} className="card-item" style={{ cursor: 'pointer' }}>
            <div className="card-icon" style={{ color: item.color || 'var(--text-muted)' }}>
              {item.icon}
            </div>
            <div className="card-info">
              <div className="card-name">{item.title}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.subtitle}</div>
            </div>
            <ChevronRight size={20} color="var(--border)" />
          </div>
        ))}

        <div className="card-item" style={{ marginTop: '20px', backgroundColor: 'rgba(239, 68, 68, 0.05)', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
          <div className="card-icon" style={{ color: 'var(--expense)' }}>
            <LogOut size={20} />
          </div>
          <div className="card-info">
            <div className="card-name" style={{ color: 'var(--expense)' }}>Chiqish</div>
          </div>
        </div>
      </div>

      <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '10px', marginTop: '40px' }}>
        SmartBudget AI v1.0.0
      </p>
    </div>
  );
};

export default ProfileView;
