import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Toast } from '@/components/ui/Toast';
import { Modal } from '@/components/ui/Modal';
import { ContactForm } from '@/components/sections/ContactForm';
import { AdminLoginForm } from '@/components/admin/AdminLoginForm';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import {
  INITIAL_BIO,
  INITIAL_STATEMENT,
  INITIAL_SERIES,
  INITIAL_TALLERES,
  INITIAL_KITS,
  INITIAL_CONTACT_INFO,
} from '@/lib/contentStore';

describe('React UI Components Suite', () => {
  it('renders Toast notification correctly and handles close', () => {
    const handleClose = vi.fn();
    const { rerender } = render(<Toast message="" />);
    expect(screen.queryByRole('alert')).toBeNull();

    rerender(<Toast message="Operación exitosa" type="success" onClose={handleClose} />);
    expect(screen.getByText('Operación exitosa')).toBeDefined();

    const closeBtn = screen.getByLabelText('Cerrar notificación');
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalled();
  });

  it('renders Modal component correctly when open and handles Escape key', () => {
    const handleClose = vi.fn();
    const { rerender } = render(
      <Modal isOpen={false} onClose={handleClose}>
        <div>Contenido Modal</div>
      </Modal>
    );
    expect(screen.queryByText('Contenido Modal')).toBeNull();

    rerender(
      <Modal isOpen={true} onClose={handleClose} title="Título Modal">
        <div>Contenido Modal</div>
      </Modal>
    );
    expect(screen.getByText('Título Modal')).toBeDefined();
    expect(screen.getByText('Contenido Modal')).toBeDefined();

    // Close via close button
    const closeBtn = screen.getByLabelText('Cerrar ventana modal');
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);

    // Escape key press
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(2);
  });

  it('renders ContactForm, validates fields with Zod, and submits successfully', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
    global.fetch = mockFetch;

    render(<ContactForm />);

    const submitBtn = screen.getByRole('button', { name: /enviar mensaje/i });
    fireEvent.click(submitBtn);

    // Should display validation errors for required fields
    await waitFor(() => {
      expect(screen.getByText(/El nombre debe tener al menos 2 caracteres/i)).toBeDefined();
    });

    // Fill valid data
    fireEvent.change(screen.getByLabelText(/nombre completo/i), { target: { value: 'Ana Silva' } });
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'ana@ejemplo.com' } });
    fireEvent.change(screen.getByLabelText(/asunto/i), { target: { value: 'Consulta de Collage' } });
    fireEvent.change(screen.getByLabelText(/mensaje/i), {
      target: { value: 'Me gustaría encargar una obra original.' },
    });

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/¡Gracias por tu mensaje!/i)).toBeDefined();
    });
  });

  it('renders AdminLoginForm and submits credentials', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
    global.fetch = mockFetch;

    delete (window as any).location;
    window.location = { href: '' } as any;

    render(<AdminLoginForm />);

    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: 'admin@estudiocollage.com' },
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: 'SuperSecretPass123!' },
    });

    const loginBtn = screen.getByRole('button', { name: /ingresar al admin/i });
    fireEvent.click(loginBtn);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/auth/login', expect.anything());
    });
  });

  it('renders AdminDashboard and switches between tabs', () => {
    render(
      <AdminDashboard
        initialBio={INITIAL_BIO}
        initialStatement={INITIAL_STATEMENT}
        initialSeries={INITIAL_SERIES}
        initialTalleres={INITIAL_TALLERES}
        initialKits={INITIAL_KITS}
        initialContactInfo={INITIAL_CONTACT_INFO}
        initialMessages={[]}
      />
    );

    expect(screen.getByText(/Administración de Series de Collage/i)).toBeDefined();

    // Switch to Talleres tab
    fireEvent.click(screen.getByText(/Talleres \(2\)/i));
    expect(screen.getByText(/Administración de Talleres & Masterclasses/i)).toBeDefined();

    // Switch to Kit tab
    fireEvent.click(screen.getByText(/Kit Collage \(3\)/i));
    expect(screen.getByText(/Gestión del Kit de Collage & Productos/i)).toBeDefined();

    // Switch to Biografía tab
    fireEvent.click(screen.getByText(/^Biografía$/i));
    expect(screen.getByText(/Editar Información Biográfica de la Artista/i)).toBeDefined();
  });
});
