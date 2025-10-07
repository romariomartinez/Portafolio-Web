import { useEffect, useState } from 'react';
import { Plus, CreditCard as Edit2, Trash2, Save, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { repositories } from '../../repositories';
import { Database } from '../../lib/database.types';

type Education = Database['public']['Tables']['education']['Row'];

export function EducationEditor() {
  const { t } = useLanguage();
  const [education, setEducation] = useState<Education[]>([]);
  const [editing, setEditing] = useState<Partial<Education> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEducation();
  }, []);

  const loadEducation = async () => {
    try {
      const data = await repositories.education.getAll();
      setEducation(data);
    } catch (error) {
      console.error('Error loading education:', error);
    } finally {
      setLoading(false);
    }
  };

  

  const startEdit = (item: Education | null) => {
  if (item) {
    // 👇 aseguramos que se clone todo el registro, incluyendo el id
    setEditing({ ...item });
  } else {
    setEditing({
      id: undefined, // explícito, para que el create sepa que es nuevo
      institution_es: '',
      institution_en: '',
      degree_es: '',
      degree_en: '',
      description_es: '',
      description_en: '',
      start_date: '',
      end_date: '',
      order_index: education.length,
    });
  }
};

  if (loading) {
    return <div className="text-center py-8">{t('Cargando...', 'Loading...')}</div>;
  }

  async function handleDelete(id: string): Promise<void> {
    if (!window.confirm(t('¿Seguro que deseas eliminar este registro?', 'Are you sure you want to delete this record?'))) {
      return;
    }
    try {
      await repositories.education.delete(id);
      await loadEducation();
      alert('✅ Eliminado correctamente');
    } catch (error) {
      console.error('Error deleting education:', error);
      alert('❌ Error al eliminar');
    }
  }

  async function handleSave(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
    event.preventDefault();
    if (!editing) return;

    try {
      if (editing.id) {
        // Update existing education
        await repositories.education.update(editing.id, editing);
        alert('✅ Actualizado correctamente');
      } else {
        // Create new education
        await repositories.education.create(editing);
        alert('✅ Creado correctamente');
      }
      setEditing(null);
      await loadEducation();
    } catch (error) {
      console.error('Error saving education:', error);
      alert('❌ Error al guardar');
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          {t('Gestionar Educación', 'Manage Education')}
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
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {t('Institución (Español)', 'Institution (Spanish)')}
              </label>
              <input
                type="text"
                value={editing.institution_es || ''}
                onChange={(e) => setEditing({ ...editing, institution_es: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {t('Institución (Inglés)', 'Institution (English)')}
              </label>
              <input
                type="text"
                value={editing.institution_en || ''}
                onChange={(e) => setEditing({ ...editing, institution_en: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {t('Título (Español)', 'Degree (Spanish)')}
              </label>
              <input
                type="text"
                value={editing.degree_es || ''}
                onChange={(e) => setEditing({ ...editing, degree_es: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {t('Título (Inglés)', 'Degree (English)')}
              </label>
              <input
                type="text"
                value={editing.degree_en || ''}
                onChange={(e) => setEditing({ ...editing, degree_en: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {t('Fecha Inicio', 'Start Date')}
              </label>
              <input
                type="text"
                value={editing.start_date || ''}
                onChange={(e) => setEditing({ ...editing, start_date: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {t('Fecha Fin', 'End Date')}
              </label>
              <input
                type="text"
                value={editing.end_date || ''}
                onChange={(e) => setEditing({ ...editing, end_date: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t('Descripción (Español)', 'Description (Spanish)')}
            </label>
            <textarea
              value={editing.description_es || ''}
              onChange={(e) => setEditing({ ...editing, description_es: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t('Descripción (Inglés)', 'Description (English)')}
            </label>
            <textarea
              value={editing.description_en || ''}
              onChange={(e) => setEditing({ ...editing, description_en: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
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

      <div className="space-y-4">
        {education.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-slate-800 rounded-lg p-4 flex items-start justify-between"
          >
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">{item.degree_es}</h4>
              <p className="text-slate-600 dark:text-slate-300">{item.institution_es}</p>
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
