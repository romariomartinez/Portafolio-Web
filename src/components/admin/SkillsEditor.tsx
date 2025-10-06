import { useEffect, useState } from 'react';
import { Plus, CreditCard as Edit2, Trash2, Save, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { repositories } from '../../repositories';
import { Database } from '../../lib/database.types';

type Skill = Database['public']['Tables']['skills']['Row'];

export function SkillsEditor() {
  const { t } = useLanguage();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editing, setEditing] = useState<Partial<Skill> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const data = await repositories.skill.getAll();
      setSkills(data);
    } catch (error) {
      console.error('Error loading skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editing) return;
    try {
      if (editing.id) {
        await repositories.skill.update(editing.id, editing);
      } else {
        await repositories.skill.create(editing);
      }
      setEditing(null);
      await loadSkills();
    } catch (error) {
      console.error('Error saving skill:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t('¿Eliminar esta habilidad?', 'Delete this skill?'))) return;
    try {
      await repositories.skill.delete(id);
      await loadSkills();
    } catch (error) {
      console.error('Error deleting skill:', error);
    }
  };

  const startEdit = (item: Skill | null) => {
    setEditing(
      item || {
        name_es: '',
        name_en: '',
        category_es: '',
        category_en: '',
        level: 50,
        order_index: skills.length,
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
          {t('Gestionar Habilidades', 'Manage Skills')}
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
              value={editing.category_es || ''}
              onChange={(e) => setEditing({ ...editing, category_es: e.target.value })}
              placeholder={t('Categoría (Español)', 'Category (Spanish)')}
              className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
            <input
              type="text"
              value={editing.category_en || ''}
              onChange={(e) => setEditing({ ...editing, category_en: e.target.value })}
              placeholder={t('Categoría (Inglés)', 'Category (English)')}
              className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t('Nivel', 'Level')}: {editing.level}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={editing.level || 50}
              onChange={(e) => setEditing({ ...editing, level: parseInt(e.target.value) })}
              className="w-full"
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

      <div className="grid md:grid-cols-2 gap-4">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="bg-white dark:bg-slate-800 rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-slate-900 dark:text-white">{skill.name_es}</span>
                <span className="text-sm text-slate-500 dark:text-slate-400">{skill.level}%</span>
              </div>
              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{skill.category_es}</p>
            </div>
            <div className="flex gap-2 ml-4">
              <button
                onClick={() => startEdit(skill)}
                className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => handleDelete(skill.id)}
                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
