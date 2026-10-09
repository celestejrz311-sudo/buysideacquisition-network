import { useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageProvider';

type SeoKey =
  | 'home' | 'marketplace' | 'membership' | 'services' | 'howItWorks'
  | 'opportunities' | 'requests' | 'forBuyers' | 'forFinders'
  | 'privateNetwork' | 'confidentiality' | 'contact' | 'search';

const seoData: Record<SeoKey, { title: { en: string; es: string }; description: { en: string; es: string } }> = {
  home: {
    title: { en: 'BuySide — Buy and Sell Businesses Without Middlemen', es: 'BuySide — Compra y Vende Negocios Sin Intermediarios' },
    description: {
      en: 'A private marketplace for buying and selling businesses. Discreet, qualified introductions — no expensive brokers required.',
      es: 'Un mercado privado para comprar y vender negocios. Presentaciones discretas y calificadas — sin corredores caros.',
    },
  },
  marketplace: {
    title: { en: 'Marketplace — Browse Business Opportunities | BuySide', es: 'Mercado — Explora Oportunidades de Negocios | BuySide' },
    description: {
      en: 'Browse buyer requests and business opportunities across the United States. Submit a match or post your own request.',
      es: 'Explora solicitudes de compradores y oportunidades de negocios en todo Estados Unidos. Envía una coincidencia o publica tu propia solicitud.',
    },
  },
  membership: {
    title: { en: 'Membership Plans — Transparent Pricing | BuySide', es: 'Planes de Membresía — Precios Transparentes | BuySide' },
    description: {
      en: 'Choose from four plans: Free, Starter ($19/mo), Finder Pro ($49/mo), and Private Network (Request Access). No transaction percentages.',
      es: 'Elige entre cuatro planes: Gratis, Starter ($19/mes), Finder Pro ($49/mes) y Private Network (Solicitar Acceso). Sin porcentajes de transacción.',
    },
  },
  services: {
    title: { en: 'Services — Find Business Services | BuySide', es: 'Servicios — Encuentra Servicios Empresariales | BuySide' },
    description: {
      en: 'Find professional and business services. Post a request and connect with qualified providers.',
      es: 'Encuentra servicios profesionales y empresariales. Publica una solicitud y conéctate con proveedores calificados.',
    },
  },
  howItWorks: {
    title: { en: 'How It Works — Discover, Connect, Close | BuySide', es: 'Cómo Funciona — Descubre, Conecta, Cierra | BuySide' },
    description: {
      en: 'Four simple steps: Discover Opportunities, Request Introduction, Get Approved, Connect Privately. The $99 fee applies only when you accept a match.',
      es: 'Cuatro pasos simples: Descubrir Oportunidades, Solicitar Presentación, Ser Aprobado, Conectar Privadamente. La tarifa de $99 aplica solo al aceptar una coincidencia.',
    },
  },
  opportunities: {
    title: { en: 'Opportunities — Business Acquisition Opportunities | BuySide', es: 'Oportunidades — Oportunidades de Adquisición de Negocios | BuySide' },
    description: {
      en: 'Browse business acquisition opportunities and buyer requests. Find your next deal.',
      es: 'Explora oportunidades de adquisición de negocios y solicitudes de compradores. Encuentra tu próxima oportunidad.',
    },
  },
  requests: {
    title: { en: 'Requests — Buyer Request Marketplace | BuySide', es: 'Solicitudes — Mercado de Solicitudes de Compradores | BuySide' },
    description: {
      en: 'Browse public buyer requests for businesses, services, and products. Submit a match if you have what they need.',
      es: 'Explora solicitudes públicas de compradores de negocios, servicios y productos. Envía una coincidencia si tienes lo que necesitan.',
    },
  },
  forBuyers: {
    title: { en: 'For Buyers — Post Acquisition Criteria | BuySide', es: 'Para Compradores — Publica Criterios de Adquisición | BuySide' },
    description: {
      en: 'Post your acquisition criteria discreetly. Receive qualified matches without broadcasting your identity.',
      es: 'Publica tus criterios de adquisición discretamente. Recibe coincidencias calificadas sin difundir tu identidad.',
    },
  },
  forFinders: {
    title: { en: 'For Finders — Submit Business Matches | BuySide', es: 'Para Buscadores — Envía Coincidencias de Negocios | BuySide' },
    description: {
      en: 'Browse buyer requests and submit a match when you have what someone is looking for. Brokers, owners, and advisors welcome.',
      es: 'Explora solicitudes de compradores y envía una coincidencia cuando tengas lo que alguien busca. Corredores, propietarios y asesores bienvenidos.',
    },
  },
  privateNetwork: {
    title: { en: 'Private Network — Off-Market Deal Flow | BuySide', es: 'Private Network — Oportunidades Fuera de Mercado | BuySide' },
    description: {
      en: 'A private network for principals seeking off-market deal flow and exclusive introductions.',
      es: 'Una red privada para principales que buscan oportunidades fuera de mercado y presentaciones exclusivas.',
    },
  },
  confidentiality: {
    title: { en: 'Confidentiality — Private by Design | BuySide', es: 'Confidencialidad — Privado por Diseño | BuySide' },
    description: {
      en: 'How BuySide protects your information with controlled disclosure, verified members, and private introductions.',
      es: 'Cómo BuySide protege tu información con divulgación controlada, miembros verificados y presentaciones privadas.',
    },
  },
  contact: {
    title: { en: 'Contact BuySide', es: 'Contacto BuySide' },
    description: {
      en: 'Get in touch with the BuySide team.',
      es: 'Ponte en contacto con el equipo de BuySide.',
    },
  },
  search: {
    title: { en: 'Smart Search — Find Businesses, Requests & Services | BuySide', es: 'Búsqueda Inteligente — Encuentra Negocios, Solicitudes y Servicios | BuySide' },
    description: {
      en: 'Search the entire BuySide network. Filter by industry, location, price, and opportunity type. Find businesses, buyer requests, and matches.',
      es: 'Busca en toda la red BuySide. Filtra por industria, ubicación, precio y tipo de oportunidad. Encuentra negocios, solicitudes y coincidencias.',
    },
  },
};

export function useSeo(key: SeoKey) {
  const { lang } = useLanguage();

  useEffect(() => {
    const data = seoData[key];
    if (!data) return;
    document.title = data.title[lang];

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', data.description[lang]);
  }, [key, lang]);
}
