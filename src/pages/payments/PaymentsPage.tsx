import React, { useState } from 'react';
import { CreditCard, Plus, ArrowDown, ArrowUp, Send, Wallet, DollarSign } from 'lucide-react';

const PaymentsPage: React.FC = () => {
  const [walletBalance, setWalletBalance] = useState(12450);
  const [transactions] = useState([
    { id: 1, type: 'Received', amount: 5000, from: 'TechNova Solutions', date: '2026-04-02', status: 'success' },
    { id: 2, type: 'Sent', amount: 1200, from: 'StartupX', date: '2026-04-01', status: 'success' },
    { id: 3, type: 'Deposit', amount: 10000, from: 'Bank Transfer', date: '2026-03-28', status: 'success' },
    { id: 4, type: 'Withdrawal', amount: 3000, from: 'Personal Account', date: '2026-03-25', status: 'success' },
  ]);

  const [amount, setAmount] = useState('');
  const [action, setAction] = useState<'deposit' | 'withdraw' | 'transfer' | null>(null);

  const handleAction = (type: 'deposit' | 'withdraw' | 'transfer') => {
    if (!amount) return alert('Amount enter karo!');
    const num = parseFloat(amount);
    
    if (type === 'deposit') {
      setWalletBalance(prev => prev + num);
      alert(`$${num} Deposit successful!`);
    } else if (type === 'withdraw') {
      if (num > walletBalance) return alert('Insufficient balance!');
      setWalletBalance(prev => prev - num);
      alert(`$${num} Withdrawal successful!`);
    } else if (type === 'transfer') {
      if (num > walletBalance) return alert('Insufficient balance!');
      setWalletBalance(prev => prev - num);
      alert(`$${num} transferred successfully!`);
    }
    setAmount('');
    setAction(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <CreditCard className="w-8 h-8 text-emerald-600" />
          <h1 className="text-3xl font-bold text-gray-900">Payments & Wallet</h1>
        </div>
        <div className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-5 py-2 rounded-3xl text-lg font-semibold">
          <Wallet className="w-6 h-6" />
          ${walletBalance.toLocaleString()}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-5 bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
          
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => setAction('deposit')}
              className="flex flex-col items-center justify-center p-6 bg-emerald-50 hover:bg-emerald-100 rounded-3xl transition"
            >
              <ArrowDown className="w-8 h-8 text-emerald-600 mb-3" />
              <span className="font-medium">Deposit</span>
            </button>
            
            <button
              onClick={() => setAction('withdraw')}
              className="flex flex-col items-center justify-center p-6 bg-orange-50 hover:bg-orange-100 rounded-3xl transition"
            >
              <ArrowUp className="w-8 h-8 text-orange-600 mb-3" />
              <span className="font-medium">Withdraw</span>
            </button>
            
            <button
              onClick={() => setAction('transfer')}
              className="flex flex-col items-center justify-center p-6 bg-blue-50 hover:bg-blue-100 rounded-3xl transition"
            >
              <Send className="w-8 h-8 text-blue-600 mb-3" />
              <span className="font-medium">Transfer</span>
            </button>
          </div>

          {action && (
            <div className="mt-8 p-6 border border-gray-200 rounded-3xl">
              <h3 className="font-medium mb-4 capitalize">{action} Amount</h3>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-5 py-4 border border-gray-300 rounded-2xl text-2xl focus:outline-none focus:border-emerald-500"
              />
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => { setAction(null); setAmount(''); }}
                  className="flex-1 py-4 border border-gray-300 rounded-3xl font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleAction(action)}
                  className="flex-1 py-4 bg-emerald-600 text-white rounded-3xl font-medium"
                >
                  Confirm {action}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Fund a Deal (Mock) */}
        <div className="lg:col-span-7 bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <DollarSign className="w-6 h-6" />
            Fund a Deal
          </h2>
          <p className="text-gray-600 mb-6">Send money directly to an entrepreneur</p>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <input type="text" placeholder="Startup Name" className="flex-1 px-5 py-4 border rounded-3xl" />
              <input type="number" placeholder="Amount ($)" className="w-48 px-5 py-4 border rounded-3xl" />
            </div>
            <button className="w-full py-5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xl font-semibold rounded-3xl hover:from-emerald-600 hover:to-teal-700 transition">
              Send Investment Now
            </button>
          </div>
        </div>

        {/* Transaction History */}
        <div className="lg:col-span-12 bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="px-8 py-6 border-b">
            <h3 className="font-semibold text-lg">Transaction History</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-8 py-5 text-sm font-medium text-gray-500">Date</th>
                <th className="text-left px-8 py-5 text-sm font-medium text-gray-500">Type</th>
                <th className="text-left px-8 py-5 text-sm font-medium text-gray-500">Party</th>
                <th className="text-right px-8 py-5 text-sm font-medium text-gray-500">Amount</th>
                <th className="text-center px-8 py-5 text-sm font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-t hover:bg-gray-50">
                  <td className="px-8 py-5 text-sm">{tx.date}</td>
                  <td className="px-8 py-5 text-sm font-medium">{tx.type}</td>
                  <td className="px-8 py-5 text-sm">{tx.from}</td>
                  <td className={`px-8 py-5 text-right font-semibold ${tx.type === 'Received' || tx.type === 'Deposit' ? 'text-emerald-600' : 'text-red-600'}`}>
                    {tx.type === 'Received' || tx.type === 'Deposit' ? '+' : '-'}${tx.amount}
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className="px-5 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-3xl">Success</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export { PaymentsPage };