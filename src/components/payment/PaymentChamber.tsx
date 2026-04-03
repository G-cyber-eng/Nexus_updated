import React, { useState } from 'react';
import { CreditCard, ArrowUpRight, ArrowDownRight, Wallet, Plus, Send } from 'lucide-react';

type Transaction = {
  id: number;
  type: 'deposit' | 'withdraw' | 'investment' | 'payment';
  name: string;
  amount: number;
  status: 'success' | 'pending' | 'failed';
  date: string;
  description?: string;
};

const PaymentChamber: React.FC = () => {
  const [balance, setBalance] = useState(12450); // Mock wallet balance
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      type: 'investment',
      name: 'TechNova Solutions',
      amount: 5000,
      status: 'success',
      date: '2026-03-28',
      description: 'Seed funding round'
    },
    {
      id: 2,
      type: 'deposit',
      name: 'Bank Transfer',
      amount: 10000,
      status: 'success',
      date: '2026-03-25'
    },
    {
      id: 3,
      type: 'withdraw',
      name: 'Personal Account',
      amount: 2000,
      status: 'success',
      date: '2026-03-20'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'pay' | 'deposit' | 'withdraw'>('pay');
  const [startupName, setStartupName] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleInvestment = () => {
    if (!startupName || !amount) {
      alert('Please enter startup name and amount');
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now(),
      type: 'investment',
      name: startupName,
      amount: Number(amount),
      status: 'success',
      date: new Date().toISOString().split('T')[0],
      description: description || 'Investment in startup'
    };

    setTransactions([newTransaction, ...transactions]);
    setBalance(prev => prev - Number(amount));
    
    setStartupName('');
    setAmount('');
    setDescription('');
    
    alert(`Successfully invested $${amount} in ${startupName}`);
  };

  const handleDeposit = () => {
    if (!amount) return;
    const depositAmount = Number(amount);
    
    setBalance(prev => prev + depositAmount);
    setTransactions([{
      id: Date.now(),
      type: 'deposit',
      name: 'Bank Deposit',
      amount: depositAmount,
      status: 'success',
      date: new Date().toISOString().split('T')[0]
    }, ...transactions]);

    setAmount('');
    alert(`$${depositAmount} deposited successfully!`);
  };

  const getStatusColor = (status: string) => {
    if (status === 'success') return 'text-green-600 bg-green-100';
    if (status === 'pending') return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getTypeIcon = (type: string) => {
    if (type === 'deposit') return <ArrowDownRight className="text-green-600" size={18} />;
    if (type === 'withdraw') return <ArrowUpRight className="text-red-600" size={18} />;
    return <Send className="text-blue-600" size={18} />;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 h-full flex flex-col">
      
      {/* Wallet Balance */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-gray-500 font-medium">Available Balance</p>
          <h2 className="text-3xl font-bold text-gray-900">
            ${balance.toLocaleString()}
          </h2>
        </div>
        <div className="p-3 bg-green-100 rounded-full">
          <Wallet size={28} className="text-green-600" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-4">
        {(['pay', 'deposit', 'withdraw'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-medium capitalize transition-all
              ${activeTab === tab 
                ? 'border-b-2 border-primary-600 text-primary-600' 
                : 'text-gray-500 hover:text-gray-700'}`}
          >
            {tab === 'pay' ? 'Invest Now' : tab}
          </button>
        ))}
      </div>

      {/* Pay / Invest Form */}
      {activeTab === 'pay' && (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Startup Name"
            value={startupName}
            onChange={(e) => setStartupName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary-500"
          />
          
          <input
            type="number"
            placeholder="Investment Amount ($)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary-500"
          />

          <textarea
            placeholder="Description (Optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary-500 h-20 resize-y"
          />

          <button
            onClick={handleInvestment}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <Send size={20} />
            Invest Now
          </button>
        </div>
      )}

      {/* Deposit Form */}
      {activeTab === 'deposit' && (
        <div className="space-y-4">
          <input
            type="number"
            placeholder="Deposit Amount ($)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary-500"
          />
          <button
            onClick={handleDeposit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-semibold"
          >
            Deposit Funds
          </button>
        </div>
      )}

      {/* Withdraw Form (Mock) */}
      {activeTab === 'withdraw' && (
        <div className="space-y-4">
          <input
            type="number"
            placeholder="Withdraw Amount ($)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary-500"
          />
          <button
            onClick={() => {
              if (!amount) return;
              alert(`Withdrawal request of $${amount} submitted successfully!`);
              setAmount('');
            }}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3.5 rounded-xl font-semibold"
          >
            Request Withdrawal
          </button>
          <p className="text-xs text-gray-500 text-center">Funds will be transferred within 2-3 business days</p>
        </div>
      )}

      {/* Transaction History */}
      <div className="mt-8 flex-1">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <CreditCard size={20} />
          Transaction History
        </h3>

        <div className="space-y-3 max-h-[280px] overflow-y-auto pr-2">
          {transactions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No transactions yet</p>
          ) : (
            transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  {getTypeIcon(tx.type)}
                  <div>
                    <p className="font-medium text-sm">{tx.name}</p>
                    <p className="text-xs text-gray-500">{tx.date}</p>
                    {tx.description && (
                      <p className="text-xs text-gray-400 mt-0.5">{tx.description}</p>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <p className={`font-semibold ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {tx.amount > 0 ? '+' : ''}${tx.amount}
                  </p>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full ${getStatusColor(tx.status)}`}>
                    {tx.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentChamber;