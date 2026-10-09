import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, Lock } from 'lucide-react';
import { PublicLayout, Eyebrow } from '@/components/site';

const ADMIN_USERNAME = 'Admin';
const ADMIN_PASSWORD = '12345678';

export function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      sessionStorage.setItem('buyside_admin_session', ADMIN_PASSWORD);
      window.location.href = '/admin';
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <PublicLayout>
      <div className="mx-auto max-w-[1280px] px-5 py-10 md:px-10 md:py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#716956]">
          <ArrowLeft size={14} /> Back to home
        </Link>
        <div className="mt-6">
          <Eyebrow>Administration</Eyebrow>
          <h1 className="font-editorial mt-4 text-5xl tracking-[-.03em] md:text-6xl">Admin Login</h1>
        </div>
        <div className="mt-8 max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-mono-label text-[9px] uppercase tracking-[.15em] text-[#8c8475]">Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="mt-2 h-10 w-full border border-[#cfc8bc] bg-[#fbfaf7] px-3 text-[13px] outline-none transition focus:border-[#9a8352]"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="font-mono-label text-[9px] uppercase tracking-[.15em] text-[#8c8475]">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="mt-2 h-10 w-full border border-[#cfc8bc] bg-[#fbfaf7] px-3 text-[13px] outline-none transition focus:border-[#9a8352]"
                placeholder="Enter password"
              />
            </div>
            {error && <div className="border border-[#d7c3b8] bg-[#f8f2ed] p-3 text-sm text-[#815d4f]">{error}</div>}
            <button
              type="submit"
              className="inline-flex h-10 items-center gap-2 bg-[#38352f] px-5 text-[12px] uppercase tracking-wider text-[#f5f2eb] transition hover:bg-[#504b40]"
            >
              <Lock size={14} /> Sign In
            </button>
          </form>
        </div>
      </div>
    </PublicLayout>
  );
}
