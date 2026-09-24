import { supabase, isSupabaseConfigured } from './supabase';
import type { BioData } from './schemas/bio.schema';
import type { StatementData } from './schemas/statement.schema';
import type { SeriesItem } from './schemas/series.schema';
import type { TallerItem } from './schemas/talleres.schema';
import type { KitItem } from './schemas/kit.schema';
import type { ContactInfoData, ContactFormData } from './schemas/contact.schema';

// Initial Seed Data for Mila González (Coquimbo, Chile)
export const INITIAL_BIO: BioData = {
  name: 'Mila González',
  title: 'Ilustradora & Artista Visual de Collage',
  bio_summary:
    'Exploro las fronteras entre el papel antiguo, la fotografía análoga y la narrativa botánica. Mi trabajo resignifica fragmentos olvidados para crear universos visuales etéreos y atemporales desde la costa de Coquimbo.',
  location: 'Coquimbo, Chile & Disponible Worldwide',
  experience: '10+ años creando collages para editoriales, marcas culturales y exposiciones internacionales.',
  avatar_url: '/placeholder-artist.svg',
};

export const INITIAL_STATEMENT: StatementData = {
  quote:
    'El collage no es simplemente cortar y pegar; es reensamblar la memoria y rescatar el residuo poético del mundo.',
  paragraphs: [
    'Mi práctica artística nace de la recolección paciente: revistas de botánica de los años 60, manuales de anatomía, cartas manuscritas e impresos litográficos. En mi estudio en Coquimbo, cada pieza es seleccionada minuciosamente por su textura, pátina y carga emotiva.',
    'Mediante yuxtaposiciones limpias y composiciones minimalistas sobre planos etéreos, busco dialogar con el vacío. El blanco alrededor de cada figura actúa como silencio en la música, permitiendo que las texturas dialoguen sin saturación.',
    'Exploro temas recurrentes como la metamorfosis de la naturaleza, la nostalgia del objeto físico en la era digital y la fragilidad de los recuerdos colectivos.',
  ],
};

export const INITIAL_SERIES: SeriesItem[] = [
  {
    id: 's1',
    title: 'Herbarium Inmaterial',
    year: '2025',
    description:
      'Serie de collages análogos inspirados en la botánica del siglo XIX y siluetas humanas que se funden con la flora silvestre.',
    technique: 'Collage Análogo en Papel Arches 300g',
    dimensions: '40 x 50 cm',
    cover_image: '/placeholder-collage-1.svg',
    gallery: ['/placeholder-collage-1.svg', '/placeholder-collage-2.svg'],
    display_order: 1,
    published: true,
  },
  {
    id: 's2',
    title: 'Geometría del Olvido',
    year: '2024',
    description:
      'Exploración de la nostalgia y la arquitectura urbana a través de fragmentos fotográficos en blanco y negro y acentos dorados.',
    technique: 'Mixed Media & Hojilla de Oro',
    dimensions: '50 x 70 cm',
    cover_image: '/placeholder-collage-2.svg',
    gallery: ['/placeholder-collage-2.svg', '/placeholder-collage-3.svg'],
    display_order: 2,
    published: true,
  },
  {
    id: 's3',
    title: 'Anatomía de los Sueños',
    year: '2024',
    description:
      'Composiciones de corte surrealista que entrelazan cartas antiguas, ilustraciones astronómicas y retratos anónimos de época.',
    technique: 'Collage Análogo & Tinta China',
    dimensions: '30 x 40 cm',
    cover_image: '/placeholder-collage-3.svg',
    gallery: ['/placeholder-collage-3.svg', '/placeholder-collage-1.svg'],
    display_order: 3,
    published: true,
  },
];

export const INITIAL_TALLERES: TallerItem[] = [
  {
    id: 't1',
    title: 'Taller Intensivo: Poética del Collage Análogo',
    date: 'Sábado 18 de Octubre, 2026 - 15:00 a 19:00 hs',
    modality: 'Presencial - Estudio Coquimbo, Chile',
    duration: '4 horas',
    description:
      'Aprende técnicas avanzadas de recorte con bisturí, composición espacial, teoría del vacío y conservación de materiales de papel vintage.',
    includes: [
      'Materiales vintage originales (revistas 1950-1980)',
      'Bisturí de precisión y alfombrilla de corte',
      'Adhesivos libres de ácido y soporte de algodón',
      'Café y té de especialidad',
    ],
    registration_url: '#contacto',
    image: '/placeholder-collage-1.svg',
    available: true,
    display_order: 1,
  },
  {
    id: 't2',
    title: 'Masterclass Online: Narrativa Botánica & Texturas',
    date: 'Sábado 8 de Noviembre, 2026 - 17:00 hs (CLT)',
    modality: 'Online En Vivo vía Zoom',
    duration: '3 horas + sesión Q&A',
    description:
      'Exploraremos la integración de elementos botánicos y la construcción de paletas de color armoniosas en medios mixtos.',
    includes: [
      'Acceso a la sesión en vivo y grabación por 6 meses',
      'Kit imprimible de elementos botánicos en alta resolución',
      'Guía PDF con proveedores y libros recomendados',
    ],
    registration_url: '#contacto',
    image: '/placeholder-collage-2.svg',
    available: true,
    display_order: 2,
  },
];

