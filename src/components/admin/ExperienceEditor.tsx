import { useEffect, useState } from 'react';
import { Plus, CreditCard as Edit2, Trash2, Save, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { repositories } from '../../repositories';
import { Database } from '../../lib/database.types';
import { DatePicker } from '../ui/DatePicker';

type Experience = Database['public']['Tables']['experience']['Row'];

export function ExperienceEditor() {
  const { t } = useLanguage();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [editing, setEditing] = useState<Partial<Experience> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      const data = await repositories.experience.getAll();
      setExperiences(data);
    } catch (error) {
      console.error('Error loading experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editing) return;
    try {
      if (editing.id) {
        await repositories.experience.update(editing.id, editing);
      } else {
        await repositories.experience.create(editing);
      }
      setEditing(null);
      await loadExperiences();
    } catch (error) {
      console.error('Error saving experience:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t('¿Eliminar este registro?', 'Delete this record?'))) return;
    try {
      await repositories.experience.delete(id);
      await loadExperiences();
    } catch (error) {
      console.error('Error deleting experience:', error);
    }
  };

  const startEdit = (item: Experience | null) => {
    setEditing(
      item || {
        company_es: '',
        company_en: '',
        position_es: '',
        position_en: '',
        description_es: '',
        description_en: '',
        start_date: '',
        end_date: '',
        order_index: experiences.length,
      }
    );
  };

  if (loading) {
    return <div className="text-center py-8">{t('Cargando...', 'Loading...')}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          {t('Gestionar Experiencia', 'Manage Experience')}
        </h3>
        <button
          onClick={() => startEdit(null)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus size={20} />
          {t('Agregar', 'Add')}
        </button>
      </div>

      {editing && (
        <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              value={editing.company_es || ''}
              onChange={(e) => setEditing({ ...editing, company_es: e.target.value })}
              placeholder={t('Empresa (Español)', 'Company (Spanish)')}
              className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
            <input
              type="text"
              value={editing.company_en || ''}
              onChange={(e) => setEditing({ ...editing, company_en: e.target.value })}
              placeholder={t('Empresa (Inglés)', 'Company (English)')}
              className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
            <input
              type="text"
              value={editing.position_es || ''}
              onChange={(e) => setEditing({ ...editing, position_es: e.target.value })}
              placeholder={t('Cargo (Español)', 'Position (Spanish)')}
              className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
            <input
              type="text"
              value={editing.position_en || ''}
              onChange={(e) => setEditing({ ...editing, position_en: e.target.value })}
              placeholder={t('Cargo (Inglés)', 'Position (English)')}
              className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
            <DatePicker
              value={editing.start_date || ''}
              onChange={(date) => setEditing({ ...editing, start_date: date })}
              placeholder={t('Fecha Inicio', 'Start Date')}
            />
            <DatePicker
              value={editing.end_date || ''}
              onChange={(date) => setEditing({ ...editing, end_date: date })}
              placeholder={t('Fecha Fin', 'End Date')}
            />
          </div>
          <textarea
            value={editing.description_es || ''}
            onChange={(e) => setEditing({ ...editing, description_es: e.target.value })}
            placeholder={t('Descripción (Español)', 'Description (Spanish)')}
            rows={3}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
          />
          <textarea
            value={editing.description_en || ''}
            onChange={(e) => setEditing({ ...editing, description_en: e.target.value })}
            placeholder={t('Descripción (Inglés)', 'Description (English)')}
            rows={3}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
          />
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

      <div className="space-y-4">
        {experiences.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-slate-800 rounded-lg p-4 flex items-start justify-between"
          >
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">{item.position_es}</h4>
              <p className="text-slate-600 dark:text-slate-300">{item.company_es}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {item.start_date} - {item.end_date}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(item)}
                className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
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
