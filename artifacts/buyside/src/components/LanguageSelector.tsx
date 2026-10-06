import { useLanguage } from '@/i18n/LanguageProvider';

export function LanguageSelector({ light = false }: { light?: boolean }) {
  const { lang, setLang } = useLanguage();
  const active = light ? 'bg-[#b9a16d] text-[#25241f]' : 'bg-[#38352f] text-[#f5f2eb]';
  const inactive = light ? 'text-[#a39e91] hover:text-[#eee9de]' : 'text-[#8b8478] hover:text-[#38352f]';
  const border = light ? 'border-[#41423b]' : 'border-[#cfc8bc]';

  return (
    <div className={`inline-flex items-center gap-0.5 border ${border} p-0.5`} data-testid="toggle-language-global">
      <button
        type="button"
        onClick={() => setLang('en')}
        className={`px-2 py-1 font-mono-label text-[10px] uppercase tracking-[.12em] transition-colors ${lang === 'en' ? active : inactive}`}
        data-testid="button-global-lang-en"
        aria-label="English"
      >
        EN
      </button>
      <span className={light ? 'text-[#41423b]' : 'text-[#cfc8bc]'}>|</span>
      <button
        type="button"
        onClick={() => setLang('es')}
        className={`px-2 py-1 font-mono-label text-[10px] uppercase tracking-[.12em] transition-colors ${lang === 'es' ? active : inactive}`}
        data-testid="button-global-lang-es"
        aria-label="Español"
      >
        ES
      </button>
    </div>
  );
}
