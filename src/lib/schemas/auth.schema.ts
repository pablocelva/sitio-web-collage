import { z } from 'zod';

export const AuthLoginSchema = z.object({
  email: z.string().email('Por favor ingresa un correo electrónico válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export type AuthLoginInput = z.infer<typeof AuthLoginSchema>;

