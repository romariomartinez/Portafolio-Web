import { useEffect, useState } from 'react';
import { Award, FileText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { repositories } from '../repositories';
import { Database } from '../lib/database.types';

type Certification = Database['public']['Tables']['certifications']['Row'] & {
  pdf_url?: string;
};

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
    <section id="certifications" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2
  className="text-3xl sm:text-4xl font-semibold tracking-tight 
  text-slate-900 dark:text-white mb-10 text-center transition-colors duration-300"
  style={{ fontFamily: 'Poppins, sans-serif' }}
>
  {t('Certificaciones', 'Certifications')}
</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                onClick={() => cert.pdf_url && window.open(cert.pdf_url, '_blank')}
                onKeyDown={(e) => e.key === 'Enter' && cert.pdf_url && window.open(cert.pdf_url, '_blank')}
                role="button"
                tabIndex={0}
                aria-label={cert.pdf_url ? (language === 'es' ? `Ver certificado: ${cert.name_es}` : `View certificate: ${cert.name_en}`) : undefined}
                className={`cursor-pointer bg-slate-50 dark:bg-slate-800 rounded-xl p-6 
                hover:shadow-blue-500/20 transition-all duration-300 border border-transparent 
                hover:border-blue-500/40 group`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-100 dark:bg-amber-900 rounded-lg group-hover:scale-105 transition-transform duration-200">
                    <Award className="text-amber-600 dark:text-amber-400" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-400">
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
                    {cert.pdf_url && (
                      <div className="flex items-center gap-2 mt-3 text-blue-500 text-sm font-medium">
                        <FileText size={16} />
                        <span>{t('Ver certificado', 'View certificate')}</span>
                      </div>
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
