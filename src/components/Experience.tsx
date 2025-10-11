import { useEffect, useState } from 'react';
import { Briefcase } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { repositories } from '../repositories';
import { Database } from '../lib/database.types';

type Experience = Database['public']['Tables']['experience']['Row'];

export function Experience() {
  const { language, t } = useLanguage();
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExperience();
  }, []);

  const loadExperience = async () => {
    try {
      const data = await repositories.experience.getAll();
      setExperience(data);
    } catch (error) {
      console.error('Error loading experience:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="experience" className="py-20 bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2
  className="text-3xl sm:text-4xl font-semibold tracking-tight 
  text-slate-900 dark:text-white mb-10 text-center transition-colors duration-300"
  style={{ fontFamily: 'Poppins, sans-serif' }}
>
  {t('Experiencia Laboral', 'Work Experience')}
</h2>


          {loading ? (
            <div className="text-center text-slate-600 dark:text-slate-400">
              {t('Cargando...', 'Loading...')}
            </div>
          ) : (
            <div className="space-y-8">
              {experience.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-slate-900 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-teal-100 dark:bg-teal-900 rounded-lg">
                      <Briefcase className="text-teal-600 dark:text-teal-400" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        {language === 'es' ? item.position_es : item.position_en}
                      </h3>
                      <p className="text-lg text-slate-600 dark:text-slate-300 mb-2">
                        {language === 'es' ? item.company_es : item.company_en}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                        {item.start_date} - {item.end_date}
                      </p>
                      {(item.description_es || item.description_en) && (
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                          {language === 'es' ? item.description_es : item.description_en}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
