import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

const AIAdvisor: React.FC = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Salom! Men sizning aqlli moliyaviy maslahatchingizman. Xarajatlaringizni tahlil qilishimni xohlaysizmi?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setMessages([...messages, userMsg]);
    setInput('');

    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: 'Tushunaman. Xaridaringizni tahlil qilsak, siz ovqatga 40% sarflayapsiz. Bu oylik budjetingiz uchun biroz ko‘p. Biz uni kamaytirishimiz mumkin!' 
      }]);
    }, 1000);
  };

  return (
    <div className="animate-fade-in" style={{ padding: '24px 0', height: 'calc(100vh - 160px)', display: 'flex', flexDirection: 'column' }}>
      <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Sparkles size={20} color="var(--primary)" /> Smart AI Maslahatchi
      </h2>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ 
            alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '80%',
            padding: '12px 16px',
            borderRadius: m.role === 'user' ? '20px 20px 0 20px' : '20px 20px 20px 0',
            backgroundColor: m.role === 'user' ? 'var(--primary)' : 'var(--bg-card)',
            color: '#fff',
            fontSize: '14px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            {m.text}
          </div>
        ))}
      </div>

      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', gap: '12px', background: 'var(--bg-card)', padding: '8px 16px', borderRadius: '30px', border: '1px solid var(--border)' }}>
          <input 
            className="input" 
            style={{ border: 'none', background: 'none', padding: '8px', margin: 0 }}
            placeholder="AI dan so'rang..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend} style={{ background: 'var(--primary)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAdvisor;
