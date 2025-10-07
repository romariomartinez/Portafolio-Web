import { Moon, Sun, Globe } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <a href="#home" className="text-2xl font-bold text-slate-800 dark:text-white">
            RM
          </a>

          {/* NAV LINKS */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#about"
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              {t('Sobre Mí', 'About')}
            </a>
            <a
              href="#education"
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              {t('Educación', 'Education')}
            </a>
            <a
              href="#experience"
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              {t('Experiencia', 'Experience')}
            </a>
            <a
              href="#skills"
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              {t('Habilidades', 'Skills')}
            </a>
            <a
              href="#projects"
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              {t('Proyectos', 'Projects')}
            </a>
            {/* NUEVO LINK */}
            <a
              href="#certifications"
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              {t('Certificaciones', 'Certifications')}
            </a>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center space-x-4">
            {/* CAMBIO DE IDIOMA */}
            <button
              onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
              className="flex items-center px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle language"
            >
              <Globe size={20} />
              <span className="ml-2 text-sm font-medium">{language.toUpperCase()}</span>
            </button>

            {/* CAMBIO DE TEMA */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
