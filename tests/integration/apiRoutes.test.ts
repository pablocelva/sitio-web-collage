import { describe, it, expect, beforeEach } from 'vitest';
import { POST as handleLogin } from '@/pages/api/auth/login';
import { POST as handleLogout } from '@/pages/api/auth/logout';
import { POST as handleContact } from '@/pages/api/contact';
import { POST as handleContentPost, DELETE as handleContentDelete } from '@/pages/api/content';
import { _resetMockStore } from '@/lib/contentStore';

describe('API Route Handlers Integration Tests', () => {
  beforeEach(() => {
    _resetMockStore();
  });

  const mockCookies = {
    set: () => {},
    get: (name: string) => (name === 'admin_session' ? { value: 'authenticated_admin_session_token' } : undefined),
    delete: () => {},
  };

  const mockUnauthCookies = {
    set: () => {},
    get: () => undefined,
    delete: () => {},
  };

  it('POST /api/auth/login validates credentials correctly', async () => {
    // Valid credentials
    const validReq = new Request('http://localhost/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'admin@milagonzalezcollage.art',
        password: 'SuperSecretPass123!',
      }),
    });
    const res = await handleLogin({ request: validReq, cookies: mockCookies } as any);
    expect(res.status).toBe(200);

    // Invalid credentials
    const invalidReq = new Request('http://localhost/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'admin@milagonzalezcollage.art',
        password: 'WrongPassword!',
      }),
    });
    const invalidRes = await handleLogin({ request: invalidReq, cookies: mockCookies } as any);
    expect(invalidRes.status).toBe(401);

    // Malformed body
    const badReq = new Request('http://localhost/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: 'bad-email' }),
    });
    const badRes = await handleLogin({ request: badReq, cookies: mockCookies } as any);
    expect(badRes.status).toBe(400);
  });

  it('POST /api/auth/logout clears session', async () => {
    const res = await handleLogout({ cookies: mockCookies } as any);
    expect(res.status).toBe(200);
  });

  it('POST /api/contact validates and stores visitor message', async () => {
    const validReq = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Laura Fernández',
        email: 'laura@ejemplo.com',
        subject: 'Inscripción Taller',
        message: 'Hola, quisiera reservar un cupo para el taller intensivo.',
      }),
    });
    const res = await handleContact({ request: validReq } as any);
    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.success).toBe(true);

    const badReq = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({ name: 'L' }),
    });
    const badRes = await handleContact({ request: badReq } as any);
    expect(badRes.status).toBe(400);
  });

  it('POST /api/content rejects unauthenticated requests', async () => {
    const req = new Request('http://localhost/api/content', {
      method: 'POST',
      body: JSON.stringify({ type: 'bio', data: {} }),
    });
    const res = await handleContentPost({ request: req, cookies: mockUnauthCookies } as any);
    expect(res.status).toBe(401);
  });

  it('POST & DELETE /api/content handles authorized CRUD operations', async () => {
    // Save new series
    const newSeriesReq = new Request('http://localhost/api/content', {
      method: 'POST',
      body: JSON.stringify({
        type: 'series',
        data: {
          id: 's-api-1',
          title: 'Serie API Test',
          year: '2026',
          description: 'Serie creada vía API',
          technique: 'Mixed Media',
          cover_image: '/placeholder-collage-1.svg',
          gallery: [],
          display_order: 1,
          published: true,
        },
      }),
    });
    const postRes = await handleContentPost({ request: newSeriesReq, cookies: mockCookies } as any);
    expect(postRes.status).toBe(200);

    // Delete series
    const deleteReq = new Request('http://localhost/api/content?type=series&id=s-api-1', {
      method: 'DELETE',
    });
    const deleteRes = await handleContentDelete({ request: deleteReq, cookies: mockCookies } as any);
    expect(deleteRes.status).toBe(200);
  });
});

