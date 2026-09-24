import React, { useState } from 'react';
import { ContactFormSchema, type ContactFormData } from '@/lib/schemas/contact.schema';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setStatus('submitting');
    setStatusMessage('');

    // Zod Client-side Validation
    const validationResult = ContactFormSchema.safeParse(formData);

    if (!validationResult.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      validationResult.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      setStatus('idle');
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setStatusMessage('¡Gracias por tu mensaje! Me pondré en contacto muy pronto.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setStatusMessage(data.error || 'Ocurrió un error al enviar tu mensaje. Inténtalo nuevamente.');
      }
    } catch (err) {
      setStatus('error');
      setStatusMessage('Error de conexión. Por favor verifica tu red e inténtalo de nuevo.');
    }
  };

  return (
    <form className="contact-form-element" onSubmit={handleSubmit} noValidate>
      {status === 'success' && (
        <div className="form-alert alert-success" role="alert">
          {statusMessage}
        </div>
      )}

      {status === 'error' && (
        <div className="form-alert alert-error" role="alert">
          {statusMessage}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Nombre completo <span className="required">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`form-input ${errors.name ? 'input-error' : ''}`}
          placeholder="Tu nombre o firma"
          required
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Correo electrónico <span className="required">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`form-input ${errors.email ? 'input-error' : ''}`}
          placeholder="hola@ejemplo.com"
          required
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="subject" className="form-label">
          Asunto <span className="required">*</span>
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={`form-input ${errors.subject ? 'input-error' : ''}`}
          placeholder="Encargo de obra, Taller, Proyecto editorial, etc."
          required
        />
        {errors.subject && <span className="error-text">{errors.subject}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="message" className="form-label">
          Mensaje <span className="required">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={`form-input form-textarea ${errors.message ? 'input-error' : ''}`}
          placeholder="Cuéntame sobre tu proyecto o duda..."
          required
        />
        {errors.message && <span className="error-text">{errors.message}</span>}
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="submit-button"
      >
        {status === 'submitting' ? 'Enviando Mensaje...' : 'Enviar Mensaje'}
      </button>

      <style>{`
        .contact-form-element {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          background: #ffffff;
          padding: 2.25rem;
          border-radius: 4px;
          border: 1px solid #e6e1d8;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
        }

        .form-alert {
          padding: 1rem 1.25rem;
          border-radius: 4px;
          font-size: 0.95rem;
          margin-bottom: 0.5rem;
        }

        .alert-success {
          background-color: #f0f3ef;
          color: #6e7e6b;
          border: 1px solid #6e7e6b;
        }

        .alert-error {
          background-color: #f7ece8;
          color: #c85a32;
          border: 1px solid #c85a32;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-label {
          font-size: 0.88rem;
          font-weight: 500;
          color: #1a1918;
        }

        .required {
          color: #c85a32;
        }

        .form-input {
          padding: 0.75rem 1rem;
          border: 1px solid #d1cabf;
          border-radius: 2px;
          background-color: #fbf9f5;
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          color: #1a1918;
          transition: border-color 0.15s;
        }

        .form-input:focus {
          outline: none;
          border-color: #c85a32;
          background-color: #ffffff;
        }

        .input-error {
          border-color: #c85a32;
          background-color: #f7ece8;
        }

        .error-text {
          font-size: 0.8rem;
          color: #c85a32;
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
        }

        .submit-button {
          background-color: #c85a32;
          color: #ffffff;
          padding: 0.85rem 1.75rem;
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          border: none;
          border-radius: 2px;
          cursor: pointer;
          transition: background-color 0.15s;
          margin-top: 0.5rem;
        }

        .submit-button:hover:not(:disabled) {
          background-color: #b04923;
        }

        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </form>
  );
};
