import { useEffect, useState } from 'react';
import { Moon, Sun, Globe, Menu, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => setLanguage(language === 'es' ? 'en' : 'es');

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const section = document.querySelector(targetId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false); // cerrar menú en móvil al hacer clic
  };

  const navLinks = [
    { href: '#about', label: t('Sobre Mí', 'About') },
    { href: '#education', label: t('Educación', 'Education') },
    { href: '#experience', label: t('Experiencia', 'Experience') },
    { href: '#skills', label: t('Habilidades', 'Skills') },
    { href: '#projects', label: t('Proyectos', 'Projects') },
    { href: '#certifications', label: t('Certificaciones', 'Certifications') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md py-2 border-b border-slate-200 dark:border-slate-700'
          : 'bg-transparent py-4'
      }`}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between transition-all duration-300">
        {/* LOGO */}
        <a
          href="#home"
          onClick={(e) => handleSmoothScroll(e, '#home')}
          className={`transition-all duration-300 transform ${
            scrolled ? 'scale-95' : 'scale-100'
          } hover:scale-105`}
        >
          <img
            src="/logo.png"
            alt="Logo Romario Martinez"
            className={`w-10 h-10 rounded-full object-contain transition-all duration-300 ${
              theme === 'light' ? 'invert' : ''
            }`}
          />
        </a>

        {/* NAV LINKS - escritorio */}
        <ul className="hidden md:flex items-center space-x-8">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => handleSmoothScroll(e, href)}
                className="relative text-slate-600 dark:text-slate-300 
                hover:text-blue-600 dark:hover:text-blue-400 
                transition-all duration-200 after:absolute after:left-0 after:bottom-[-2px] 
                after:h-[2px] after:w-0 after:bg-blue-500 dark:after:bg-blue-400 
                hover:after:w-full after:transition-all after:duration-300"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* BOTONES DE ACCIÓN */}
        <div className="flex items-center space-x-3">
          {/* IDIOMA */}
          <button
            onClick={toggleLanguage}
            className="hidden sm:flex items-center px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 
            text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 
            transition-all duration-200 transform hover:scale-105 active:scale-95"
            aria-label="Cambiar idioma"
          >
            <Globe size={18} />
            <span className="ml-2 text-sm font-semibold">
              {language.toUpperCase()}
            </span>
          </button>

          {/* TEMA */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 
            text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 
            transition-all duration-200 transform hover:rotate-12 hover:scale-110 active:scale-95"
            aria-label="Cambiar tema"
          >
            {theme === 'light' ? (
              <Moon size={18} className="transition-transform duration-200" />
            ) : (
              <Sun size={18} className="text-yellow-400 transition-transform duration-200" />
            )}
          </button>

          {/* MENÚ HAMBURGUESA (solo móvil) */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* MENÚ MÓVIL */}
      {menuOpen && (
        <div
          className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-700 mt-2
          animate-[slideDown_0.3s_ease-out]"
        >
          <ul className="flex flex-col items-center space-y-4 py-6">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => handleSmoothScroll(e, href)}
                  className="block text-lg text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}

            {/* IDIOMA en móvil */}
            <button
              onClick={toggleLanguage}
              className="flex items-center px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 
              text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 
              transition-all duration-200"
            >
              <Globe size={18} />
              <span className="ml-2 text-sm font-semibold">
                {language.toUpperCase()}
              </span>
            </button>
          </ul>
        </div>
      )}
    </header>
  );
}
