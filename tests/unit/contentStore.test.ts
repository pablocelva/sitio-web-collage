import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getBio,
  updateBio,
  getStatement,
  updateStatement,
  getSeries,
  saveSeriesItem,
  deleteSeriesItem,
  getTalleres,
  saveTallerItem,
  deleteTallerItem,
  getKits,
  saveKitItem,
  deleteKitItem,
  getContactInfo,
  updateContactInfo,
  addContactMessage,
  getContactMessages,
  _resetMockStore,
} from '@/lib/contentStore';

describe('Content Store Repository', () => {
  beforeEach(() => {
    _resetMockStore();
    vi.restoreAllMocks();
  });

  it('fetches and updates Bio data', async () => {
    const bio = await getBio();
    expect(bio.name).toBe('Mila González');

    const updated = await updateBio({
      ...bio,
      name: 'Valeria Silva Editada',
    });
    expect(updated.name).toBe('Valeria Silva Editada');

    const current = await getBio();
    expect(current.name).toBe('Valeria Silva Editada');
  });

  it('fetches and updates Statement data', async () => {
    const stmt = await getStatement();
    expect(stmt.quote).toBeDefined();

    const updated = await updateStatement({
      ...stmt,
      quote: 'Nueva cita de statement poético',
    });
    expect(updated.quote).toBe('Nueva cita de statement poético');
  });

  it('manages Series list items (get, save, delete)', async () => {
    const series = await getSeries();
    expect(series.length).toBeGreaterThan(0);

    const newItem = {
      id: 's-test-1',
      title: 'Serie Experimental',
      year: '2026',
      description: 'Collage de prueba para suite de vitest.',
      technique: 'Collage Análogo',
      cover_image: '/placeholder-collage-1.svg',
      gallery: [],
      display_order: 10,
      published: true,
    };

    await saveSeriesItem(newItem);
    let current = await getSeries();
    expect(current.some((s) => s.id === 's-test-1')).toBe(true);

    // Update existing item
    const modifiedItem = { ...newItem, title: 'Serie Modificada' };
    await saveSeriesItem(modifiedItem);
    current = await getSeries();
    expect(current.find((s) => s.id === 's-test-1')?.title).toBe('Serie Modificada');

    // Delete item
    await deleteSeriesItem('s-test-1');
    current = await getSeries();
    expect(current.some((s) => s.id === 's-test-1')).toBe(false);
  });

  it('manages Talleres list items (get, save, delete)', async () => {
    const talleres = await getTalleres();
    expect(talleres.length).toBeGreaterThan(0);

    const newTaller = {
      id: 't-test-1',
      title: 'Taller de Prueba',
      date: 'Mañana',
      modality: 'Online',
      duration: '2h',
      price: '$20 USD',
      description: 'Descripción del taller.',
      includes: ['Materiales'],
      registration_url: '#contacto',
      image: '/placeholder-collage-1.svg',
      available: true,
      display_order: 5,
    };

    await saveTallerItem(newTaller);
    let current = await getTalleres();
    expect(current.some((t) => t.id === 't-test-1')).toBe(true);

    await deleteTallerItem('t-test-1');
    current = await getTalleres();
    expect(current.some((t) => t.id === 't-test-1')).toBe(false);
  });

  it('manages Kit list items (get, save, delete)', async () => {
    const kits = await getKits();
    expect(kits.length).toBeGreaterThan(0);

    const newKit = {
      id: 'k-test-1',
      title: 'Kit de Prueba',
      category: 'Papeles',
      description: 'Set de papeles.',
      price: '$15 USD',
      image: '/placeholder-collage-2.svg',
      purchase_url: '#contacto',
      in_stock: true,
      display_order: 1,
    };

    await saveKitItem(newKit);
    let current = await getKits();
    expect(current.some((k) => k.id === 'k-test-1')).toBe(true);

    await deleteKitItem('k-test-1');
    current = await getKits();
    expect(current.some((k) => k.id === 'k-test-1')).toBe(false);
  });

  it('manages Contact Info and Contact Messages', async () => {
    const contactInfo = await getContactInfo();
    expect(contactInfo.email).toBe('hola@milagonzalezcollage.art');

    await updateContactInfo({
      ...contactInfo,
      email: 'nuevo@estudio.art',
    });
    const updatedInfo = await getContactInfo();
    expect(updatedInfo.email).toBe('nuevo@estudio.art');

    const messageForm = {
      name: 'Juan Pérez',
      email: 'juan@ejemplo.com',
      subject: 'Consulta de obra',
      message: 'Me interesa saber el precio de la serie Herbarium.',
    };

    const record = await addContactMessage(messageForm);
    expect(record.id).toBeDefined();
    expect(record.name).toBe('Juan Pérez');

    const messages = await getContactMessages();
    expect(messages.length).toBe(1);
    expect(messages[0].name).toBe('Juan Pérez');
  });

  it('handles Supabase getter fallback gracefully', async () => {
    const bio = await getBio();
    expect(bio).toBeDefined();
  });
});
