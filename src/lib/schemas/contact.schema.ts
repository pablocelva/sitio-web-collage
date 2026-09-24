import { z } from 'zod';

export const ContactInfoSchema = z.object({
  email: z.string().email('Introduce un email válido'),
  phone: z.string().optional(),
  location: z.string().min(2, 'La ubicación es requerida'),
  social_links: z.object({
    instagram: z.string().url().or(z.string().default('#')),
    behance: z.string().url().or(z.string().default('#')),
    pinterest: z.string().url().or(z.string().default('#')),
    linkedin: z.string().url().or(z.string().default('#')),
  }),
});

export const ContactFormSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Por favor ingresa un email válido'),
  subject: z.string().min(3, 'El asunto debe tener al menos 3 caracteres'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

export type ContactInfoData = z.infer<typeof ContactInfoSchema>;
export type ContactFormData = z.infer<typeof ContactFormSchema>;

