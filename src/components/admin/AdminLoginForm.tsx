import React, { useState } from 'react';
import { AuthLoginSchema, type AuthLoginInput } from '@/lib/schemas/auth.schema';

export const AdminLoginForm: React.FC = () => {
  const [formData, setFormData] = useState<AuthLoginInput>({ email: '', password: '' });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const validation = AuthLoginSchema.safeParse(formData);
    if (!validation.success) {
      setError(validation.error.errors[0]?.message || 'Datos de inicio de sesión no válidos');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        window.location.href = '/admin';
      } else {
        setError(data.error || 'Credenciales incorrectas');
      }
    } catch (err) {
      setError('Error al conectar con el servidor de autenticación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-card">
      <div className="login-header">
        <h1 className="login-title">Panel Administrativo Privado</h1>
        <p className="login-subtitle">Acceso exclusivo para gestión de contenidos</p>
      </div>

      {error && (
        <div className="error-banner" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="admin@milagonzalezcollage.art"
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="••••••••••••"
            required
            className="form-input"
          />
        </div>

        <button type="submit" disabled={loading} className="login-button">
          {loading ? 'Iniciando Sesión...' : 'Ingresar al Admin'}
        </button>

        <div className="demo-credentials">
          <p><strong>Acceso Privado:</strong></p>
          <p>Email: <code>admin@milagonzalezcollage.art</code></p>
          <p>Contraseña: <code>SuperSecretPass123!</code></p>
        </div>
      </form>

      <style>{`
        .login-card {
          background-color: #ffffff;
          border-radius: 6px;
          border: 1px solid #e6e1d8;
          box-shadow: 0 15px 35px rgba(0,0,0,0.06);
          padding: 2.5rem;
          max-width: 440px;
          width: 100%;
          margin: 0 auto;
        }

        .login-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .login-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem;
          color: #1a1918;
          margin-bottom: 0.5rem;
        }

        .login-subtitle {
          font-size: 0.88rem;
          color: #78746f;
        }

        .error-banner {
          background-color: #f7ece8;
          color: #c85a32;
          padding: 0.85rem 1rem;
          border-radius: 4px;
          font-size: 0.88rem;
          margin-bottom: 1.5rem;
          border: 1px solid #c85a32;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-group label {
          font-size: 0.88rem;
          font-weight: 500;
          color: #1a1918;
        }

        .form-input {
          padding: 0.75rem 1rem;
          border: 1px solid #d1cabf;
          border-radius: 2px;
          background-color: #fbf9f5;
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
        }

        .form-input:focus {
          outline: none;
          border-color: #c85a32;
          background-color: #ffffff;
        }

        .login-button {
          background-color: #1a1918;
          color: #ffffff;
          padding: 0.85rem;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          border: none;
          border-radius: 2px;
          cursor: pointer;
          transition: background-color 0.15s;
          margin-top: 0.5rem;
        }

        .login-button:hover:not(:disabled) {
          background-color: #c85a32;
        }

        .login-button:disabled {
          opacity: 0.6;
        }

        .demo-credentials {
          margin-top: 1.5rem;
          padding: 1rem;
          background-color: #f4f0e8;
          border-radius: 4px;
          font-size: 0.82rem;
          color: #4a4744;
          line-height: 1.5;
        }

        .demo-credentials code {
          background: #ffffff;
          padding: 0.1rem 0.3rem;
          border-radius: 2px;
          font-family: monospace;
          color: #c85a32;
        }
      `}</style>
    </div>
  );
};
