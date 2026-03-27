import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useFinance, type TransactionType } from '../context/FinanceContext';

interface Props {
  type: TransactionType;
  onClose: () => void;
}

const CATEGORIES = {
  income: ['ish haqi', 'bonus', 'sovg‘a', 'boshqa'],
  expense: ['Ovqat', 'Transport', 'Ijara', 'Ko‘ngilochar', 'Boshqa'],
};

const TransactionModal: React.FC<Props> = ({ type, onClose }) => {
  const { addTransaction } = useFinance();
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[type][0]);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return;

    addTransaction({
      amount: Number(amount),
      type,
      category,
      comment,
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-fade-in" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700' }}>
            {type === 'income' ? 'Kirim qo‘shish' : 'Chiqim qo‘shish'}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)' }}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Summa</label>
            <input 
              type="number" 
              className="input" 
              placeholder="0"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="label">Kategoriya</label>
            <select 
              className="input" 
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              {CATEGORIES[type].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="label">Izoh</label>
            <textarea 
              className="input" 
              style={{ minHeight: '100px', resize: 'none' }}
              placeholder="Nima uchun?"
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-submit" style={{ 
            backgroundColor: type === 'income' ? 'var(--income)' : 'var(--expense)' 
          }}>
            Saqlash
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
