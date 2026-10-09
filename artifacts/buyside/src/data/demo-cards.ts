import type { Lang } from '@/i18n/translations';

export type DemoCard = {
  id: string;
  category: { en: string; es: string };
  title: { en: string; es: string };
  description: { en: string; es: string };
  budget?: { en: string; es: string };
  location: { en: string; es: string };
};

export const demoCards: DemoCard[] = [
  {
    id: 'demo-business-acquisition',
    category: { en: 'Business Acquisition', es: 'Adquisición de Negocio' },
    title: { en: 'Profitable HVAC Company', es: 'Empresa HVAC Rentable' },
    description: {
      en: 'Looking to acquire an established HVAC company in South Florida.',
      es: 'Buscando adquirir una empresa HVAC establecida en el sur de Florida.',
    },
    budget: { en: '$1M–$3M', es: '$1M–$3M' },
    location: { en: 'South Florida', es: 'Sur de Florida' },
  },
  {
    id: 'demo-find-buyer',
    category: { en: 'Find a Buyer', es: 'Encontrar un Comprador' },
    title: { en: 'Buyer for Miami Service Business', es: 'Comprador para Empresa de Servicios en Miami' },
    description: {
      en: 'Seeking qualified buyers for an established Miami-based service company.',
      es: 'Buscando compradores calificados para una empresa de servicios establecida en Miami.',
    },
    location: { en: 'Miami, Florida', es: 'Miami, Florida' },
  },
  {
    id: 'demo-product-sourcing',
    category: { en: 'Product Sourcing', es: 'Búsqueda de Productos' },
    title: { en: 'Hospitality Furniture Supplier', es: 'Proveedor de Mobiliario para Hospitalidad' },
    description: {
      en: 'Looking for a U.S. supplier of premium furniture for hospitality projects.',
      es: 'Buscando un proveedor en Estados Unidos de mobiliario premium para proyectos de hospitalidad.',
    },
    location: { en: 'United States', es: 'Estados Unidos' },
  },
  {
    id: 'demo-find-service',
    category: { en: 'Find a Service', es: 'Encontrar un Servicio' },
    title: { en: 'Commercial Cleaning Provider', es: 'Proveedor de Limpieza Comercial' },
    description: {
      en: 'Seeking a reliable commercial cleaning company for multiple properties.',
      es: 'Buscando una empresa confiable de limpieza comercial para múltiples propiedades.',
    },
    location: { en: 'Miami, Florida', es: 'Miami, Florida' },
  },
  {
    id: 'demo-find-client',
    category: { en: 'Find a Client', es: 'Encontrar un Cliente' },
    title: { en: 'Hospitality Clients', es: 'Clientes de Hospitalidad' },
    description: {
      en: 'Marketing agency looking to connect with hotels, restaurants, and hospitality businesses.',
      es: 'Agencia de marketing buscando conectar con hoteles, restaurantes y negocios de hospitalidad.',
    },
    location: { en: 'South Florida', es: 'Sur de Florida' },
  },
  {
    id: 'demo-special-opportunity',
    category: { en: 'Special Opportunity', es: 'Oportunidad Especial' },
    title: { en: 'Off-Market Luxury Vehicle', es: 'Vehículo de Lujo Fuera de Mercado' },
    description: {
      en: 'Private buyer seeking a specific luxury vehicle that may not be publicly listed.',
      es: 'Comprador privado buscando un vehículo de lujo específico que podría no estar listado públicamente.',
    },
    location: { en: 'United States', es: 'Estados Unidos' },
  },
];

export function getDemoCard(card: DemoCard, lang: Lang) {
  return {
    id: card.id,
    category: card.category[lang],
    title: card.title[lang],
    description: card.description[lang],
    budget: card.budget?.[lang],
    location: card.location[lang],
  };
}
