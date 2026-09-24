import React from 'react';

export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  return (
    <div className={`toast toast-${type}`} role="alert" aria-live="polite">
      <span>{message}</span>
      {onClose && (
        <button className="toast-close" onClick={onClose} aria-label="Cerrar notificación">
          &times;
        </button>
      )}

      <style>{`
        .toast {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          padding: 1rem 1.25rem;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 1rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          z-index: 2000;
          animation: slideUp 0.25s ease-out;
        }

        .toast-success {
          background-color: #6e7e6b;
          color: #ffffff;
        }

        .toast-error {
          background-color: #c85a32;
          color: #ffffff;
        }

        .toast-info {
          background-color: #1a1918;
          color: #ffffff;
        }

        .toast-close {
          background: none;
          border: none;
          color: currentColor;
          font-size: 1.25rem;
          cursor: pointer;
          opacity: 0.8;
          line-height: 1;
        }

        .toast-close:hover {
          opacity: 1;
        }

        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

