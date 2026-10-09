import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const field = 'h-10 w-full border border-[#cfc8bc] bg-[#fbfaf7] px-3 text-[13px] outline-none transition focus:border-[#9a8352]';
const label = 'font-mono-label text-[9px] uppercase tracking-[.15em] text-[#8c8475]';

export type EditableRequest = {
  id: string;
  title: string;
  industry: string;
  businessCategory: string;
  buyerType: string;
  country: string;
  region: string | null;
  city: string | null;
  radiusMiles: number | null;
  remoteAccepted: boolean;
  minimumPurchasePrice: number | null;
  maximumPurchasePrice: number | null;
  minimumRevenue: number | null;
  minimumEbitda: number | null;
  minimumCashFlow: number | null;
  preferredProfile: string;
  dealExclusions: string;
  timeline: string;
  rewardDisclosure: string;
  privacy: string;
  finderRewardType: string | null;
  finderRewardValue: string | null;
};

export type EditableListing = {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  askingPrice: number;
  annualRevenue: number;
  finderFee: number;
};

type Props = {
  type: 'request' | 'listing';
  data: EditableRequest | EditableListing;
  onSave: (id: string, updates: Record<string, unknown>) => Promise<void>;
  onClose: () => void;
};

export function AdminEditModal({ type, data, onSave, onClose }: Props) {
  const [form, setForm] = useState<Record<string, unknown>>(data);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(data);
  }, [data]);

  const set = (key: string, value: unknown) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    const updates: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(form)) {
      if (data[key as keyof typeof data] !== value) {
        updates[key] = value;
      }
    }
    if (Object.keys(updates).length > 0) {
      await onSave(data.id, updates);
    }
    setSaving(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 pt-10" onClick={onClose}>
      <div className="w-full max-w-2xl border border-[#d4cdc1] bg-[#f5f2eb] p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-[#d4cdc1] pb-3">
          <h3 className="font-editorial text-2xl">{type === 'request' ? 'Edit Request' : 'Edit Listing'}</h3>
          <button onClick={onClose} className="text-[#6b665d] hover:text-[#38352f]"><X size={18} /></button>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {type === 'request' ? (
            <>
              <div className="sm:col-span-2"><label className={label}>Title</label><input className={`${field} mt-2`} value={form.title as string ?? ''} onChange={e => set('title', e.target.value)} /></div>
              <div><label className={label}>Industry</label><input className={`${field} mt-2`} value={form.industry as string ?? ''} onChange={e => set('industry', e.target.value)} /></div>
              <div><label className={label}>Business Category</label><input className={`${field} mt-2`} value={form.businessCategory as string ?? ''} onChange={e => set('businessCategory', e.target.value)} /></div>
              <div><label className={label}>Buyer Type</label><input className={`${field} mt-2`} value={form.buyerType as string ?? ''} onChange={e => set('buyerType', e.target.value)} /></div>
              <div><label className={label}>Country</label><input className={`${field} mt-2`} value={form.country as string ?? ''} onChange={e => set('country', e.target.value)} /></div>
              <div><label className={label}>Region</label><input className={`${field} mt-2`} value={form.region as string ?? ''} onChange={e => set('region', e.target.value || null)} /></div>
              <div><label className={label}>City</label><input className={`${field} mt-2`} value={form.city as string ?? ''} onChange={e => set('city', e.target.value || null)} /></div>
              <div><label className={label}>Radius (miles)</label><input type="number" className={`${field} mt-2`} value={form.radiusMiles as number ?? ''} onChange={e => set('radiusMiles', e.target.value ? Number(e.target.value) : null)} /></div>
              <div><label className={label}>Remote Accepted</label><select className={`${field} mt-2`} value={form.remoteAccepted ? 'true' : 'false'} onChange={e => set('remoteAccepted', e.target.value === 'true')}><option value="false">No</option><option value="true">Yes</option></select></div>
              <div><label className={label}>Min Price</label><input type="number" className={`${field} mt-2`} value={form.minimumPurchasePrice as number ?? ''} onChange={e => set('minimumPurchasePrice', e.target.value ? Number(e.target.value) : null)} /></div>
              <div><label className={label}>Max Price</label><input type="number" className={`${field} mt-2`} value={form.maximumPurchasePrice as number ?? ''} onChange={e => set('maximumPurchasePrice', e.target.value ? Number(e.target.value) : null)} /></div>
              <div><label className={label}>Min Revenue</label><input type="number" className={`${field} mt-2`} value={form.minimumRevenue as number ?? ''} onChange={e => set('minimumRevenue', e.target.value ? Number(e.target.value) : null)} /></div>
              <div><label className={label}>Min EBITDA</label><input type="number" className={`${field} mt-2`} value={form.minimumEbitda as number ?? ''} onChange={e => set('minimumEbitda', e.target.value ? Number(e.target.value) : null)} /></div>
              <div><label className={label}>Min Cash Flow</label><input type="number" className={`${field} mt-2`} value={form.minimumCashFlow as number ?? ''} onChange={e => set('minimumCashFlow', e.target.value ? Number(e.target.value) : null)} /></div>
              <div><label className={label}>Timeline</label><input className={`${field} mt-2`} value={form.timeline as string ?? ''} onChange={e => set('timeline', e.target.value)} /></div>
              <div><label className={label}>Privacy</label><select className={`${field} mt-2`} value={form.privacy as string ?? 'public'} onChange={e => set('privacy', e.target.value)}><option value="public">public</option><option value="members_only">members_only</option><option value="nda_required">nda_required</option><option value="private">private</option></select></div>
              <div><label className={label}>Reward Type</label><select className={`${field} mt-2`} value={form.finderRewardType as string ?? ''} onChange={e => set('finderRewardType', e.target.value || null)}><option value="">None</option><option value="fixed">Fixed</option><option value="percentage">Percentage</option><option value="custom">Custom</option></select></div>
              <div><label className={label}>Reward Value</label><input className={`${field} mt-2`} value={form.finderRewardValue as string ?? ''} onChange={e => set('finderRewardValue', e.target.value || null)} /></div>
              <div className="sm:col-span-2"><label className={label}>Preferred Profile</label><textarea className={`${field} mt-2 min-h-[80px]`} value={form.preferredProfile as string ?? ''} onChange={e => set('preferredProfile', e.target.value)} /></div>
              <div className="sm:col-span-2"><label className={label}>Deal Exclusions</label><textarea className={`${field} mt-2 min-h-[60px]`} value={form.dealExclusions as string ?? ''} onChange={e => set('dealExclusions', e.target.value)} /></div>
              <div className="sm:col-span-2"><label className={label}>Reward Disclosure</label><textarea className={`${field} mt-2 min-h-[60px]`} value={form.rewardDisclosure as string ?? ''} onChange={e => set('rewardDisclosure', e.target.value)} /></div>
            </>
          ) : (
            <>
              <div className="sm:col-span-2"><label className={label}>Title</label><input className={`${field} mt-2`} value={form.title as string ?? ''} onChange={e => set('title', e.target.value)} /></div>
              <div className="sm:col-span-2"><label className={label}>Description</label><textarea className={`${field} mt-2 min-h-[80px]`} value={form.description as string ?? ''} onChange={e => set('description', e.target.value)} /></div>
              <div><label className={label}>Category</label><input className={`${field} mt-2`} value={form.category as string ?? ''} onChange={e => set('category', e.target.value)} /></div>
              <div><label className={label}>Location</label><input className={`${field} mt-2`} value={form.location as string ?? ''} onChange={e => set('location', e.target.value)} /></div>
              <div><label className={label}>Asking Price</label><input type="number" className={`${field} mt-2`} value={form.askingPrice as number ?? ''} onChange={e => set('askingPrice', Number(e.target.value))} /></div>
              <div><label className={label}>Annual Revenue</label><input type="number" className={`${field} mt-2`} value={form.annualRevenue as number ?? ''} onChange={e => set('annualRevenue', Number(e.target.value))} /></div>
              <div><label className={label}>Finder Fee</label><input type="number" className={`${field} mt-2`} value={form.finderFee as number ?? ''} onChange={e => set('finderFee', Number(e.target.value))} /></div>
            </>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="inline-flex h-9 items-center px-4 text-[11px] uppercase tracking-wider border border-[#cfc8bc] text-[#38352f] hover:border-[#9a8352]">Cancel</button>
          <button onClick={handleSave} disabled={saving} className="inline-flex h-9 items-center px-4 text-[11px] uppercase tracking-wider bg-[#38352f] text-[#f5f2eb] hover:bg-[#504b40] disabled:opacity-50">{saving ? 'Saving…' : 'Save Changes'}</button>
        </div>
      </div>
    </div>
  );
}
