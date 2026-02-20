import { useEffect, useState } from 'react';
import { Plus, Trash2, Save, X, Upload, FileText } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { repositories } from '../../repositories';
import { supabase } from '../../lib/supabase';
import { Database } from '../../lib/database.types';
import { DatePicker } from '../ui/DatePicker';

type Certification = Database['public']['Tables']['certifications']['Row'] & {
  pdf_url?: string;
};

export function CertificationsEditor() {
  const { t } = useLanguage();
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [editing, setEditing] = useState<Partial<Certification> | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadCertifications();
  }, []);

  const loadCertifications = async () => {
    try {
      const data = await repositories.certification.getAll();
      setCertifications(data);
    } catch (error) {
      console.error('Error loading certifications:', error);
    } finally {
      setLoading(false);
    }
  };

  // Subir PDF al Storage
  const handleUploadPdf = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const fileName = `${Date.now()}-${file.name}`;
      const { error } = await supabase.storage
        .from('certificates-pdf') // 👈 bucket donde se guardan los PDF
        .upload(fileName, file);

      if (error) throw error;

      const { data } = supabase.storage
        .from('certificates-pdf')
        .getPublicUrl(fileName);

      setEditing((prev) => ({ ...prev, pdf_url: data.publicUrl }));
      alert('PDF subido correctamente');
    } catch (err) {
      console.error('Error al subir el PDF:', err);
      alert('Error al subir el PDF');
    } finally {
      setUploading(false);
    }
  };

  // Guardar o actualizar
  const handleSave = async () => {
    if (!editing) return;
    try {
      if (editing.id) {
        await repositories.certification.update(editing.id, editing);
      } else {
        await repositories.certification.create(editing);
      }
      setEditing(null);
      await loadCertifications();
    } catch (error) {
      console.error('Error saving certification:', error);
    }
  };

  // 🗑 Eliminar
  const handleDelete = async (id: string) => {
    if (!confirm(t('¿Eliminar esta certificación?', 'Delete this certification?'))) return;
    try {
      await repositories.certification.delete(id);
      await loadCertifications();
    } catch (error) {
      console.error('Error deleting certification:', error);
    }
  };

  // ✏️ Iniciar edición
  const startEdit = (item: Certification | null) => {
    setEditing(
      item || {
        name_es: '',
        name_en: '',
        issuer_es: '',
        issuer_en: '',
        date: '',
        pdf_url: '',
        order_index: certifications.length,
      }
    );
  };

  if (loading) {
    return <div className="text-center py-8">{t('Cargando...', 'Loading...')}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          {t('Gestionar Certificaciones', 'Manage Certifications')}
        </h3>
        <button
          onClick={() => startEdit(null)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus size={20} />
          {t('Agregar', 'Add')}
        </button>
      </div>

      {/* Formulario de edición */}
      {editing && (
        <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              value={editing.name_es || ''}
              onChange={(e) => setEditing({ ...editing, name_es: e.target.value })}
              placeholder={t('Nombre (Español)', 'Name (Spanish)')}
              className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
            <input
              type="text"
              value={editing.name_en || ''}
              onChange={(e) => setEditing({ ...editing, name_en: e.target.value })}
              placeholder={t('Nombre (Inglés)', 'Name (English)')}
              className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
            <input
              type="text"
              value={editing.issuer_es || ''}
              onChange={(e) => setEditing({ ...editing, issuer_es: e.target.value })}
              placeholder={t('Emisor (Español)', 'Issuer (Spanish)')}
              className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
            <input
              type="text"
              value={editing.issuer_en || ''}
              onChange={(e) => setEditing({ ...editing, issuer_en: e.target.value })}
              placeholder={t('Emisor (Inglés)', 'Issuer (English)')}
              className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
            <DatePicker
              value={editing.date || ''}
              onChange={(date) => setEditing({ ...editing, date })}
              placeholder={t('Fecha', 'Date')}
            />
          </div>

          {/* Subida de PDF */}
          <div>
            <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
              <Upload size={18} />
              {t('Archivo PDF del certificado', 'Certificate PDF File')}
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleUploadPdf}
              className="mt-2"
            />
            {uploading && (
              <p className="text-sm text-blue-500 mt-1">
                {t('Subiendo archivo...', 'Uploading file...')}
              </p>
            )}
            {editing.pdf_url && (
              <a
                href={editing.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-blue-500 hover:underline mt-2"
              >
                <FileText size={16} /> {t('Ver PDF', 'View PDF')}
              </a>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setEditing(null)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-300 dark:bg-slate-600 text-slate-800 dark:text-white rounded-lg hover:bg-slate-400 dark:hover:bg-slate-500 transition-colors"
            >
              <X size={18} />
              {t('Cancelar', 'Cancel')}
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Save size={18} />
              {t('Guardar', 'Save')}
            </button>
          </div>
        </div>
      )}

      {/* Lista de certificaciones */}
      <div className="grid md:grid-cols-2 gap-4">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="bg-white dark:bg-slate-800 rounded-lg p-4 flex items-start justify-between"
          >
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">{cert.name_es}</h4>
              <p className="text-slate-600 dark:text-slate-300">{cert.issuer_es}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{cert.date}</p>

              {cert.pdf_url && (
                <a
                  href={cert.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-blue-500 hover:underline mt-2"
                >
                  <FileText size={14} /> {t('Ver Certificado', 'View Certificate')}
                </a>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(cert)}
                className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors"
              >
                
              </button>
              <button
                onClick={() => handleDelete(cert.id)}
                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
