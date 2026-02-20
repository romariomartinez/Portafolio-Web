import { useEffect, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { repositories } from '../repositories';
import { Database } from '../lib/database.types';

type Project = Database['public']['Tables']['projects']['Row'];

export function Projects() {
  const { language, t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <section id="projects" className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
         <h2
  className="text-3xl sm:text-4xl font-semibold tracking-tight 
  text-slate-900 dark:text-white mb-6 transition-colors duration-300"
  style={{ fontFamily: 'Poppins, sans-serif' }}
>
  {t('Proyectos', 'Projects')}
</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            {t(
              'Algunos de mis desarrollos más destacados — modernos, escalables y funcionales.',
              'Some of my most notable works — modern, scalable and functional.'
            )}
          </p>
        </div>

        {loading ? (
          <div className="text-center text-slate-600 dark:text-slate-400 animate-pulse">
            {t('Cargando proyectos...', 'Loading projects...')}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Imagen */}
                {project.image_url && (
                  <div className="relative">
                    <img
                      src={project.image_url}
                      alt={language === 'es' ? project.name_es : project.name_en}
                      className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                    {/* Overlay con blur */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 backdrop-blur-sm flex flex-col items-center justify-center gap-3 transition-all duration-300">
                      {project.demo_url && (
                        <a
                          href={project.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                          <ExternalLink size={18} />
                          {t('Demo', 'Demo')}
                        </a>
                      )}
                      {project.repo_url && (
                        <a
                          href={project.repo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg transition-colors"
                        >
                          <Github size={18} />
                          {t('Código', 'Code')}
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Contenido */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {language === 'es' ? project.name_es : project.name_en}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm leading-relaxed">
                    {language === 'es' ? project.description_es : project.description_en}
                  </p>

                  {/* Tecnologías */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
