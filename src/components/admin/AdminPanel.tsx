import { useState } from 'react';
import { LogOut, User, GraduationCap, Briefcase, Code, FolderGit, Award } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { ProfileEditor } from './ProfileEditor';
import { EducationEditor } from './EducationEditor';
import { ExperienceEditor } from './ExperienceEditor';
import { SkillsEditor } from './SkillsEditor';
import { ProjectsEditor } from './ProjectsEditor';
import { CertificationsEditor } from './CertificationsEditor';

type Tab = 'profile' | 'education' | 'experience' | 'skills' | 'projects' | 'certifications';

export function AdminPanel() {
  const { signOut } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>('profile');

  const tabs = [
    { id: 'profile' as Tab, label: t('Perfil', 'Profile'), icon: User },
    { id: 'education' as Tab, label: t('Educación', 'Education'), icon: GraduationCap },
    { id: 'experience' as Tab, label: t('Experiencia', 'Experience'), icon: Briefcase },
    { id: 'skills' as Tab, label: t('Habilidades', 'Skills'), icon: Code },
    { id: 'projects' as Tab, label: t('Proyectos', 'Projects'), icon: FolderGit },
    { id: 'certifications' as Tab, label: t('Certificaciones', 'Certifications'), icon: Award },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              {t('Panel de Administración', 'Admin Panel')}
            </h1>
            <button
              onClick={signOut}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              <LogOut size={18} />
              {t('Cerrar Sesión', 'Sign Out')}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-slate-200 dark:border-slate-700">
            <nav className="flex overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon size={20} />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'profile' && <ProfileEditor />}
            {activeTab === 'education' && <EducationEditor />}
            {activeTab === 'experience' && <ExperienceEditor />}
            {activeTab === 'skills' && <SkillsEditor />}
            {activeTab === 'projects' && <ProjectsEditor />}
            {activeTab === 'certifications' && <CertificationsEditor />}
          </div>
        </div>
      </div>
    </div>
  );
}
