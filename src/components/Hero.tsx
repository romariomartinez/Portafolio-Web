import { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Globe as GlobeIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { repositories } from '../repositories';
import { Database } from '../lib/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];

export function Hero() {
  const { language, t } = useLanguage();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await repositories.profile.getFirst();
      setProfile(data);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section
        id="home"
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800"
      >
        <div className="animate-pulse text-slate-600 dark:text-slate-400 text-center">
          {t('Cargando...', 'Loading...')}
        </div>
      </section>
    );
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pt-20"
    >
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          
          {/* TEXTOS */}
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
              {profile?.full_name || 'Romario Martinez'}
            </h1>

            <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300">
              {language === 'es' ? profile?.title_es : profile?.title_en}
            </p>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              {language === 'es' ? profile?.bio_es : profile?.bio_en}
            </p>

            {/* CONTACTO */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center md:justify-start gap-3 pt-4">
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center justify-center sm:justify-start space-x-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <Mail size={20} />
                  <span className="text-sm sm:text-base">{profile.email}</span>
                </a>
              )}
              {profile?.phone && (
                <a
                  href={`tel:${profile.phone}`}
                  className="flex items-center justify-center sm:justify-start space-x-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <Phone size={20} />
                  <span className="text-sm sm:text-base">{profile.phone}</span>
                </a>
              )}
              {profile?.location && (
                <div className="flex items-center justify-center sm:justify-start space-x-2 text-slate-600 dark:text-slate-300">
                  <MapPin size={20} />
                  <span className="text-sm sm:text-base">{profile.location}</span>
                </div>
              )}
            </div>

            {/* ICONOS SOCIALES */}
            <div className="flex justify-center md:justify-start gap-4 pt-4">
              {profile?.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-800 dark:bg-slate-700 text-white rounded-lg hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={22} />
                </a>
              )}
              {profile?.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-800 dark:bg-slate-700 text-white rounded-lg hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={22} />
                </a>
              )}
              {profile?.website && (
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-800 dark:bg-slate-700 text-white rounded-lg hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
                  aria-label="Website"
                >
                  <GlobeIcon size={22} />
                </a>
              )}
            </div>
          </div>

          {/* FOTO */}
          <div className="flex justify-center">
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <img
                src={
                  profile?.photo_url ||
                  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400'
                }
                alt={profile?.full_name || 'Profile'}
                className="relative w-full h-full rounded-full object-cover border-8 border-white dark:border-slate-800 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
