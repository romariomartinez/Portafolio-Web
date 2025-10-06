import { useEffect, useState } from 'react';
import { Save, Upload } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { repositories } from '../../repositories';
import { Database } from '../../lib/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];

export function ProfileEditor() {
  const { t } = useLanguage();
  const [profile, setProfile] = useState<Partial<Profile>>({
    full_name: '',
    title_es: '',
    title_en: '',
    bio_es: '',
    bio_en: '',
    photo_url: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    website: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await repositories.profile.getFirst();
      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      if (profile.id) {
        await repositories.profile.update(profile.id, profile);
      } else {
        await repositories.profile.create(profile);
      }
      setMessage(t('Guardado exitosamente', 'Saved successfully'));
      await loadProfile();
    } catch (error) {
      setMessage(t('Error al guardar', 'Error saving'));
      console.error('Error saving profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleImageUrlChange = (url: string) => {
    setProfile({ ...profile, photo_url: url });
  };

  if (loading) {
    return <div className="text-center py-8">{t('Cargando...', 'Loading...')}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            {t('Nombre Completo', 'Full Name')}
          </label>
          <input
            type="text"
            value={profile.full_name || ''}
            onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            {t('Email', 'Email')}
          </label>
          <input
            type="email"
            value={profile.email || ''}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            {t('Teléfono', 'Phone')}
          </label>
          <input
            type="text"
            value={profile.phone || ''}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            {t('Ubicación', 'Location')}
          </label>
          <input
            type="text"
            value={profile.location || ''}
            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            {t('Título (Español)', 'Title (Spanish)')}
          </label>
          <input
            type="text"
            value={profile.title_es || ''}
            onChange={(e) => setProfile({ ...profile, title_es: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            {t('Título (Inglés)', 'Title (English)')}
          </label>
          <input
            type="text"
            value={profile.title_en || ''}
            onChange={(e) => setProfile({ ...profile, title_en: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          {t('Foto de Perfil (URL)', 'Profile Photo (URL)')}
        </label>
        <div className="flex gap-4 items-start">
          <input
            type="url"
            value={profile.photo_url || ''}
            onChange={(e) => handleImageUrlChange(e.target.value)}
            placeholder="https://example.com/photo.jpg"
            className="flex-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
          />
          {profile.photo_url && (
            <img
              src={profile.photo_url}
              alt="Preview"
              className="w-16 h-16 rounded-lg object-cover border-2 border-slate-300 dark:border-slate-600"
            />
          )}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {t('Ingresa la URL de una imagen (ej: desde Unsplash, Pexels, etc.)', 'Enter an image URL (e.g. from Unsplash, Pexels, etc.)')}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          {t('Biografía (Español)', 'Bio (Spanish)')}
        </label>
        <textarea
          value={profile.bio_es || ''}
          onChange={(e) => setProfile({ ...profile, bio_es: e.target.value })}
          rows={4}
          className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          {t('Biografía (Inglés)', 'Bio (English)')}
        </label>
        <textarea
          value={profile.bio_en || ''}
          onChange={(e) => setProfile({ ...profile, bio_en: e.target.value })}
          rows={4}
          className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            LinkedIn
          </label>
          <input
            type="url"
            value={profile.linkedin || ''}
            onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            GitHub
          </label>
          <input
            type="url"
            value={profile.github || ''}
            onChange={(e) => setProfile({ ...profile, github: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Website
          </label>
          <input
            type="url"
            value={profile.website || ''}
            onChange={(e) => setProfile({ ...profile, website: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
          />
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${message.includes('Error') || message.includes('error') ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300' : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'}`}>
          {message}
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
        >
          <Save size={20} />
          {saving ? t('Guardando...', 'Saving...') : t('Guardar', 'Save')}
        </button>
      </div>
    </div>
  );
}
