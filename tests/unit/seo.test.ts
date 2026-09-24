import { describe, it, expect } from 'vitest';
import {
  buildSeoMeta,
  generatePersonJsonLd,
  generateArtworksJsonLd,
  generateEventsJsonLd,
  generateProductsJsonLd,
  DEFAULT_SEO,
} from '@/lib/seo';
import { INITIAL_BIO, INITIAL_SERIES, INITIAL_TALLERES, INITIAL_KITS } from '@/lib/contentStore';

describe('SEO & Schema.org Utilities', () => {
  it('builds default SEO metadata', () => {
    const meta = buildSeoMeta();
    expect(meta.title).toBe(DEFAULT_SEO.titleName);
    expect(meta.description).toBe(DEFAULT_SEO.description);
    expect(meta.canonical).toBe(DEFAULT_SEO.siteUrl);
    expect(meta.noindex).toBe(false);
  });

  it('builds custom SEO metadata overrides', () => {
    const meta = buildSeoMeta({
      title: 'Título de Prueba',
      description: 'Descripción de prueba',
      canonical: 'https://ejemplo.com/custom',
      noindex: true,
    });
    expect(meta.title).toBe('Título de Prueba | Mila González Collage');
    expect(meta.description).toBe('Descripción de prueba');
    expect(meta.canonical).toBe('https://ejemplo.com/custom');
    expect(meta.noindex).toBe(true);
  });

  it('generates Person JSON-LD schema', () => {
    const jsonStr = generatePersonJsonLd(INITIAL_BIO);
    const obj = JSON.parse(jsonStr);
    expect(obj['@type']).toBe('Person');
    expect(obj.name).toBe(INITIAL_BIO.name);
    expect(obj.jobTitle).toBe(INITIAL_BIO.title);
  });

  it('generates Artworks ItemList JSON-LD schema', () => {
    const jsonStr = generateArtworksJsonLd(INITIAL_SERIES);
    const obj = JSON.parse(jsonStr);
    expect(obj['@type']).toBe('ItemList');
    expect(obj.itemListElement.length).toBe(INITIAL_SERIES.length);
    expect(obj.itemListElement[0].item['@type']).toBe('VisualArtwork');
  });

  it('generates EducationEvents ItemList JSON-LD schema', () => {
    const jsonStr = generateEventsJsonLd(INITIAL_TALLERES);
    const obj = JSON.parse(jsonStr);
    expect(obj['@type']).toBe('ItemList');
    expect(obj.itemListElement[0].item['@type']).toBe('EducationEvent');
  });

  it('generates Products ItemList JSON-LD schema', () => {
    const jsonStr = generateProductsJsonLd(INITIAL_KITS);
    const obj = JSON.parse(jsonStr);
    expect(obj['@type']).toBe('ItemList');
    expect(obj.itemListElement[0].item['@type']).toBe('Product');
  });
});

