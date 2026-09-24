import React, { useState } from 'react';
import type { BioData } from '@/lib/schemas/bio.schema';
import type { StatementData } from '@/lib/schemas/statement.schema';
import type { SeriesItem } from '@/lib/schemas/series.schema';
import type { TallerItem } from '@/lib/schemas/talleres.schema';
import type { KitItem } from '@/lib/schemas/kit.schema';
import type { ContactInfoData } from '@/lib/schemas/contact.schema';
import type { ContactMessageRecord } from '@/lib/contentStore';
import { Toast } from '../ui/Toast';

interface AdminDashboardProps {
  initialBio: BioData;
  initialStatement: StatementData;
  initialSeries: SeriesItem[];
  initialTalleres: TallerItem[];
  initialKits: KitItem[];
  initialContactInfo: ContactInfoData;
  initialMessages: ContactMessageRecord[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  initialBio,
  initialStatement,
  initialSeries,
  initialTalleres,
  initialKits,
  initialContactInfo,
  initialMessages,
}) => {
  const [activeTab, setActiveTab] = useState<
    'bio' | 'statement' | 'series' | 'talleres' | 'kits' | 'contact' | 'messages'
  >('series');

  // Local component states
  const [bio, setBio] = useState<BioData>(initialBio);
  const [statement, setStatement] = useState<StatementData>(initialStatement);
  const [seriesList, setSeriesList] = useState<SeriesItem[]>(initialSeries);
  const [talleresList, setTalleresList] = useState<TallerItem[]>(initialTalleres);
  const [kitsList, setKitsList] = useState<KitItem[]>(initialKits);
  const [contactInfo, setContactInfo] = useState<ContactInfoData>(initialContactInfo);
  const [messages] = useState<ContactMessageRecord[]>(initialMessages);

  // Form edit helper states
  const [editingSeries, setEditingSeries] = useState<SeriesItem | null>(null);
  const [editingTaller, setEditingTaller] = useState<TallerItem | null>(null);
  const [editingKit, setEditingKit] = useState<KitItem | null>(null);

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [saving, setSaving] = useState(false);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  };

  // Save Bio
  const saveBio = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'bio', data: bio }),
      });
      if (res.ok) {
        showToast('Biografía actualizada con éxito');
      } else {
        showToast('Error al guardar la Biografía', 'error');
      }
    } catch {
      showToast('Error de conexión', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Save Statement
  const saveStatement = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'statement', data: statement }),
      });
      if (res.ok) {
        showToast('Statement artístico actualizado con éxito');
      } else {
        showToast('Error al guardar el Statement', 'error');
      }
    } catch {
      showToast('Error de conexión', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Save Series Item
  const saveSeries = async (item: SeriesItem) => {
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'series', data: item }),
      });
      if (res.ok) {
        setSeriesList((prev) => {
          const idx = prev.findIndex((s) => s.id === item.id);
          if (idx >= 0) {
            const next = [...prev];
            next[idx] = item;
            return next;
          }
          return [...prev, item];
        });
        setEditingSeries(null);
        showToast('Serie de collage guardada exitosamente');
      } else {
        showToast('Error guardando la serie', 'error');
      }
    } catch {
      showToast('Error de servidor', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Delete Series Item
  const deleteSeries = async (id: string) => {
    if (!confirm('¿Seguro que deseas eliminar esta serie de collage?')) return;
    try {
      const res = await fetch(`/api/content?type=series&id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setSeriesList((prev) => prev.filter((s) => s.id !== id));
        showToast('Serie eliminada correctamente');
      }
    } catch {
      showToast('Error al eliminar serie', 'error');
    }
  };

  // Save Taller Item
  const saveTaller = async (item: TallerItem) => {
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'talleres', data: item }),
      });
      if (res.ok) {
        setTalleresList((prev) => {
          const idx = prev.findIndex((t) => t.id === item.id);
          if (idx >= 0) {
            const next = [...prev];
            next[idx] = item;
            return next;
          }
          return [...prev, item];
        });
        setEditingTaller(null);
        showToast('Taller actualizado correctamente');
      } else {
        showToast('Error al guardar el taller', 'error');
      }
    } catch {
      showToast('Error de servidor', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Delete Taller Item
  const deleteTaller = async (id: string) => {
    if (!confirm('¿Seguro que deseas eliminar este taller?')) return;
    try {
      const res = await fetch(`/api/content?type=talleres&id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTalleresList((prev) => prev.filter((t) => t.id !== id));
        showToast('Taller eliminado correctamente');
      }
    } catch {
      showToast('Error al eliminar taller', 'error');
    }
  };

  // Save Kit Item
  const saveKit = async (item: KitItem) => {
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'kits', data: item }),
      });
      if (res.ok) {
        setKitsList((prev) => {
          const idx = prev.findIndex((k) => k.id === item.id);
          if (idx >= 0) {
            const next = [...prev];
            next[idx] = item;
            return next;
          }
          return [...prev, item];
        });
        setEditingKit(null);
        showToast('Kit guardado con éxito');
      } else {
        showToast('Error al guardar kit', 'error');
      }
    } catch {
      showToast('Error de conexión', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Delete Kit Item
  const deleteKit = async (id: string) => {
    if (!confirm('¿Deseas eliminar este ítem del kit?')) return;
    try {
      const res = await fetch(`/api/content?type=kits&id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setKitsList((prev) => prev.filter((k) => k.id !== id));
        showToast('Ítem eliminado con éxito');
      }
    } catch {
      showToast('Error al eliminar ítem', 'error');
    }
  };

  // Save Contact Info
  const saveContactInfo = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'contact', data: contactInfo }),
      });
      if (res.ok) {
        showToast('Información de contacto actualizada');
      } else {
        showToast('Error al guardar información de contacto', 'error');
      }
    } catch {
      showToast('Error de conexión', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-dashboard-container">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <header className="dashboard-header">
        <div className="dashboard-title-area">
          <h1 className="dashboard-title">Panel de Control del Sitio</h1>
          <p className="dashboard-sub">Gestión dinámica de contenidos y portafolio</p>
        </div>
        <div className="header-actions">
          <a href="/" target="_blank" rel="noopener noreferrer" className="btn-view-site">
            Ver Sitio Web
          </a>
          <button onClick={handleLogout} className="btn-logout">
            Cerrar Sesión
          </button>
        </div>
      </header>

      <div className="dashboard-main">
        {/* Navigation Tabs */}
        <nav className="dashboard-tabs" aria-label="Secciones del administrador">
          <button
            className={`tab-btn ${activeTab === 'series' ? 'active' : ''}`}
            onClick={() => setActiveTab('series')}
          >
            Series de Collage ({seriesList.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'talleres' ? 'active' : ''}`}
            onClick={() => setActiveTab('talleres')}
          >
            Talleres ({talleresList.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'kits' ? 'active' : ''}`}
            onClick={() => setActiveTab('kits')}
          >
            Kit Collage ({kitsList.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'bio' ? 'active' : ''}`}
            onClick={() => setActiveTab('bio')}
          >
            Biografía
          </button>
          <button
            className={`tab-btn ${activeTab === 'statement' ? 'active' : ''}`}
            onClick={() => setActiveTab('statement')}
          >
            Statement
          </button>
          <button
            className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            Contacto & Redes
          </button>
          <button
            className={`tab-btn ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            Mensajes ({messages.length})
          </button>
        </nav>

        {/* Tab Content Panel */}
        <div className="dashboard-content-panel">
          {/* TAB 1: SERIES DE COLLAGE */}
          {activeTab === 'series' && (
            <div className="panel-section">
              <div className="panel-header">
                <h2>Administración de Series de Collage</h2>
                <button
                  className="btn-add"
                  onClick={() =>
                    setEditingSeries({
                      id: `s-${Date.now()}`,
                      title: '',
                      year: new Date().getFullYear().toString(),
                      description: '',
                      technique: 'Collage Análogo',
                      dimensions: '40 x 50 cm',
                      cover_image: '/placeholder-collage-1.svg',
                      gallery: [],
                      display_order: seriesList.length + 1,
                      published: true,
                    })
                  }
                >
                  + Agregar Nueva Serie
                </button>
              </div>

              {editingSeries ? (
                <div className="edit-form-card">
                  <h3>{editingSeries.title ? `Editar "${editingSeries.title}"` : 'Crear Nueva Serie'}</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Título de la Serie</label>
                      <input
                        type="text"
                        value={editingSeries.title}
                        onChange={(e) => setEditingSeries({ ...editingSeries, title: e.target.value })}
                        placeholder="Ej. Herbarium Inmaterial"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Año</label>
                      <input
                        type="text"
                        value={editingSeries.year}
                        onChange={(e) => setEditingSeries({ ...editingSeries, year: e.target.value })}
                        placeholder="Ej. 2026"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Técnica</label>
                      <input
                        type="text"
                        value={editingSeries.technique}
                        onChange={(e) => setEditingSeries({ ...editingSeries, technique: e.target.value })}
                        placeholder="Ej. Collage Análogo en Papel Arches"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Dimensiones</label>
                      <input
                        type="text"
                        value={editingSeries.dimensions || ''}
                        onChange={(e) => setEditingSeries({ ...editingSeries, dimensions: e.target.value })}
                        placeholder="Ej. 40 x 50 cm"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Imagen de Portada (URL o Ruta Local / Cloudinary)</label>
                      <input
                        type="text"
                        value={editingSeries.cover_image}
                        onChange={(e) => setEditingSeries({ ...editingSeries, cover_image: e.target.value })}
                        placeholder="/placeholder-collage-1.svg"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Descripción Conceptual</label>
                      <textarea
                        value={editingSeries.description}
                        onChange={(e) => setEditingSeries({ ...editingSeries, description: e.target.value })}
                        rows={4}
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div className="edit-form-actions">
                    <button onClick={() => saveSeries(editingSeries)} disabled={saving} className="btn-save">
                      {saving ? 'Guardando...' : 'Guardar Serie'}
                    </button>
                    <button onClick={() => setEditingSeries(null)} className="btn-cancel">
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="items-table-wrapper">
                  <table className="items-table">
                    <thead>
                      <tr>
                        <th>Portada</th>
                        <th>Título</th>
                        <th>Año</th>
                        <th>Técnica</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {seriesList.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <img src={item.cover_image} alt={item.title} className="table-thumb" />
                          </td>
                          <td className="font-semibold">{item.title}</td>
                          <td>{item.year}</td>
                          <td>{item.technique}</td>
                          <td>
                            <button onClick={() => setEditingSeries(item)} className="btn-table-edit">
                              Editar
                            </button>
                            <button onClick={() => deleteSeries(item.id)} className="btn-table-delete">
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: TALLERES */}
          {activeTab === 'talleres' && (
            <div className="panel-section">
              <div className="panel-header">
                <h2>Administración de Talleres & Masterclasses</h2>
                <button
                  className="btn-add"
                  onClick={() =>
                    setEditingTaller({
                      id: `t-${Date.now()}`,
                      title: '',
                      date: 'Sábado 20 de Octubre - 15:00 hs',
                      modality: 'Presencial',
                      duration: '4 horas',
                      price: '$50 USD',
                      description: '',
                      includes: ['Materiales incluidos'],
                      registration_url: '#contacto',
                      image: '/placeholder-collage-1.svg',
                      available: true,
                      display_order: talleresList.length + 1,
                    })
                  }
                >
                  + Crear Nuevo Taller
                </button>
              </div>

              {editingTaller ? (
                <div className="edit-form-card">
                  <h3>{editingTaller.title ? `Editar "${editingTaller.title}"` : 'Nuevo Taller'}</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Título del Taller</label>
                      <input
                        type="text"
                        value={editingTaller.title}
                        onChange={(e) => setEditingTaller({ ...editingTaller, title: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Fecha & Horario</label>
                      <input
                        type="text"
                        value={editingTaller.date}
                        onChange={(e) => setEditingTaller({ ...editingTaller, date: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Modalidad</label>
                      <input
                        type="text"
                        value={editingTaller.modality}
                        onChange={(e) => setEditingTaller({ ...editingTaller, modality: e.target.value })}
                        placeholder="Ej. Presencial - Buenos Aires u Online En Vivo"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Precio</label>
                      <input
                        type="text"
                        value={editingTaller.price}
                        onChange={(e) => setEditingTaller({ ...editingTaller, price: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Imagen del Taller</label>
                      <input
                        type="text"
                        value={editingTaller.image}
                        onChange={(e) => setEditingTaller({ ...editingTaller, image: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Descripción</label>
                      <textarea
                        value={editingTaller.description}
                        onChange={(e) => setEditingTaller({ ...editingTaller, description: e.target.value })}
                        rows={3}
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div className="edit-form-actions">
                    <button onClick={() => saveTaller(editingTaller)} disabled={saving} className="btn-save">
                      Guardar Taller
                    </button>
                    <button onClick={() => setEditingTaller(null)} className="btn-cancel">
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="items-table-wrapper">
                  <table className="items-table">
                    <thead>
                      <tr>
                        <th>Imagen</th>
                        <th>Título</th>
                        <th>Fecha</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {talleresList.map((taller) => (
                        <tr key={taller.id}>
                          <td>
                            <img src={taller.image} alt={taller.title} className="table-thumb" />
                          </td>
                          <td className="font-semibold">{taller.title}</td>
                          <td>{taller.date}</td>
                          <td>{taller.price}</td>
                          <td>
                            <button onClick={() => setEditingTaller(taller)} className="btn-table-edit">
                              Editar
                            </button>
                            <button onClick={() => deleteTaller(taller.id)} className="btn-table-delete">
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: KIT COLLAGE */}
          {activeTab === 'kits' && (
            <div className="panel-section">
              <div className="panel-header">
                <h2>Gestión del Kit de Collage & Productos</h2>
                <button
                  className="btn-add"
                  onClick={() =>
                    setEditingKit({
                      id: `k-${Date.now()}`,
                      title: '',
                      category: 'Set de Materiales',
                      description: '',
                      price: '$30 USD',
                      image: '/placeholder-collage-3.svg',
                      purchase_url: '#contacto',
                      in_stock: true,
                      display_order: kitsList.length + 1,
                    })
                  }
                >
                  + Agregar Producto/Recurso
                </button>
              </div>

              {editingKit ? (
                <div className="edit-form-card">
                  <h3>{editingKit.title ? `Editar "${editingKit.title}"` : 'Nuevo Producto'}</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Nombre del Producto / Kit</label>
                      <input
                        type="text"
                        value={editingKit.title}
                        onChange={(e) => setEditingKit({ ...editingKit, title: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Categoría</label>
                      <input
                        type="text"
                        value={editingKit.category}
                        onChange={(e) => setEditingKit({ ...editingKit, category: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Precio</label>
                      <input
                        type="text"
                        value={editingKit.price}
                        onChange={(e) => setEditingKit({ ...editingKit, price: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Imagen</label>
                      <input
                        type="text"
                        value={editingKit.image}
                        onChange={(e) => setEditingKit({ ...editingKit, image: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Descripción</label>
                      <textarea
                        value={editingKit.description}
                        onChange={(e) => setEditingKit({ ...editingKit, description: e.target.value })}
                        rows={3}
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div className="edit-form-actions">
                    <button onClick={() => saveKit(editingKit)} disabled={saving} className="btn-save">
                      Guardar Producto
                    </button>
                    <button onClick={() => setEditingKit(null)} className="btn-cancel">
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="items-table-wrapper">
                  <table className="items-table">
                    <thead>
                      <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {kitsList.map((kit) => (
                        <tr key={kit.id}>
                          <td>
                            <img src={kit.image} alt={kit.title} className="table-thumb" />
                          </td>
                          <td className="font-semibold">{kit.title}</td>
                          <td>{kit.category}</td>
                          <td>{kit.price}</td>
                          <td>
                            <button onClick={() => setEditingKit(kit)} className="btn-table-edit">
                              Editar
                            </button>
                            <button onClick={() => deleteKit(kit.id)} className="btn-table-delete">
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: BIO */}
          {activeTab === 'bio' && (
            <div className="panel-section">
              <div className="panel-header">
                <h2>Editar Información Biográfica de la Artista</h2>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label>Nombre del Artista</label>
                  <input
                    type="text"
                    value={bio.name}
                    onChange={(e) => setBio({ ...bio, name: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Título Profesional</label>
                  <input
                    type="text"
                    value={bio.title}
                    onChange={(e) => setBio({ ...bio, title: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Ubicación</label>
                  <input
                    type="text"
                    value={bio.location}
                    onChange={(e) => setBio({ ...bio, location: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>URL / Ruta Foto de Perfil</label>
                  <input
                    type="text"
                    value={bio.avatar_url}
                    onChange={(e) => setBio({ ...bio, avatar_url: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group full-width">
                  <label>Resumen Biográfico (Hero & Bio)</label>
                  <textarea
                    value={bio.bio_summary}
                    onChange={(e) => setBio({ ...bio, bio_summary: e.target.value })}
                    rows={4}
                    className="form-input"
                  />
                </div>
                <div className="form-group full-width">
                  <label>Trayectoria y Experiencia</label>
                  <textarea
                    value={bio.experience}
                    onChange={(e) => setBio({ ...bio, experience: e.target.value })}
                    rows={3}
                    className="form-input"
                  />
                </div>
              </div>
              <div className="edit-form-actions">
                <button onClick={saveBio} disabled={saving} className="btn-save">
                  {saving ? 'Guardando...' : 'Guardar Cambios Biográficos'}
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: STATEMENT */}
          {activeTab === 'statement' && (
            <div className="panel-section">
              <div className="panel-header">
                <h2>Editar Statement Artístico & Filosofía</h2>
              </div>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Cita Destacada / Poética</label>
                  <textarea
                    value={statement.quote}
                    onChange={(e) => setStatement({ ...statement, quote: e.target.value })}
                    rows={3}
                    className="form-input"
                  />
                </div>
                {statement.paragraphs.map((p, idx) => (
                  <div className="form-group full-width" key={idx}>
                    <label>Párrafo {idx + 1}</label>
                    <textarea
                      value={p}
                      onChange={(e) => {
                        const nextP = [...statement.paragraphs];
                        nextP[idx] = e.target.value;
                        setStatement({ ...statement, paragraphs: nextP });
                      }}
                      rows={4}
                      className="form-input"
                    />
                  </div>
                ))}
              </div>
              <div className="edit-form-actions">
                <button onClick={saveStatement} disabled={saving} className="btn-save">
                  Guardar Statement Artístico
                </button>
              </div>
            </div>
          )}

          {/* TAB 6: CONTACT & REDES */}
          {activeTab === 'contact' && (
            <div className="panel-section">
              <div className="panel-header">
                <h2>Información de Contacto & Redes Sociales</h2>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label>Correo Electrónico de Contacto</label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label>Teléfono / WhatsApp</label>
                  <input
                    type="text"
                    value={contactInfo.phone || ''}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group full-width">
                  <label>Ubicación del Estudio</label>
                  <input
                    type="text"
                    value={contactInfo.location}
                    onChange={(e) => setContactInfo({ ...contactInfo, location: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Enlace Instagram</label>
                  <input
                    type="text"
                    value={contactInfo.social_links.instagram}
                    onChange={(e) =>
                      setContactInfo({
                        ...contactInfo,
                        social_links: { ...contactInfo.social_links, instagram: e.target.value },
                      })
                    }
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Enlace Behance</label>
                  <input
                    type="text"
                    value={contactInfo.social_links.behance}
                    onChange={(e) =>
                      setContactInfo({
                        ...contactInfo,
                        social_links: { ...contactInfo.social_links, behance: e.target.value },
                      })
                    }
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Enlace Pinterest</label>
                  <input
                    type="text"
                    value={contactInfo.social_links.pinterest}
                    onChange={(e) =>
                      setContactInfo({
                        ...contactInfo,
                        social_links: { ...contactInfo.social_links, pinterest: e.target.value },
                      })
                    }
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Enlace LinkedIn</label>
                  <input
                    type="text"
                    value={contactInfo.social_links.linkedin}
                    onChange={(e) =>
                      setContactInfo({
                        ...contactInfo,
                        social_links: { ...contactInfo.social_links, linkedin: e.target.value },
                      })
                    }
                    className="form-input"
                  />
                </div>
              </div>
              <div className="edit-form-actions">
                <button onClick={saveContactInfo} disabled={saving} className="btn-save">
                  Guardar Datos de Contacto
                </button>
              </div>
            </div>
          )}

          {/* TAB 7: MENSAJES DE CONTACTO */}
          {activeTab === 'messages' && (
            <div className="panel-section">
              <div className="panel-header">
                <h2>Mensajes Recibidos desde el Formulario</h2>
              </div>
              {messages.length === 0 ? (
                <p className="empty-msg">No hay consultas registradas aún.</p>
              ) : (
                <div className="messages-list">
                  {messages.map((msg) => (
                    <div key={msg.id} className="message-card">
                      <div className="msg-header">
                        <span className="msg-sender">{msg.name} ({msg.email})</span>
                        <span className="msg-date">{new Date(msg.created_at).toLocaleDateString()}</span>
                      </div>
                      <h4 className="msg-subject">Asunto: {msg.subject}</h4>
                      <p className="msg-body">{msg.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .admin-dashboard-container {
          min-height: 100vh;
          background-color: #fbf9f5;
          font-family: 'Inter', sans-serif;
          color: #1a1918;
        }

        .dashboard-header {
          background-color: #ffffff;
          border-bottom: 1px solid #e6e1d8;
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .dashboard-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.75rem;
          margin-bottom: 0.2rem;
        }

        .dashboard-sub {
          font-size: 0.85rem;
          color: #78746f;
        }

        .header-actions {
          display: flex;
          gap: 1rem;
        }

        .btn-view-site {
          padding: 0.5rem 1rem;
          font-size: 0.88rem;
          border: 1px solid #1a1918;
          color: #1a1918;
          border-radius: 2px;
          text-decoration: none;
        }

        .btn-logout {
          padding: 0.5rem 1rem;
          font-size: 0.88rem;
          background-color: #c85a32;
          color: #ffffff;
          border: none;
          border-radius: 2px;
          cursor: pointer;
        }

        .dashboard-main {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 1.5rem;
        }

        .dashboard-tabs {
          display: flex;
          gap: 0.5rem;
          border-bottom: 2px solid #e6e1d8;
          margin-bottom: 2rem;
          overflow-x: auto;
        }

        .tab-btn {
          padding: 0.75rem 1.25rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.92rem;
          font-weight: 500;
          background: none;
          border: none;
          border-bottom: 3px solid transparent;
          color: #78746f;
          cursor: pointer;
          white-space: nowrap;
        }

        .tab-btn.active {
          color: #c85a32;
          border-bottom-color: #c85a32;
          font-weight: 600;
        }

        .dashboard-content-panel {
          background: #ffffff;
          padding: 2rem;
          border-radius: 4px;
          border: 1px solid #e6e1d8;
          box-shadow: 0 5px 20px rgba(0,0,0,0.02);
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .panel-header h2 {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
        }

        .btn-add {
          background-color: #6e7e6b;
          color: #ffffff;
          padding: 0.6rem 1.25rem;
          border: none;
          border-radius: 2px;
          font-weight: 600;
          cursor: pointer;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .full-width {
          grid-column: 1 / -1;
        }

        .form-group label {
          font-size: 0.85rem;
          font-weight: 600;
          color: #4a4744;
        }

        .form-input {
          padding: 0.75rem;
          border: 1px solid #d1cabf;
          border-radius: 2px;
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          background-color: #fbf9f5;
        }

        .edit-form-card {
          background-color: #fbf9f5;
          padding: 1.75rem;
          border: 1px solid #d1cabf;
          border-radius: 4px;
          margin-bottom: 2rem;
        }

        .edit-form-actions {
          margin-top: 1.5rem;
          display: flex;
          gap: 1rem;
        }

        .btn-save {
          background-color: #c85a32;
          color: #ffffff;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 2px;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-cancel {
          background-color: #e6e1d8;
          color: #1a1918;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 2px;
          cursor: pointer;
        }

        .items-table-wrapper {
          overflow-x: auto;
        }

        .items-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .items-table th, .items-table td {
          padding: 1rem;
          border-bottom: 1px solid #e6e1d8;
          font-size: 0.92rem;
        }

        .table-thumb {
          width: 50px;
          height: 60px;
          object-fit: cover;
          border-radius: 2px;
        }

        .btn-table-edit {
          background: none;
          border: 1px solid #6e7e6b;
          color: #6e7e6b;
          padding: 0.3rem 0.65rem;
          border-radius: 2px;
          margin-right: 0.5rem;
          cursor: pointer;
        }

        .btn-table-delete {
          background: none;
          border: 1px solid #c85a32;
          color: #c85a32;
          padding: 0.3rem 0.65rem;
          border-radius: 2px;
          cursor: pointer;
        }

        .empty-msg {
          color: #78746f;
          font-style: italic;
        }

        .message-card {
          background-color: #fbf9f5;
          padding: 1.25rem;
          border-radius: 4px;
          border: 1px solid #e6e1d8;
          margin-bottom: 1rem;
        }

        .msg-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-size: 0.85rem;
          color: #78746f;
        }

        .msg-sender {
          font-weight: 600;
          color: #1a1918;
        }

        .msg-subject {
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }

        .msg-body {
          font-size: 0.95rem;
          color: #4a4744;
        }
      `}</style>
    </div>
  );
};

