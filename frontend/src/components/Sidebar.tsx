import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, TrendingUp, Star, Settings, LogOut, BarChart3 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();

  const links = [
    { to: '/', name: 'Dashboard', icon: LayoutDashboard },
    { to: '/analytics', name: 'AI Insights', icon: TrendingUp },
    { to: '/watchlist', name: 'Watchlist', icon: Star },
    { to: '/monitoring', name: 'System Status', icon: BarChart3 },
    { to: '/settings', name: 'Settings', icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-72 glass border-r border-white/5 flex flex-col z-50">
      <div className="p-8 flex items-center justify-center border-b border-white/5">
        <h1 className="text-2xl font-bold text-gradient flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-xl">
            <TrendingUp className="text-blue-400 w-6 h-6" />
          </div>
          AI Insights
        </h1>
      </div>

      <nav className="flex-1 mt-8 px-5 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 font-medium ${
                isActive 
                  ? 'bg-gradient-to-r from-blue-500/20 to-indigo-500/10 text-white border border-blue-500/20 glow-blue' 
                  : 'text-muted-foreground hover:bg-white/5 hover:text-white border border-transparent'
              }`
            }
          >
            <link.icon className={`w-5 h-5 ${location.pathname === link.to ? 'text-blue-400' : ''}`} />
            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-6 border-t border-white/5 mt-auto">
        <button
          onClick={logout}
          className="flex items-center gap-4 px-5 py-4 w-full text-muted-foreground hover:text-red-400 hover:bg-red-500/10 rounded-2xl transition-all duration-300 font-medium group"
        >
          <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
