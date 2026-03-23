import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const Layout = ({ children }: { children?: ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-background text-foreground">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden selection:bg-blue-500/30">
      <Sidebar />
      <main className="flex-1 ml-72 overflow-y-auto p-10 relative">
        <div className="max-w-7xl mx-auto z-10 relative">
          <Outlet />
          {children}
        </div>
        
        {/* Premium Background Gradients */}
        <div className="fixed top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="fixed bottom-[-10%] left-[15%] w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="fixed top-[40%] left-[50%] w-[800px] h-[800px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      </main>
    </div>
  );
};

export default Layout;
