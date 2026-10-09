import { useState } from 'react';
import { X, Loader2, Check } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';

type Listing = {
  id: string;
  title: string;
  location: string;
};

export function ReferBuyerModal({
  listing,
  onClose,
}: {
  listing: Listing;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    finderName: '',
    finderEmail: '',
    buyerName: '',
    buyerContact: '',
    notes: '',
    consent: false,
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.consent) return;
    setStatus('submitting');
    setErrorMsg('');
    try {
      const resp = await fetch('/api/finder-referrals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listingId: listing.id,
          listingTitle: listing.title,
          ...form,
        }),
      });
      const data = await resp.json();
      if (resp.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMsg(data.error || t('referral.error'));
      }
    } catch {
      setStatus('error');
      setErrorMsg(t('referral.error'));
    }
  }

  const field = 'h-11 w-full border border-[#cfc8bc] bg-[#fbfaf7] px-3 text-[14px] outline-none transition focus:border-[#9a8352]';
  const label = 'mb-1.5 block font-mono-label text-[10px] uppercase tracking-[.12em] text-[#625d53]';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto border border-[#cfc8bc] bg-[#f5f2eb] p-6 md:p-8"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute right-4 top-4 text-[#918a7c] hover:text-[#38352f]" aria-label="Close">
          <X size={20} />
        </button>

        {status === 'success' ? (
          <div className="py-8 text-center">
            <div className="mx-auto grid size-14 place-items-center border border-[#b9a16d] text-[#8a7547]">
              <Check size={22} />
            </div>
            <h3 className="font-editorial mt-5 text-3xl">{t('referral.submittedTitle')}</h3>
            <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-[#6b665d]">{t('referral.submittedBody')}</p>
            <button onClick={onClose} className="mt-6 inline-flex h-11 items-center gap-2 bg-[#38352f] px-6 text-xs uppercase tracking-wider text-[#f5f2eb]">
              {t('referral.close')}
            </button>
          </div>
        ) : (
          <>
            <h3 className="font-editorial text-3xl tracking-[-.02em]">{t('referral.title')}</h3>
            <p className="mt-2 text-sm text-[#6b665d]">{t('referral.subtitle')}</p>
            <div className="mt-3 border-l-2 border-[#b9a16d] bg-[#eeebe3] px-4 py-2 text-[12px] text-[#625d53]">
              <span className="font-mono-label text-[9px] uppercase tracking-[.12em] text-[#8c794d]">{t('referral.listing')}</span>
              <p className="mt-1 font-medium">{listing.title} — {listing.location}</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className={label}>{t('referral.finderName')} *</span>
                  <input className={field} required value={form.finderName} onChange={e => setForm({ ...form, finderName: e.target.value })} />
                </label>
                <label className="block">
                  <span className={label}>{t('referral.finderEmail')} *</span>
                  <input type="email" className={field} required value={form.finderEmail} onChange={e => setForm({ ...form, finderEmail: e.target.value })} />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className={label}>{t('referral.buyerName')} *</span>
                  <input className={field} required value={form.buyerName} onChange={e => setForm({ ...form, buyerName: e.target.value })} />
                </label>
                <label className="block">
                  <span className={label}>{t('referral.buyerContact')} *</span>
                  <input className={field} required placeholder={t('referral.buyerContactPlaceholder')} value={form.buyerContact} onChange={e => setForm({ ...form, buyerContact: e.target.value })} />
                </label>
              </div>
              <label className="block">
                <span className={label}>{t('referral.notes')}</span>
                <textarea className="min-h-20 w-full border border-[#cfc8bc] bg-[#fbfaf7] px-3 py-2 text-[14px] outline-none transition focus:border-[#9a8352]" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
              </label>
              <label className="flex items-start gap-3 text-[12px] leading-5 text-[#625d53]">
                <input type="checkbox" className="mt-1" required checked={form.consent} onChange={e => setForm({ ...form, consent: e.target.checked })} />
                <span>{t('referral.consentText')}</span>
              </label>

              {status === 'error' && (
                <div className="border border-[#d7c3b8] bg-[#f8f2ed] p-3 text-sm text-[#815d4f]">{errorMsg}</div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting' || !form.consent}
                className="inline-flex h-12 w-full items-center justify-center gap-2 bg-[#38352f] px-6 text-xs uppercase tracking-wider text-[#f5f2eb] transition hover:bg-[#504b40] disabled:opacity-50"
              >
                {status === 'submitting' && <Loader2 size={14} className="animate-spin" />}
                {status === 'submitting' ? t('referral.submitting') : t('referral.submit')}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
