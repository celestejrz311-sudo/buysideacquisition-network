import { useState, useEffect, useCallback } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, Check, Search, X } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';
import { PublicLayout, Eyebrow } from '@/components/site';

const ADMIN_SESSION_KEY = 'buyside_admin_session';
const ADMIN_PASSWORD = '1234578';
const hasAdminSession = () => sessionStorage.getItem(ADMIN_SESSION_KEY) === ADMIN_PASSWORD;

type AdminUser = {
  userId: string;
  role: string;
  interests: string | null;
  plan: string;
  suspended: boolean;
  verified: boolean;
  stripeSubscriptionStatus: string | null;
  privateNetworkApproved: boolean;
  createdAt: string;
};

type AdminRequest = {
  id: string;
  title: string;
  industry: string;
  privacy: string;
  isVerified: boolean;
  featured: boolean;
  finderRewardType: string | null;
  finderRewardValue: string | null;
  createdBy: string;
  createdAt: string;
};

type AdminMatch = {
  id: string;
  requestId: string;
  businessName: string | null;
  industry: string;
  status: string;
  createdAt: string;
};

type AdminReferral = {
  id: string;
  listingId: string;
  listingTitle: string;
  finderName: string;
  finderEmail: string;
  buyerName: string;
  buyerContact: string;
  notes: string | null;
  consent: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type Analytics = {
  users: { total: number; verified: number; suspended: number };
  requests: { total: number; public: number; featured: number };
  matches: { total: number; pending: number };
  memberships: { pro: number; partner: number };
  privateNetwork: { approved: number };
  referrals: { total: number; new: number };
};

const field = 'h-10 w-full border border-[#cfc8bc] bg-[#fbfaf7] px-3 text-[13px] outline-none transition focus:border-[#9a8352]';
const btn = 'inline-flex h-9 items-center gap-1.5 px-3 text-[11px] uppercase tracking-wider transition';
const btnPrimary = `${btn} bg-[#38352f] text-[#f5f2eb] hover:bg-[#504b40]`;
const btnOutline = `${btn} border border-[#cfc8bc] text-[#38352f] hover:border-[#9a8352]`;

async function adminFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const headers: Record<string, string> = { 'content-type': 'application/json', ...options?.headers as Record<string, string> };
  if (hasAdminSession()) headers['x-admin-key'] = ADMIN_PASSWORD;
  const res = await fetch(`/api${path}`, {
    ...options,
    headers,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

export function AdminPage() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<'users' | 'requests' | 'matches' | 'referrals' | 'analytics'>('analytics');
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [requests, setRequests] = useState<AdminRequest[]>([]);
  const [matches, setMatches] = useState<AdminMatch[]>([]);
  const [referrals, setReferrals] = useState<AdminReferral[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    if (hasAdminSession()) { setIsAdmin(true); return; }
    setIsAdmin(false);
  }, []);

  const loadUsers = useCallback(async () => {
    setLoading(true); setError('');
    try { setUsers(await adminFetch<AdminUser[]>('/admin/users')); }
    catch (e) { setError((e as Error).message); }
    finally { setLoading(false); }
  }, []);

  const loadRequests = useCallback(async () => {
    setLoading(true); setError('');
    try { setRequests(await adminFetch<AdminRequest[]>('/admin/requests')); }
    catch (e) { setError((e as Error).message); }
    finally { setLoading(false); }
  }, []);

  const loadMatches = useCallback(async () => {
    setLoading(true); setError('');
    try { setMatches(await adminFetch<AdminMatch[]>('/admin/matches')); }
    catch (e) { setError((e as Error).message); }
    finally { setLoading(false); }
  }, []);

  const loadAnalytics = useCallback(async () => {
    setLoading(true); setError('');
    try { setAnalytics(await adminFetch<Analytics>('/admin/analytics')); }
    catch (e) { setError((e as Error).message); }
    finally { setLoading(false); }
  }, []);

  const loadReferrals = useCallback(async () => {
    setLoading(true); setError('');
    try { setReferrals(await adminFetch<AdminReferral[]>('/admin/finder-referrals')); }
    catch (e) { setError((e as Error).message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => {
    if (isAdmin !== true) return;
    if (tab === 'users') loadUsers();
    else if (tab === 'requests') loadRequests();
    else if (tab === 'matches') loadMatches();
    else if (tab === 'referrals') loadReferrals();
    else loadAnalytics();
  }, [tab, isAdmin, loadUsers, loadRequests, loadMatches, loadReferrals, loadAnalytics]);

  const updateUser = async (uid: string, updates: Record<string, unknown>) => {
    setSaving(uid);
    try {
      await adminFetch(`/admin/users/${uid}`, { method: 'PATCH', body: JSON.stringify(updates) });
      setUsers(prev => prev.map(u => u.userId === uid ? { ...u, ...updates } : u));
    } catch (e) { setError((e as Error).message); }
    finally { setSaving(null); }
  };

  const updateRequest = async (id: string, updates: Record<string, unknown>) => {
    setSaving(id);
    try {
      await adminFetch(`/admin/requests/${id}`, { method: 'PATCH', body: JSON.stringify(updates) });
      setRequests(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
    } catch (e) { setError((e as Error).message); }
    finally { setSaving(null); }
  };

  const updateMatch = async (id: string, updates: Record<string, unknown>) => {
    setSaving(id);
    try {
      await adminFetch(`/admin/matches/${id}`, { method: 'PATCH', body: JSON.stringify(updates) });
      setMatches(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
    } catch (e) { setError((e as Error).message); }
    finally { setSaving(null); }
  };

  const updateReferral = async (id: string, updates: Record<string, unknown>) => {
    setSaving(id);
    try {
      await adminFetch(`/admin/finder-referrals/${id}`, { method: 'PATCH', body: JSON.stringify(updates) });
      setReferrals(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
    } catch (e) { setError((e as Error).message); }
    finally { setSaving(null); }
  };

  if (isAdmin === null) {
    return <PublicLayout><div className="mx-auto max-w-[1280px] px-5 py-20 text-center text-[#6b665d]">{t('admin.checkingAccess')}</div></PublicLayout>;
  }
  if (isAdmin === false) {
    return <PublicLayout><div className="mx-auto max-w-[1280px] px-5 py-20">
      <div className="mx-auto max-w-md border border-dashed border-[#cfc8bc] bg-[#f8f6f0] px-6 py-12 text-center">
        <div className="mx-auto grid size-11 place-items-center border border-[#d7cebe] text-[#8b7952]"><X size={17} /></div>
        <h3 className="font-editorial mt-5 text-2xl">{t('admin.notAdmin')}</h3>
        <Link href="/dashboard" className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#645b48]"><ArrowLeft size={14} /> {t('admin.backToDashboard')}</Link>
      </div>
    </div></PublicLayout>;
  }

  const filteredUsers = users.filter(u => !search || u.userId.toLowerCase().includes(search.toLowerCase()) || u.role.toLowerCase().includes(search.toLowerCase()));
  const filteredRequests = requests.filter(r => !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.industry.toLowerCase().includes(search.toLowerCase()));
  const filteredMatches = matches.filter(m => !search || (m.businessName?.toLowerCase().includes(search.toLowerCase()) ?? false) || m.industry.toLowerCase().includes(search.toLowerCase()));

  const tabs: ['analytics', 'users', 'requests', 'matches', 'referrals'] = ['analytics', 'users', 'requests', 'matches', 'referrals'];
  const tabLabels: Record<string, string> = { analytics: t('admin.tabAnalytics'), users: t('admin.tabUsers'), requests: t('admin.tabRequests'), matches: t('admin.tabMatches'), referrals: t('admin.tabReferrals') };

  return <PublicLayout>
    <div className="mx-auto max-w-[1280px] px-5 py-10 md:px-10 md:py-16">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#716956]"><ArrowLeft size={14} /> {t('admin.backToDashboard')}</Link>
      <div className="mt-6"><Eyebrow>{t('admin.eyebrow')}</Eyebrow><h1 className="font-editorial mt-4 text-5xl tracking-[-.03em] md:text-6xl">{t('admin.title')}</h1><p className="mt-3 text-sm text-[#6b665d]">{t('admin.subtitle')}</p></div>

      {/* Tabs */}
      <div className="mt-8 flex flex-wrap gap-2 border-b border-[#d4cdc1] pb-3">
        {tabs.map(tb => <button key={tb} onClick={() => setTab(tb)} className={`px-4 py-2 text-[12px] uppercase tracking-wider transition ${tab === tb ? 'bg-[#38352f] text-[#f5f2eb]' : 'text-[#625d54] hover:text-[#332f29]'}`}>{tabLabels[tb]}</button>)}
      </div>

      {error && <div className="mt-4 border border-[#d7c3b8] bg-[#f8f2ed] p-3 text-sm text-[#815d4f]">{error}</div>}

      {/* Search for data tabs */}
      {tab !== 'analytics' && <div className="mt-5 relative max-w-sm"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#918a7c]" /><input className={`${field} pl-10`} placeholder={t('admin.searchPlaceholder')} value={search} onChange={e => setSearch(e.target.value)} /></div>}

      {loading && <div className="mt-8 text-sm text-[#6b665d]">{t('admin.loading')}</div>}

      {/* Analytics */}
      {!loading && tab === 'analytics' && analytics && <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: t('admin.totalUsers'), value: analytics.users.total },
          { label: t('admin.verifiedUsers'), value: analytics.users.verified },
          { label: t('admin.suspendedUsers'), value: analytics.users.suspended },
          { label: t('admin.totalRequests'), value: analytics.requests.total },
          { label: t('admin.publicRequests'), value: analytics.requests.public },
          { label: t('admin.featuredRequests'), value: analytics.requests.featured },
          { label: t('admin.totalMatches'), value: analytics.matches.total },
          { label: t('admin.pendingMatches'), value: analytics.matches.pending },
          { label: t('admin.proMembers'), value: analytics.memberships.pro },
          { label: t('admin.partnerMembers'), value: analytics.memberships.partner },
          { label: t('admin.networkApproved'), value: analytics.privateNetwork.approved },
          { label: t('admin.totalReferrals'), value: analytics.referrals?.total ?? 0 },
          { label: t('admin.newReferrals'), value: analytics.referrals?.new ?? 0 },
        ].map(m => <div key={m.label} className="border-t border-[#d4cdc1] pt-4"><div className="font-mono-label text-[9px] uppercase tracking-[.15em] text-[#8c8475]">{m.label}</div><div className="font-editorial mt-3 text-4xl">{m.value}</div></div>)}
      </div>}

      {/* Users */}
      {!loading && tab === 'users' && <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-[13px]">
          <thead><tr className="border-b border-[#d4cdc1] text-[10px] uppercase tracking-wider text-[#948c7b]">
            <th className="py-3 pr-4">{t('admin.userId')}</th><th className="py-3 pr-4">{t('admin.role')}</th><th className="py-3 pr-4">{t('admin.plan')}</th><th className="py-3 pr-4">{t('admin.verified')}</th><th className="py-3 pr-4">{t('admin.suspended')}</th><th className="py-3 pr-4">{t('admin.privateNetwork')}</th><th className="py-3 pr-4">{t('admin.stripeStatus')}</th><th className="py-3">{t('admin.actions')}</th>
          </tr></thead>
          <tbody className="divide-y divide-[#e0d9ce]">
            {filteredUsers.map(u => <tr key={u.userId}>
              <td className="py-3 pr-4 font-mono-label text-[10px] text-[#827968]">{u.userId.slice(0, 12)}…</td>
              <td className="py-3 pr-4"><select className={field} value={u.role} onChange={e => updateUser(u.userId, { role: e.target.value })} disabled={saving === u.userId}><option value="unset">unset</option><option value="buyer">buyer</option><option value="broker">broker</option><option value="business_owner">business_owner</option><option value="advisor">advisor</option><option value="deal_finder">deal_finder</option><option value="admin">admin</option></select></td>
              <td className="py-3 pr-4"><select className={field} value={u.plan} onChange={e => updateUser(u.userId, { plan: e.target.value })} disabled={saving === u.userId}><option value="free">free</option><option value="pro">pro</option><option value="partner">partner</option></select></td>
              <td className="py-3 pr-4">{u.verified ? <span className="text-[#557165]">✓</span> : <span className="text-[#918a7c]">—</span>}</td>
              <td className="py-3 pr-4">{u.suspended ? <span className="text-[#bf7864]">✓</span> : <span className="text-[#918a7c]">—</span>}</td>
              <td className="py-3 pr-4">{u.privateNetworkApproved ? <span className="text-[#557165]">✓</span> : <span className="text-[#918a7c]">—</span>}</td>
              <td className="py-3 pr-4 text-[12px] text-[#827968]">{u.stripeSubscriptionStatus || '—'}</td>
              <td className="py-3 flex flex-wrap gap-1">
                <button onClick={() => updateUser(u.userId, { verified: !u.verified })} className={btnOutline} disabled={saving === u.userId}>{u.verified ? t('admin.unverify') : t('admin.verify')}</button>
                <button onClick={() => updateUser(u.userId, { suspended: !u.suspended })} className={btnOutline} disabled={saving === u.userId}>{u.suspended ? t('admin.unsuspend') : t('admin.suspend')}</button>
                <button onClick={() => updateUser(u.userId, { privateNetworkApproved: !u.privateNetworkApproved })} className={btnOutline} disabled={saving === u.userId}>{u.privateNetworkApproved ? t('admin.revokeNetwork') : t('admin.approveNetwork')}</button>
              </td>
            </tr>)}
          </tbody>
        </table>
        {!filteredUsers.length && <div className="mt-6 text-sm text-[#6b665d]">{t('admin.noData')}</div>}
      </div>}

      {/* Requests */}
      {!loading && tab === 'requests' && <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-[13px]">
          <thead><tr className="border-b border-[#d4cdc1] text-[10px] uppercase tracking-wider text-[#948c7b]">
            <th className="py-3 pr-4">{t('admin.requestTitle')}</th><th className="py-3 pr-4">{t('admin.privacy')}</th><th className="py-3 pr-4">{t('admin.verified')}</th><th className="py-3 pr-4">{t('admin.featured')}</th><th className="py-3 pr-4">{t('admin.rewardType')}</th><th className="py-3 pr-4">{t('admin.rewardValue')}</th><th className="py-3">{t('admin.actions')}</th>
          </tr></thead>
          <tbody className="divide-y divide-[#e0d9ce]">
            {filteredRequests.map(r => <tr key={r.id}>
              <td className="py-3 pr-4 max-w-[200px] truncate">{r.title}</td>
              <td className="py-3 pr-4 text-[12px]">{r.privacy}</td>
              <td className="py-3 pr-4">{r.isVerified ? <span className="text-[#557165]">✓</span> : <span className="text-[#918a7c]">—</span>}</td>
              <td className="py-3 pr-4">{r.featured ? <span className="text-[#557165]">✓</span> : <span className="text-[#918a7c]">—</span>}</td>
              <td className="py-3 pr-4"><select className={field} value={r.finderRewardType || ''} onChange={e => updateRequest(r.id, { finderRewardType: e.target.value || null })} disabled={saving === r.id}><option value="">{t('admin.rewardNone')}</option><option value="fixed">{t('admin.rewardFixed')}</option><option value="percentage">{t('admin.rewardPercentage')}</option><option value="custom">{t('admin.rewardCustom')}</option></select></td>
              <td className="py-3 pr-4"><input className={field} value={r.finderRewardValue || ''} placeholder="$5,000 / 2% / …" onChange={e => updateRequest(r.id, { finderRewardValue: e.target.value })} disabled={saving === r.id} /></td>
              <td className="py-3 flex flex-wrap gap-1">
                <button onClick={() => updateRequest(r.id, { isVerified: !r.isVerified })} className={btnOutline} disabled={saving === r.id}>{r.isVerified ? t('admin.unverify') : t('admin.verify')}</button>
                <button onClick={() => updateRequest(r.id, { featured: !r.featured })} className={btnOutline} disabled={saving === r.id}>{r.featured ? 'Unfeature' : 'Feature'}</button>
              </td>
            </tr>)}
          </tbody>
        </table>
        {!filteredRequests.length && <div className="mt-6 text-sm text-[#6b665d]">{t('admin.noData')}</div>}
      </div>}

      {/* Matches */}
      {!loading && tab === 'matches' && <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-[13px]">
          <thead><tr className="border-b border-[#d4cdc1] text-[10px] uppercase tracking-wider text-[#948c7b]">
            <th className="py-3 pr-4">{t('admin.matchBusiness')}</th><th className="py-3 pr-4">{t('admin.matchRequest')}</th><th className="py-3 pr-4">{t('admin.matchStatus')}</th><th className="py-3">{t('admin.actions')}</th>
          </tr></thead>
          <tbody className="divide-y divide-[#e0d9ce]">
            {filteredMatches.map(m => <tr key={m.id}>
              <td className="py-3 pr-4 max-w-[200px] truncate">{m.businessName || <span className="text-[#918a7c]">—</span>}</td>
              <td className="py-3 pr-4 font-mono-label text-[10px] text-[#827968]">{m.requestId.slice(0, 8)}…</td>
              <td className="py-3 pr-4"><select className={field} value={m.status} onChange={e => updateMatch(m.id, { status: e.target.value })} disabled={saving === m.id}><option value="submitted">submitted</option><option value="under_review">under_review</option><option value="qualified">qualified</option><option value="buyer_interested">buyer_interested</option><option value="declined">declined</option><option value="closed">closed</option></select></td>
              <td className="py-3 text-[12px] text-[#827968]">{new Date(m.createdAt).toLocaleDateString()}</td>
            </tr>)}
          </tbody>
        </table>
        {!filteredMatches.length && <div className="mt-6 text-sm text-[#6b665d]">{t('admin.noData')}</div>}
      </div>}

      {/* Finder Referrals */}
      {!loading && tab === 'referrals' && <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-[13px]">
          <thead><tr className="border-b border-[#d4cdc1] text-[10px] uppercase tracking-wider text-[#948c7b]">
            <th className="py-3 pr-4">{t('admin.referralListing')}</th><th className="py-3 pr-4">{t('admin.referralFinder')}</th><th className="py-3 pr-4">{t('admin.referralBuyer')}</th><th className="py-3 pr-4">{t('admin.referralContact')}</th><th className="py-3 pr-4">{t('admin.referralStatus')}</th><th className="py-3 pr-4">{t('admin.referralDate')}</th>
          </tr></thead>
          <tbody className="divide-y divide-[#e0d9ce]">
            {referrals.filter(r => !search || r.finderName.toLowerCase().includes(search.toLowerCase()) || r.buyerName.toLowerCase().includes(search.toLowerCase()) || r.listingTitle.toLowerCase().includes(search.toLowerCase())).map(r => <tr key={r.id}>
              <td className="py-3 pr-4 max-w-[180px] truncate">{r.listingTitle}</td>
              <td className="py-3 pr-4">{r.finderName}<br/><span className="text-[10px] text-[#918a7c]">{r.finderEmail}</span></td>
              <td className="py-3 pr-4">{r.buyerName}</td>
              <td className="py-3 pr-4 text-[12px]">{r.buyerContact}</td>
              <td className="py-3 pr-4"><select className={field} value={r.status} onChange={e => updateReferral(r.id, { status: e.target.value })} disabled={saving === r.id}>
                <option value="new">{t('admin.referralStatusNew')}</option>
                <option value="under_review">{t('admin.referralStatusReview')}</option>
                <option value="qualified">{t('admin.referralStatusQualified')}</option>
                <option value="introduction_made">{t('admin.referralStatusIntro')}</option>
                <option value="deal_in_progress">{t('admin.referralStatusProgress')}</option>
                <option value="closed_won">{t('admin.referralStatusWon')}</option>
                <option value="closed_lost">{t('admin.referralStatusLost')}</option>
                <option value="commission_paid">{t('admin.referralStatusPaid')}</option>
              </select></td>
              <td className="py-3 pr-4 text-[12px] text-[#827968]">{new Date(r.createdAt).toLocaleDateString()}</td>
            </tr>)}
          </tbody>
        </table>
        {!referrals.length && <div className="mt-6 text-sm text-[#6b665d]">{t('admin.noData')}</div>}
      </div>}
    </div>
  </PublicLayout>;
}
