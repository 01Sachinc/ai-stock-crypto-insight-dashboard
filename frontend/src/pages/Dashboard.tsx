import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, TrendingDown, Activity, DollarSign } from 'lucide-react';
import api from '../services/api';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [search, setSearch] = useState('bitcoin');
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAsset = async (query = search) => {
    setLoading(true);
    setError(null);
    try {
      // For simplicity, we search as crypto first, then stock if fails
      const response = await api.get(`/assets/crypto/${query}`);
      setAsset(response.data);
    } catch (err) {
      try {
        const response = await api.get(`/assets/stock/${query}`);
        setAsset(response.data);
      } catch (err2) {
        setError('Asset not found');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAsset('bitcoin');
  }, []);

  const data = [
    { name: 'Mon', price: 4000 },
    { name: 'Tue', price: 3000 },
    { name: 'Wed', price: 2000 },
    { name: 'Thu', price: 2780 },
    { name: 'Fri', price: 1890 },
    { name: 'Sat', price: 2390 },
    { name: 'Sun', price: 3490 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold">Market Overview</h2>
          <p className="text-muted mt-1">Track your favorite assets and get AI insights.</p>
        </div>
        
        <div className="relative group">
          <input
            type="text"
            placeholder="Search (BTC, ETH, AAPL)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchAsset()}
            className="bg-card border border-border px-10 py-3 rounded-2xl w-80 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted group-focus-within:text-primary" />
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center p-20 glass rounded-3xl">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-primary"></div>
        </div>
      )}

      {asset && !loading && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart Card */}
          <div className="lg:col-span-2 glass p-8 rounded-3xl glow">
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary font-bold">
                    {asset.symbol.substring(0, 1).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{asset.name}</h3>
                    <p className="text-muted text-sm">{asset.symbol.toUpperCase()}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">${asset.lastPrice.toLocaleString()}</p>
                <p className="text-green-400 text-sm flex items-center justify-end gap-1">
                  <TrendingUp className="w-4 h-4" /> +2.4% (24h)
                </p>
              </div>
            </div>

            <div className="h-80 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                  <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            <StatCard icon={DollarSign} label="Market Cap" value={`$${(asset.marketCap / 1e9).toFixed(2)}B`} color="text-blue-400" />
            <StatCard icon={Activity} label="Volume (24h)" value={`$${(asset.volume / 1e6).toFixed(2)}M`} color="text-cyan-400" />
            <StatCard icon={TrendingUp} label="ATH" value={`$${(asset.lastPrice * 1.5).toLocaleString()}`} color="text-purple-400" />
            
            <button className="w-full py-4 bg-primary hover:bg-primary/90 transition-colors rounded-2xl font-bold shadow-lg shadow-primary/20">
              Add to Watchlist
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) => (
  <div className="glass p-6 rounded-2xl flex items-center gap-4">
    <div className={`p-3 rounded-xl bg-white/5 ${color}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-muted text-xs uppercase tracking-wider font-semibold">{label}</p>
      <p className="text-xl font-bold mt-1">{value}</p>
    </div>
  </div>
);

export default Dashboard;
