import { describe, it, expect } from 'vitest';
import { BioSchema } from '@/lib/schemas/bio.schema';
import { StatementSchema } from '@/lib/schemas/statement.schema';
import { SeriesItemSchema } from '@/lib/schemas/series.schema';
import { TallerItemSchema } from '@/lib/schemas/talleres.schema';
import { KitItemSchema } from '@/lib/schemas/kit.schema';
import { ContactInfoSchema, ContactFormSchema } from '@/lib/schemas/contact.schema';
import { AuthLoginSchema } from '@/lib/schemas/auth.schema';

describe('Zod Validation Schemas', () => {
  it('validates BioSchema correctly', () => {
    const validBio = {
      name: 'Mila González',
      title: 'Ilustradora',
      bio_summary: 'Esta es una biografía de prueba con suficiente longitud.',
      location: 'Coquimbo, Chile',
      experience: '10 años de trayectoria artística.',
      avatar_url: '/placeholder-artist.svg',
    };
    expect(BioSchema.safeParse(validBio).success).toBe(true);

    const invalidBio = { name: 'M' };
    expect(BioSchema.safeParse(invalidBio).success).toBe(false);
  });

  it('validates StatementSchema correctly', () => {
    const validStatement = {
      quote: 'Cita artística profunda sobre el collage.',
      paragraphs: ['Párrafo explicativo 1 con suficiente texto.', 'Párrafo 2.'],
    };
    expect(StatementSchema.safeParse(validStatement).success).toBe(true);

    const invalidStatement = { quote: '', paragraphs: [] };
    expect(StatementSchema.safeParse(invalidStatement).success).toBe(false);
  });

  it('validates SeriesItemSchema correctly', () => {
    const validSeries = {
      id: 's1',
      title: 'Herbarium',
      year: '2025',
      description: 'Descripción detallada de la serie de collage.',
      technique: 'Collage Análogo',
      cover_image: '/placeholder-collage-1.svg',
    };
    expect(SeriesItemSchema.safeParse(validSeries).success).toBe(true);

    const invalidSeries = { id: '', title: 'A' };
    expect(SeriesItemSchema.safeParse(invalidSeries).success).toBe(false);
  });

  it('validates TallerItemSchema correctly', () => {
    const validTaller = {
      id: 't1',
      title: 'Taller de Collage Análogo',
      date: 'Sábado 18 de Octubre',
      modality: 'Presencial',
      duration: '4 horas',
      description: 'Descripción completa del taller intensivo.',
      includes: ['Materiales vintage', 'Bisturí'],
      registration_url: '#contacto',
      image: '/placeholder-collage-1.svg',
    };
    expect(TallerItemSchema.safeParse(validTaller).success).toBe(true);

    const invalidTaller = { id: 't1', title: 'A' };
    expect(TallerItemSchema.safeParse(invalidTaller).success).toBe(false);
  });

  it('validates KitItemSchema correctly', () => {
    const validKit = {
      id: 'k1',
      title: 'Kit Botánico',
      category: 'Materiales',
      description: 'Papeles vintage variados.',
      image: '/placeholder-collage-3.svg',
      purchase_url: '#contacto',
    };
    expect(KitItemSchema.safeParse(validKit).success).toBe(true);

    const invalidKit = { id: '' };
    expect(KitItemSchema.safeParse(invalidKit).success).toBe(false);
  });

  it('validates ContactInfoSchema and ContactFormSchema correctly', () => {
    const validContactInfo = {
      email: 'hola@milagonzalezcollage.art',
      location: 'Coquimbo, Chile',
      social_links: {
        instagram: 'https://instagram.com',
        behance: 'https://behance.net',
        pinterest: 'https://pinterest.com',
        linkedin: 'https://linkedin.com',
      },
    };
    expect(ContactInfoSchema.safeParse(validContactInfo).success).toBe(true);

    const validForm = {
      name: 'María Gómez',
      email: 'maria@ejemplo.com',
      subject: 'Encargo de obra',
      message: 'Hola, me gustaría encargar una ilustración personalizada.',
    };
    expect(ContactFormSchema.safeParse(validForm).success).toBe(true);

    const invalidForm = { name: 'M', email: 'invalid-email' };
    expect(ContactFormSchema.safeParse(invalidForm).success).toBe(false);
  });

  it('validates AuthLoginSchema correctly', () => {
    const validAuth = { email: 'admin@milagonzalezcollage.art', password: 'SuperSecretPass123!' };
    expect(AuthLoginSchema.safeParse(validAuth).success).toBe(true);

    const invalidAuth = { email: 'invalid', password: '123' };
    expect(AuthLoginSchema.safeParse(invalidAuth).success).toBe(false);
  });
});

