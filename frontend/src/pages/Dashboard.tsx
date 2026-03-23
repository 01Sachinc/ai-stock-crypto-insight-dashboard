import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, TrendingDown, Activity, DollarSign, Sparkles } from 'lucide-react';
import api from '../services/api';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [search, setSearch] = useState('bitcoin');
  const [asset, setAsset] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl font-bold tracking-tight">Market Overview</h2>
          <p className="text-muted-foreground mt-2 text-lg">Track your favorite assets and get AI insights.</p>
        </div>
        
        <div className="relative group w-full md:w-auto">
          <input
            type="text"
            placeholder="Search (BTC, ETH, AAPL)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchAsset()}
            className="bg-white/5 border border-white/10 px-12 py-4 rounded-2xl w-full md:w-96 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all text-white placeholder:text-muted-foreground"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-blue-400 transition-colors" />
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center p-32 premium-card">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && !loading && (
        <div className="premium-card text-center p-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-6">
            <Activity className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-2xl font-bold">{error}</h3>
          <p className="text-muted-foreground mt-2">Try searching for another asset symbol.</p>
        </div>
      )}

      {asset && !loading && !error && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Chart Card */}
          <div className="xl:col-span-2 premium-card glow-blue group">
            <div className="flex justify-between items-start mb-10">
              <div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center text-blue-400 font-bold text-2xl border border-white/5 shadow-inner">
                    {asset.symbol.substring(0, 1).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold tracking-tight">{asset.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 rounded-md bg-white/10 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {asset.type || 'Crypto'}
                      </span>
                      <p className="text-muted-foreground font-medium uppercase tracking-widest">{asset.symbol}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold tracking-tighter">${asset.lastPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p className="text-green-400 font-medium flex items-center justify-end gap-1.5 mt-2 bg-green-500/10 inline-flex px-3 py-1 rounded-lg">
                  <TrendingUp className="w-4 h-4" /> +2.4% <span className="text-muted-foreground text-xs ml-1">(24h)</span>
                </p>
              </div>
            </div>

            <div className="h-[400px] w-full mt-4 -ml-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                  <YAxis hide domain={['dataMin - 500', 'dataMax + 500']} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(15, 17, 21, 0.9)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)', padding: '12px 20px' }}
                    itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                    labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                  />
                  <Area type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorPrice)" activeDot={{ r: 6, strokeWidth: 0, fill: '#60a5fa' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6 flex flex-col">
            <StatCard icon={DollarSign} label="Market Cap" value={`$${(asset.marketCap / 1e9).toFixed(2)}B`} color="text-blue-400" bg="bg-blue-500/10" />
            <StatCard icon={Activity} label="Volume (24h)" value={`$${(asset.volume / 1e6).toFixed(2)}M`} color="text-cyan-400" bg="bg-cyan-500/10" />
            <StatCard icon={TrendingUp} label="All Time High" value={`$${(asset.lastPrice * 1.5).toLocaleString(undefined, { maximumFractionDigits: 0 })}`} color="text-purple-400" bg="bg-purple-500/10" />
            
            <div className="flex-1"></div>
            
            <button className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all rounded-2xl font-bold shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 group">
              <Sparkles className="w-5 h-5 text-blue-200 group-hover:animate-pulse" />
              Add to Premium Watchlist
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, color, bg }: { icon: any, label: string, value: string, color: string, bg: string }) => (
  <div className="premium-card flex items-center gap-5 p-7 hover:border-white/10 hover:bg-white/[0.03] cursor-default">
    <div className={`p-4 rounded-2xl ${bg} ${color} shadow-inner`}>
      <Icon className="w-7 h-7" />
    </div>
    <div>
      <p className="text-muted-foreground text-xs uppercase tracking-widest font-semibold mb-1">{label}</p>
      <p className="text-2xl font-bold tracking-tight">{value}</p>
    </div>
  </div>
);

export default Dashboard;
