import React, { useState, useEffect } from 'react';
import { Star, Trash2, TrendingUp, DollarSign, Activity } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Watchlist = () => {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWatchlist = async () => {
    try {
      const response = await api.get(`/watchlist/${user.username}`);
      const symbols = response.data.assetSymbols;
      
      const details = await Promise.all(symbols.map(async (s) => {
        try {
          const res = await api.get(`/assets/crypto/${s}`);
          return res.data;
        } catch {
            const res = await api.get(`/assets/stock/${s}`);
            return res.data;
        }
      }));
      setWatchlist(details);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (symbol) => {
    try {
      await api.delete(`/watchlist/${user.username}/remove/${symbol}`);
      setWatchlist(watchlist.filter(item => item.symbol !== symbol));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) fetchWatchlist();
  }, [user]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Your Watchlist</h2>
        <p className="text-muted mt-1">Quick access to your preferred assets.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-20 glass rounded-3xl">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-primary"></div>
        </div>
      ) : watchlist.length === 0 ? (
        <div className="glass p-20 rounded-[32px] text-center">
          <Star className="w-12 h-12 text-muted mx-auto mb-4" />
          <h3 className="text-xl font-bold">Your watchlist is empty</h3>
          <p className="text-muted mt-2">Add assets from the dashboard to start tracking them here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {watchlist.map((item) => (
            <div key={item.symbol} className="glass p-6 rounded-3xl hover:border-primary/20 transition-all group overflow-hidden relative">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary font-bold">
                    {item.symbol.substring(0, 1).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold">{item.name}</h4>
                    <p className="text-muted text-xs uppercase">{item.symbol}</p>
                  </div>
                </div>
                <button 
                  onClick={() => removeItem(item.symbol)}
                  className="p-2 rounded-lg bg-white/5 text-muted hover:text-red-400 hover:bg-red-400/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-muted text-xs font-bold uppercase"><DollarSign className="w-3 h-3 text-blue-400" /> Price</div>
                    <div className="font-bold">${item.lastPrice.toLocaleString()}</div>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-muted text-xs font-bold uppercase"><Activity className="w-3 h-3 text-cyan-400" /> Volume</div>
                    <div className="font-bold">${(item.volume / 1e6).toFixed(1)}M</div>
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-between">
                 <p className="text-green-400 text-sm flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> +1.2%
                 </p>
                 <button className="text-primary text-xs font-bold uppercase tracking-wider hover:underline">View Details</button>
              </div>
              
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-3xl rounded-full -mr-12 -mt-12 group-hover:bg-primary/20 transition-colors"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
