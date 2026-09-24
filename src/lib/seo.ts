import type { BioData } from './schemas/bio.schema';
import type { SeriesItem } from './schemas/series.schema';
import type { TallerItem } from './schemas/talleres.schema';
import type { KitItem } from './schemas/kit.schema';

export interface SeoConfig {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
}

export const DEFAULT_SEO = {
  siteName: 'Mila González | Collage & Ilustración Artística',
  titleName: 'Mila González - Artista Visual e Ilustradora de Collage',
  description:
    'Portafolio artístico de Mila González. Obra en collage análogo, talleres presenciales y online en Coquimbo, Chile, y proyectos editoriales.',
  siteUrl: 'https://ejemplo-collage-portfolio.netlify.app',
  ogImage: '/placeholder-collage-1.svg',
  author: 'Mila González',
  twitterHandle: '@milagonzalez_art',
};

export function buildSeoMeta(config: SeoConfig = {}) {
  const title = config.title
    ? `${config.title} | Mila González Collage`
    : DEFAULT_SEO.titleName;
  const description = config.description || DEFAULT_SEO.description;
  const canonical = config.canonical || DEFAULT_SEO.siteUrl;
  const ogImage = config.ogImage || DEFAULT_SEO.ogImage;
  const ogType = config.ogType || 'website';
  const noindex = config.noindex || false;

  return {
    title,
    description,
    canonical,
    ogImage,
    ogType,
    noindex,
  };
}

export function generatePersonJsonLd(bio: BioData) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: bio.name,
    jobTitle: bio.title,
    description: bio.bio_summary,
    homeLocation: bio.location,
    image: bio.avatar_url,
    url: DEFAULT_SEO.siteUrl,
    knowsAbout: ['Collage Art', 'Analog Illustration', 'Botanical Art', 'Mixed Media'],
  });
}

export function generateArtworksJsonLd(series: SeriesItem[]) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: series.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'VisualArtwork',
        name: item.title,
        artMedium: item.technique,
        artform: 'Collage',
        dateCreated: item.year,
        description: item.description,
        image: item.cover_image,
      },
    })),
  });
}

export function generateEventsJsonLd(talleres: TallerItem[]) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: talleres.map((taller, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'EducationEvent',
        name: taller.title,
        startDate: taller.date,
        location: {
          '@type': 'Place',
          name: taller.modality,
        },
        description: taller.description,
        image: taller.image,
        offers: {
          '@type': 'Offer',
          availability: taller.available
            ? 'https://schema.org/InStock'
            : 'https://schema.org/SoldOut',
          url: taller.registration_url,
        },
      },
    })),
  });
}

export function generateProductsJsonLd(kits: KitItem[]) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: kits.map((kit, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: kit.title,
        category: kit.category,
        description: kit.description,
        image: kit.image,
        offers: {
          '@type': 'Offer',
          availability: kit.in_stock
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
          url: kit.purchase_url,
        },
      },
    })),
  });
}
