import { useEffect, useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { repositories } from '../repositories';
import { Database } from '../lib/database.types';

type Education = Database['public']['Tables']['education']['Row'];

export function Education() {
  const { language, t } = useLanguage();
  const [education, setEducation] = useState<Education[]>([]);
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

  return (
    <section id="education" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center">
            {t('Educación', 'Education')}
          </h2>

          {loading ? (
            <div className="text-center text-slate-600 dark:text-slate-400">
              {t('Cargando...', 'Loading...')}
            </div>
          ) : (
            <div className="space-y-8">
              {education.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <GraduationCap className="text-blue-600 dark:text-blue-400" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        {language === 'es' ? item.degree_es : item.degree_en}
                      </h3>
                      <p className="text-lg text-slate-600 dark:text-slate-300 mb-2">
                        {language === 'es' ? item.institution_es : item.institution_en}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                        {item.start_date} - {item.end_date}
                      </p>
                      {(item.description_es || item.description_en) && (
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
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