export const INITIAL_KITS: KitItem[] = [
  {
    id: 'k1',
    title: 'Kit Botánico & Papeles Vintage',
    category: 'Set de Materiales',
    description:
      'Curaduría exclusiva de 50 láminas originales de época, papeles de encuadernación, ilustraciones florales y estampillas antiguas.',
    image: '/placeholder-collage-3.svg',
    purchase_url: '#contacto',
    in_stock: true,
    display_order: 1,
  },
  {
    id: 'k2',
    title: 'Herramientas de Precisión para Artista',
    category: 'Herramientas',
    description:
      'Bisturí quirúrgico N°11, alfombrilla autoreparable A4, pegamento neutro PH8 y regla metálica antideslizante.',
    image: '/placeholder-collage-2.svg',
    purchase_url: '#contacto',
    in_stock: true,
    display_order: 2,
  },
  {
    id: 'k3',
    title: 'Guía Digital: De la Caza de Papel a la Galería',
    category: 'E-book PDF',
    description:
      'Manual de 80 páginas sobre técnicas de corte, archivo de materiales, escaneo profesional y monetización de collage.',
    image: '/placeholder-collage-1.svg',
    purchase_url: '#contacto',
    in_stock: true,
    display_order: 3,
  },
];

export const INITIAL_CONTACT_INFO: ContactInfoData = {
  email: 'hola@milagonzalezcollage.art',
  phone: '+56 9 8765 4321',
  location: 'Estudio Coquimbo, Región de Coquimbo, Chile',
  social_links: {
    instagram: 'https://instagram.com/milagonzalez_collage',
    behance: 'https://behance.net/milagonzalezcollage',
    pinterest: 'https://pinterest.com/milagonzalezcollage',
    linkedin: 'https://linkedin.com/in/milagonzalezcollage',
  },
};

export interface ContactMessageRecord extends ContactFormData {
  id: string;
  created_at: string;
  read: boolean;
}

// In-Memory Fallback State (For mock/dev execution)
let mockStore = {
  bio: { ...INITIAL_BIO },
  statement: { ...INITIAL_STATEMENT },
  series: [...INITIAL_SERIES],
  talleres: [...INITIAL_TALLERES],
  kits: [...INITIAL_KITS],
  contactInfo: { ...INITIAL_CONTACT_INFO },
  messages: [] as ContactMessageRecord[],
};

// Data Store Repository Methods
export async function getBio(): Promise<BioData> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('content')
        .eq('key', 'bio')
        .single();
      if (!error && data?.content) return data.content as BioData;
    } catch (e) {
      console.warn('Error reading bio from Supabase, using fallback store', e);
    }
  }
  return mockStore.bio;
}

export async function updateBio(data: BioData): Promise<BioData> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('site_content').upsert({
      key: 'bio',
      content: data,
      updated_at: new Date().toISOString(),
    });
    if (error) throw new Error(`Error actualizando Bio: ${error.message}`);
  }
  mockStore.bio = { ...data };
  return mockStore.bio;
}

export async function getStatement(): Promise<StatementData> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('content')
        .eq('key', 'statement')
        .single();
      if (!error && data?.content) return data.content as StatementData;
    } catch (e) {
      console.warn('Error reading statement from Supabase, using fallback store', e);
    }
  }
  return mockStore.statement;
}

export async function updateStatement(data: StatementData): Promise<StatementData> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('site_content').upsert({
      key: 'statement',
      content: data,
      updated_at: new Date().toISOString(),
    });
    if (error) throw new Error(`Error actualizando Statement: ${error.message}`);
  }
  mockStore.statement = { ...data };
  return mockStore.statement;
}

export async function getSeries(): Promise<SeriesItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('series')
        .select('*')
        .order('display_order', { ascending: true });
      if (!error && data && data.length > 0) return data as SeriesItem[];
    } catch (e) {
      console.warn('Error reading series from Supabase, using fallback store', e);
    }
  }
  return mockStore.series;
}

