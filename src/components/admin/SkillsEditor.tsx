import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, Upload } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { repositories } from '../../repositories';
import { supabase } from '../../lib/supabase';
import { Database } from '../../lib/database.types';

type Skill = Database['public']['Tables']['skills']['Row'] & {
  image_url?: string;
};

export function SkillsEditor() {
  const { t } = useLanguage();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editing, setEditing] = useState<Partial<Skill> | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // 📦 Cargar habilidades al inicio
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

  // 📤 Subir imagen al bucket de Supabase
  const handleUploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;
      setUploading(true);

      // Nombre único del archivo
      const fileName = `${Date.now()}-${file.name}`;

      // Subir al bucket
      const { error } = await supabase.storage
        .from('skills-logos') // 👈 nombre del bucket
        .upload(fileName, file);

      if (error) throw error;

      // Obtener URL pública
      const { data: urlData } = supabase.storage.from('skills-logos').getPublicUrl(fileName);

      if (urlData?.publicUrl) {
        setEditing((prev) => ({ ...prev, image_url: urlData.publicUrl }));
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error al subir la imagen 😢');
    } finally {
      setUploading(false);
    }
  };

  // 💾 Guardar o actualizar
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

  // 🗑 Eliminar
  const handleDelete = async (id: string) => {
    if (!confirm(t('¿Eliminar esta habilidad?', 'Delete this skill?'))) return;
    try {
      await repositories.skill.delete(id);
      await loadSkills();
    } catch (error) {
      console.error('Error deleting skill:', error);
    }
  };

  // Iniciar edición
  const startEdit = (item: Skill | null) => {
    setEditing(
      item || {
        name_es: '',
        name_en: '',
        category_es: '',
        category_en: '',
        level: 50,
        image_url: '',
        order_index: skills.length,
      }
    );
  };

  //  Loading
  if (loading) {
    return <div className="text-center py-8">{t('Cargando...', 'Loading...')}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Encabezado */}
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

      {/* Formulario de edición */}
      {editing && (
        <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6 space-y-4">
          {/* 🧾 Campos de texto */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              value={editing.name_es || ''}
              onChange={(e) => setEditing({ ...editing, name_es: e.target.value })}
              placeholder={t('Nombre (Español)', 'Name (Spanish)')}
              className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 
              bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
            <input
              type="text"
              value={editing.name_en || ''}
              onChange={(e) => setEditing({ ...editing, name_en: e.target.value })}
              placeholder={t('Nombre (Inglés)', 'Name (English)')}
              className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 
              bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
            <input
              type="text"
              value={editing.category_es || ''}
              onChange={(e) => setEditing({ ...editing, category_es: e.target.value })}
              placeholder={t('Categoría (Español)', 'Category (Spanish)')}
              className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 
              bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
            <input
              type="text"
              value={editing.category_en || ''}
              onChange={(e) => setEditing({ ...editing, category_en: e.target.value })}
              placeholder={t('Categoría (Inglés)', 'Category (English)')}
              className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 
              bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          {/* Subida de imagen */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Upload size={18} className="text-blue-500" />
              {t('Logo de la habilidad', 'Skill Logo')}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleUploadImage}
              className="text-slate-700 dark:text-slate-300"
            />
            {uploading && (
              <p className="text-blue-500 text-sm">
                {t('Subiendo imagen...', 'Uploading image...')}
              </p>
            )}
            {editing.image_url && (
              <img
                src={editing.image_url}
                alt="Vista previa"
                className="w-20 h-20 object-contain mt-2 rounded border border-slate-300 dark:border-slate-600"
              />
            )}
          </div>

          {/* 🎚 Nivel */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t('Nivel', 'Level')}: {editing.level}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={editing.level || 50}
              onChange={(e) =>
                setEditing({ ...editing, level: parseInt(e.target.value) })
              }
              className="w-full accent-blue-600"
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setEditing(null)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-300 dark:bg-slate-600 
              text-slate-800 dark:text-white rounded-lg hover:bg-slate-400 dark:hover:bg-slate-500 
              transition-colors"
            >
              <X size={18} />
              {t('Cancelar', 'Cancel')}
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 
              text-white rounded-lg transition-colors"
            >
              <Save size={18} />
              {t('Guardar', 'Save')}
            </button>
          </div>
        </div>
      )}

      {/* Lista de habilidades */}
      <div className="grid md:grid-cols-2 gap-4">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="bg-white dark:bg-slate-800 rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              {skill.image_url && (
                <img
                  src={skill.image_url}
                  alt={skill.name_es}
                  className="w-12 h-12 object-contain rounded"
                />
              )}
              <div>
                <span className="font-medium text-slate-900 dark:text-white">
                  {skill.name_es}
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {skill.category_es}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(skill)}
                className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 
                rounded-lg transition-colors"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => handleDelete(skill.id)}
                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 
                rounded-lg transition-colors"
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
