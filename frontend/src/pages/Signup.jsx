import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { User, Mail, Lock, UserPlus, ArrowRight } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/signup', formData);
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Username might be taken.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 px-6 lg:px-8 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent italic">
            Join AI Insights
          </h1>
          <p className="mt-2 text-muted text-sm uppercase tracking-[0.2em] font-medium">Start your trading journey</p>
        </div>

        <div className="glass p-8 rounded-[32px] shadow-2xl border-white/10 glow">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-muted mb-2">Username</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full bg-white/5 border border-border rounded-xl px-11 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium text-white"
                  placeholder="johndoe"
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted mb-2">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border border-border rounded-xl px-11 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium text-white"
                  placeholder="name@company.com"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-white/5 border border-border rounded-xl px-11 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium text-white"
                  placeholder="••••••••"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              </div>
            </div>

            {error && <p className="text-red-400 text-sm text-center font-medium">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 transition-all py-4 px-4 rounded-xl font-bold flex items-center justify-center gap-2 group shadow-lg shadow-primary/20"
            >
              {loading ? 'Creating Account...' : (
                <>
                  Create Account <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-muted text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:text-blue-300 font-bold transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
