import { useEffect, useState } from 'react';
import { Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { repositories } from '../repositories';
import { Database } from '../lib/database.types';

type Certification = Database['public']['Tables']['certifications']['Row'];

export function Certifications() {
  const { language, t } = useLanguage();
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading || certifications.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center">
            {t('Certificaciones', 'Certifications')}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-100 dark:bg-amber-900 rounded-lg">
                    <Award className="text-amber-600 dark:text-amber-400" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {language === 'es' ? cert.name_es : cert.name_en}
                    </h3>
                    {(cert.issuer_es || cert.issuer_en) && (
                      <p className="text-slate-600 dark:text-slate-300 mb-1">
                        {language === 'es' ? cert.issuer_es : cert.issuer_en}
                      </p>
                    )}
                    {cert.date && (
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {cert.date}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
