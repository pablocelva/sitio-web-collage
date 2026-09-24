import type { APIRoute } from 'astro';
import { AuthLoginSchema } from '@/lib/schemas/auth.schema';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const body = await request.json();
    const validation = AuthLoginSchema.safeParse(body);

    if (!validation.success) {
      return new Response(
        JSON.stringify({ success: false, error: validation.error.errors[0]?.message }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { email, password } = validation.data;
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@milagonzalezcollage.art';
    const adminPass = process.env.ADMIN_PASSWORD || 'SuperSecretPass123!';

    if (email.toLowerCase() === adminEmail.toLowerCase() && password === adminPass) {
      cookies.set('admin_session', 'authenticated_admin_session_token', {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({ success: false, error: 'Credenciales inválidas' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: 'Error procesando solicitud de autenticación' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

