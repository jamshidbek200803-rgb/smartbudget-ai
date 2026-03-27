import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';
import { useFinance } from '../context/FinanceContext';

const COLORS = ['#6366f1', '#22c55e', '#ef4444', '#f59e0b', '#8b5cf6', '#ec4899'];

const StatsView: React.FC = () => {
  const { transactions } = useFinance();

  // Pie chart data: Expenses by category
  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  const categoryDataMap: Record<string, number> = {};
  expenseTransactions.forEach(t => {
    categoryDataMap[t.category] = (categoryDataMap[t.category] || 0) + t.amount;
  });

  const pieData = Object.entries(categoryDataMap).map(([name, value]) => ({ name, value }));

  // Bar chart data: Last 7 days overview
  // (Simplified for this version)
  const barData = [
    { name: 'Dush', kirim: 0, chiqim: 0 },
    { name: 'Sesh', kirim: 0, chiqim: 0 },
    { name: 'Chor', kirim: 0, chiqim: 0 },
    { name: 'Pay', kirim: 0, chiqim: 0 },
    { name: 'Jum', kirim: 0, chiqim: 0 },
    { name: 'Shan', kirim: 0, chiqim: 0 },
    { name: 'Yak', kirim: 0, chiqim: 0 },
  ];

  return (
    <div className="animate-fade-in" style={{ padding: '24px 0' }}>
      <h2 className="section-title">Statistika</h2>
      
      <div className="chart-container glass">
        <h3 style={{ marginBottom: '20px', fontSize: '16px' }}>Kategoriyalar bo'yicha xarajatlar</h3>
        {pieData.length > 0 ? (
          <div style={{ height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px' }}
                  itemStyle={{ color: 'var(--text-main)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Ma'lumotlar yetarli emas</p>
        )}
      </div>

      <div className="chart-container glass">
        <h3 style={{ marginBottom: '20px', fontSize: '16px' }}>Haftalik hisobot</h3>
        <div style={{ height: '200px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px' }}
              />
              <Bar dataKey="chiqim" fill="var(--expense)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="kirim" fill="var(--income)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="section-title" style={{ marginTop: '20px' }}>Tahlil</div>
      <div className="card-list">
        {pieData.map((item, index) => (
          <div key={item.name} className="card-item">
            <div className="card-icon" style={{ backgroundColor: COLORS[index % COLORS.length] + '20' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: COLORS[index % COLORS.length] }} />
            </div>
            <div className="card-info">
              <div className="card-name">{item.name}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {Math.round((item.value / expenseTransactions.reduce((s, t) => s + t.amount, 0)) * 100)}% ulush
              </div>
            </div>
            <div className="card-amount">{item.value.toLocaleString()} so'm</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsView;
