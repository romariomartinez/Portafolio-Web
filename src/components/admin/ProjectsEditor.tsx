import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { repositories } from '../../repositories';
import { supabase } from '../../lib/supabase';
import { Database } from '../../lib/database.types';

type Project = Database['public']['Tables']['projects']['Row'];

export function ProjectsEditor() {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Partial<Project> | null>(null);
  const [techInput, setTechInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await repositories.project.getAll();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  // 🖼️ Subida de imagen a Supabase
  const handleUploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;
      setUploading(true);

      const fileName = `${Date.now()}-${file.name}`;
      const { error } = await supabase.storage
        .from('projects-images')
        .upload(fileName, file);

      if (error) throw error;

      const {
        data: { publicUrl },
      } = supabase.storage.from('projects-images').getPublicUrl(fileName);

      setEditing({ ...editing, image_url: publicUrl });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error al subir la imagen 😳');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!editing) return;
    try {
      if (editing.id) {
        await repositories.project.update(editing.id, editing);
      } else {
        await repositories.project.create(editing);
      }
      setEditing(null);
      await loadProjects();
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t('¿Eliminar este proyecto?', 'Delete this project?'))) return;
    try {
      await repositories.project.delete(id);
      await loadProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const startEdit = (item: Project | null) => {
    setEditing(
      item || {
        name_es: '',
        name_en: '',
        description_es: '',
        description_en: '',
        technologies: [],
        image_url: '',
        demo_url: '',
        repo_url: '',
        order_index: projects.length,
      }
    );
  };

  const addTechnology = () => {
    if (!techInput.trim() || !editing) return;
    setEditing({
      ...editing,
      technologies: [...(editing.technologies || []), techInput.trim()],
    });
    setTechInput('');
  };

  const removeTechnology = (index: number) => {
    if (!editing) return;
    const newTech = [...(editing.technologies || [])];
    newTech.splice(index, 1);
    setEditing({ ...editing, technologies: newTech });
  };

  if (loading) return <div className="text-center py-8">{t('Cargando...', 'Loading...')}</div>;

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          {t('Gestionar Proyectos', 'Manage Projects')}
        </h3>
        <button
          onClick={() => startEdit(null)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus size={20} />
          {t('Agregar', 'Add')}
        </button>
      </div>

      {/* Formulario */}
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
          </div>

          {/* Descripciones */}
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

          {/* 📦 Subida de imagen */}
          <div className="flex flex-col gap-2">
            <label className="font-medium text-slate-700 dark:text-slate-300">
              {t('Imagen del proyecto', 'Project Image')}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleUploadImage}
              className="text-slate-700 dark:text-slate-300"
            />
            {uploading && (
              <p className="text-blue-500 text-sm">{t('Subiendo imagen...', 'Uploading image...')}</p>
            )}
            {editing.image_url && (
              <img
                src={editing.image_url}
                alt="Vista previa"
                className="w-32 h-20 object-cover mt-2 rounded-lg border border-slate-300 dark:border-slate-600"
              />
            )}
          </div>

          {/* Tecnologías */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t('Tecnologías', 'Technologies')}
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                placeholder={t('Agregar tecnología', 'Add technology')}
                className="flex-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
              <button
                onClick={addTechnology}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus size={20} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {editing.technologies?.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm flex items-center gap-2"
                >
                  {tech}
                  <button onClick={() => removeTechnology(index)} className="hover:text-red-600">
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* URLs */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="url"
              value={editing.demo_url || ''}
              onChange={(e) => setEditing({ ...editing, demo_url: e.target.value })}
              placeholder={t('URL Demo', 'Demo URL')}
              className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
            <input
              type="url"
              value={editing.repo_url || ''}
              onChange={(e) => setEditing({ ...editing, repo_url: e.target.value })}
              placeholder={t('URL Repositorio', 'Repository URL')}
              className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          {/* Botones */}
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

      {/* Lista */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden">
            {project.image_url && (
              <img
                src={project.image_url}
                alt={project.name_es}
                className="w-full h-32 object-cover"
              />
            )}
            <div className="p-4 flex justify-between items-center">
              <h4 className="font-bold text-slate-900 dark:text-white truncate">
                {project.name_es}
              </h4>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(project)}
                  className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
