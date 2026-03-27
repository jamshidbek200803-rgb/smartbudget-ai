import React, { createContext, useContext, useState, useEffect } from 'react';

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  category: string;
  comment: string;
  date: string;
}

export interface Budget {
  category: string;
  limit: number;
  spent: number;
}

export interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
}

export interface Debt {
  id: string;
  name: string;
  amount: number;
  type: 'borrowed' | 'lent';
  dueDate: string;
}

export interface Subscription {
  id: string;
  name: string;
  amount: number;
  period: string;
}

interface FinanceContextType {
  balance: number;
  transactions: Transaction[];
  budgets: Budget[];
  goals: Goal[];
  debts: Debt[];
  subscriptions: Subscription[];
  addTransaction: (t: Omit<Transaction, 'id' | 'date'>) => void;
  deleteTransaction: (id: string) => void;
  updateBudget: (b: Budget) => void;
  addGoal: (g: Omit<Goal, 'id' | 'current'>) => void;
  updateGoal: (id: string, amount: number) => void;
  addDebt: (d: Omit<Debt, 'id'>) => void;
  addSubscription: (s: Omit<Subscription, 'id'>) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

const DEFAULT_BUDGETS: Budget[] = [
  { category: 'Ovqat', limit: 1500000, spent: 0 },
  { category: 'Transport', limit: 500000, spent: 0 },
  { category: 'Ijara', limit: 2000000, spent: 0 },
  { category: 'Ko‘ngilochar', limit: 300000, spent: 0 },
];

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });

  const [budgets, setBudgets] = useState<Budget[]>(() => {
    const saved = localStorage.getItem('budgets');
    return saved ? JSON.parse(saved) : DEFAULT_BUDGETS;
  });

  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem('goals');
    return saved ? JSON.parse(saved) : [];
  });

  const [debts, setDebts] = useState<Debt[]>(() => {
    const saved = localStorage.getItem('debts');
    return saved ? JSON.parse(saved) : [];
  });

  const [subscriptions, setSubscriptions] = useState<Subscription[]>(() => {
    const saved = localStorage.getItem('subscriptions');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Netflix', amount: 120000, period: 'Oylik' },
      { id: '2', name: 'Spotify', amount: 50000, period: 'Oylik' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    
    // Update budget spent amounts when transactions change
    const newBudgets = budgets.map(b => {
      const spent = transactions
        .filter(t => t.type === 'expense' && t.category === b.category)
        .reduce((sum, t) => sum + t.amount, 0);
      return { ...b, spent };
    });
    setBudgets(newBudgets);
    localStorage.setItem('budgets', JSON.stringify(newBudgets));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('debts', JSON.stringify(debts));
  }, [debts]);

  useEffect(() => {
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);

  const balance = transactions.reduce((sum, t) => {
    return t.type === 'income' ? sum + t.amount : sum - t.amount;
  }, 0);

  const addTransaction = (t: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...t,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const updateBudget = (b: Budget) => {
    setBudgets(prev => prev.map(item => item.category === b.category ? b : item));
  };

  const addGoal = (g: Omit<Goal, 'id' | 'current'>) => {
    const newGoal: Goal = {
      ...g,
      id: Math.random().toString(36).substr(2, 9),
      current: 0,
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const updateGoal = (id: string, amount: number) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, current: g.current + amount } : g));
  };

  const addDebt = (d: Omit<Debt, 'id'>) => {
    const newDebt: Debt = { ...d, id: Math.random().toString(36).substr(2, 9) };
    setDebts(prev => [...prev, newDebt]);
  };

  const addSubscription = (s: Omit<Subscription, 'id'>) => {
    const newSub: Subscription = { ...s, id: Math.random().toString(36).substr(2, 9) };
    setSubscriptions(prev => [...prev, newSub]);
  };

  return (
    <FinanceContext.Provider value={{
      balance,
      transactions,
      budgets,
      goals,
      debts,
      subscriptions,
      addTransaction,
      deleteTransaction,
      updateBudget,
      addGoal,
      updateGoal,
      addDebt,
      addSubscription,
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) throw new Error('useFinance must be used within a FinanceProvider');
  return context;
};