export async function saveSeriesItem(item: SeriesItem): Promise<SeriesItem> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('series').upsert(item);
    if (error) throw new Error(`Error guardando serie: ${error.message}`);
  }
  const idx = mockStore.series.findIndex((s) => s.id === item.id);
  if (idx >= 0) {
    mockStore.series[idx] = { ...item };
  } else {
    mockStore.series.push({ ...item });
  }
  return item;
}

export async function deleteSeriesItem(id: string): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('series').delete().eq('id', id);
    if (error) throw new Error(`Error eliminando serie: ${error.message}`);
  }
  mockStore.series = mockStore.series.filter((s) => s.id !== id);
}

export async function getTalleres(): Promise<TallerItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('talleres')
        .select('*')
        .order('display_order', { ascending: true });
      if (!error && data && data.length > 0) return data as TallerItem[];
    } catch (e) {
      console.warn('Error reading talleres from Supabase, using fallback store', e);
    }
  }
  return mockStore.talleres;
}

export async function saveTallerItem(item: TallerItem): Promise<TallerItem> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('talleres').upsert(item);
    if (error) throw new Error(`Error guardando taller: ${error.message}`);
  }
  const idx = mockStore.talleres.findIndex((t) => t.id === item.id);
  if (idx >= 0) {
    mockStore.talleres[idx] = { ...item };
  } else {
    mockStore.talleres.push({ ...item });
  }
  return item;
}

export async function deleteTallerItem(id: string): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('talleres').delete().eq('id', id);
    if (error) throw new Error(`Error eliminando taller: ${error.message}`);
  }
  mockStore.talleres = mockStore.talleres.filter((t) => t.id !== id);
}

export async function getKits(): Promise<KitItem[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('kit_items')
        .select('*')
        .order('display_order', { ascending: true });
      if (!error && data && data.length > 0) return data as KitItem[];
    } catch (e) {
      console.warn('Error reading kits from Supabase, using fallback store', e);
    }
  }
  return mockStore.kits;
}

export async function saveKitItem(item: KitItem): Promise<KitItem> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('kit_items').upsert(item);
    if (error) throw new Error(`Error guardando kit: ${error.message}`);
  }
  const idx = mockStore.kits.findIndex((k) => k.id === item.id);
  if (idx >= 0) {
    mockStore.kits[idx] = { ...item };
  } else {
    mockStore.kits.push({ ...item });
  }
  return item;
}

export async function deleteKitItem(id: string): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('kit_items').delete().eq('id', id);
    if (error) throw new Error(`Error eliminando kit: ${error.message}`);
  }
  mockStore.kits = mockStore.kits.filter((k) => k.id !== id);
}

export async function getContactInfo(): Promise<ContactInfoData> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('content')
        .eq('key', 'contact')
        .single();
      if (!error && data?.content) return data.content as ContactInfoData;
    } catch (e) {
      console.warn('Error reading contact info from Supabase, using fallback store', e);
    }
  }
  return mockStore.contactInfo;
}

export async function updateContactInfo(data: ContactInfoData): Promise<ContactInfoData> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('site_content').upsert({
      key: 'contact',
      content: data,
      updated_at: new Date().toISOString(),
    });
    if (error) throw new Error(`Error actualizando información de contacto: ${error.message}`);
  }
  mockStore.contactInfo = { ...data };
  return mockStore.contactInfo;
}

export async function addContactMessage(form: ContactFormData): Promise<ContactMessageRecord> {
  const record: ContactMessageRecord = {
    ...form,
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    created_at: new Date().toISOString(),
    read: false,
  };

  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('contact_messages').insert({
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
    });
    if (error) console.error('Supabase contact message error:', error);
  }

  mockStore.messages.unshift(record);
  return record;
}

export async function getContactMessages(): Promise<ContactMessageRecord[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) return data as ContactMessageRecord[];
    } catch (e) {
      console.warn('Error reading messages from Supabase', e);
    }
  }
  return mockStore.messages;
}

// Reset store for vitest isolation
export function _resetMockStore() {
  mockStore = {
    bio: { ...INITIAL_BIO },
    statement: { ...INITIAL_STATEMENT },
    series: JSON.parse(JSON.stringify(INITIAL_SERIES)),
    talleres: JSON.parse(JSON.stringify(INITIAL_TALLERES)),
    kits: JSON.parse(JSON.stringify(INITIAL_KITS)),
    contactInfo: JSON.parse(JSON.stringify(INITIAL_CONTACT_INFO)),
    messages: [],
  };
}
