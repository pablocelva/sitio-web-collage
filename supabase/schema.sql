-- Base schema for Portfolio de Ilustración y Collage
-- Supabase PostgreSQL Setup Script

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: site_content (Bio, Statement, Contact Details)
CREATE TABLE IF NOT EXISTS public.site_content (
  key VARCHAR(50) PRIMARY KEY,
  content JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, NOW()) NOT NULL
);

-- Table: series (Collage Series / Artworks)
CREATE TABLE IF NOT EXISTS public.series (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  year TEXT NOT NULL,
  description TEXT NOT NULL,
  technique TEXT NOT NULL,
  dimensions TEXT,
  cover_image TEXT NOT NULL,
  gallery JSONB DEFAULT '[]'::jsonb,
  display_order INT DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, NOW()) NOT NULL
);

-- Table: talleres (Collage Workshops)
CREATE TABLE IF NOT EXISTS public.talleres (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  modality TEXT NOT NULL,
  duration TEXT NOT NULL,
  price TEXT,
  description TEXT NOT NULL,
  includes JSONB DEFAULT '[]'::jsonb,
  registration_url TEXT NOT NULL,
  image TEXT NOT NULL,
  available BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, NOW()) NOT NULL
);

-- Table: kit_items (Collage Kit & Resources)
CREATE TABLE IF NOT EXISTS public.kit_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  price TEXT,
  image TEXT NOT NULL,
  purchase_url TEXT NOT NULL,
  in_stock BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, NOW()) NOT NULL
);

-- Table: contact_messages (Inquiries from visitors)
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, NOW()) NOT NULL
);

-- RLS (Row Level Security) Policies
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.series ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.talleres ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kit_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Read policies (Public can view content)
CREATE POLICY "Public can view site_content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Public can view series" ON public.series FOR SELECT USING (published = true);
CREATE POLICY "Public can view talleres" ON public.talleres FOR SELECT USING (true);
CREATE POLICY "Public can view kit_items" ON public.kit_items FOR SELECT USING (true);

-- Insert policy for contact messages
CREATE POLICY "Public can insert contact messages" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- Admin policies (Authenticated users can manage all)
CREATE POLICY "Admin full access on site_content" ON public.site_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on series" ON public.series FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on talleres" ON public.talleres FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on kit_items" ON public.kit_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on contact_messages" ON public.contact_messages FOR ALL USING (auth.role() = 'authenticated');

-- Initial Seed Data
INSERT INTO public.site_content (key, content) VALUES
('bio', '{
  "name": "Mila González",
  "title": "Ilustradora & Artista Visual de Collage",
  "bio_summary": "Exploro las fronteras entre el papel antiguo, la fotografía análoga y la narrativa botánica. Mi trabajo resignifica fragmentos olvidados para crear universos visuales atemporales desde Coquimbo, Chile.",
  "location": "Coquimbo, Chile & Disponible Worldwide",
  "experience": "10+ años creando collages para editoriales, marcas culturales y exposiciones internacionales.",
  "avatar_url": "/placeholder-artist.svg"
}'::jsonb),
('statement', '{
  "quote": "El collage no es cortar y pegar; es reensamblar la memoria y dar nueva vida al residuo poético del mundo.",
  "paragraphs": [
    "Mi práctica artística nace de la recolección paciente: revistas de botánica de los años 60, manuales de anatomía, cartas manuscritas e impresos litográficos. En mi estudio en Coquimbo, cada pieza es seleccionada minuciosamente por su textura, pátina y carga emotiva.",
    "Mediante yuxtaposiciones limpias y composiciones minimalistas sobre planos etéreos, busco dialogar con el vacío. El blanco alrededor de cada figura actúa como silencio en la música, permitiendo que las texturas dialoguen sin saturar.",
    "Exploro temas como la metamorfosis de la naturaleza, la nostalgia del objeto físico en la era digital y la delicadeza de la memoria colectiva."
  ]
}'::jsonb),
('contact', '{
  "email": "hola@milagonzalezcollage.art",
  "phone": "+56 9 8765 4321",
  "location": "Estudio Coquimbo, Región de Coquimbo, Chile",
  "social_links": {
    "instagram": "https://instagram.com/milagonzalez_collage",
    "behance": "https://behance.net/milagonzalezcollage",
    "pinterest": "https://pinterest.com/milagonzalezcollage",
    "linkedin": "https://linkedin.com/in/milagonzalezcollage"
  }
}'::jsonb)
ON CONFLICT (key) DO NOTHING;
