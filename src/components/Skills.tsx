import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { repositories } from '../repositories';
import { Database } from '../lib/database.types';

type Skill = Database['public']['Tables']['skills']['Row'] & {
  image_url?: string;
};

export function Skills() {
  const { language, t } = useLanguage();
  const [skills, setSkills] = useState<Skill[]>([]);
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

  const groupedSkills = skills.reduce((acc, skill) => {
    const category = language === 'es' ? skill.category_es : skill.category_en;
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <section id="skills" className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">
            {t('Habilidades', 'Skills')}
          </h2>

          {loading ? (
            <div className="text-slate-400">{t('Cargando...', 'Loading...')}</div>
          ) : (
            <div className="space-y-16">
              {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                <div key={category}>
                  <h3 className="text-2xl font-semibold mb-8 text-blue-400">
                    {category}
                  </h3>

                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 sm:gap-8 justify-items-center place-items-center">

                   {categorySkills.map((skill) => (
  <div
    key={skill.id}
    className="group flex flex-col items-center justify-center 
    bg-slate-800/80 dark:bg-slate-800 backdrop-blur-sm 
    rounded-2xl shadow-lg hover:shadow-blue-500/20 
    p-5 w-36 h-44 sm:w-40 sm:h-48 transition-all duration-300 
    hover:-translate-y-2 hover:scale-[1.03]"
  >
    {/* Logo */}
    {skill.image_url ? (
      <img
        src={skill.image_url}
        alt={skill.name_es}
        className="w-14 h-14 object-contain mb-3 transition-transform duration-300 group-hover:scale-110"
      />
    ) : (
      <div className="w-14 h-14 flex items-center justify-center mb-3 text-slate-500">
        🧩
      </div>
    )}

    {/* Nombre y categoría */}
    <h4 className="text-sm font-semibold text-white text-center uppercase tracking-wide">
      {language === 'es' ? skill.name_es : skill.name_en}
    </h4>
    <p className="text-xs text-slate-400 text-center mb-2">
      {language === 'es' ? skill.category_es : skill.category_en}
    </p>

    {/* Barra de progreso */}
    <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden mb-1">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-700 ease-out"
        style={{ width: `${skill.level}%` }}
      ></div>
    </div>
    <span className="text-[11px] text-slate-300 font-medium">{skill.level}%</span>
  </div>
))}

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
