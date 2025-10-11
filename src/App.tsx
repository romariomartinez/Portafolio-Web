import { useMemo } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Education } from "./components/Education";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Certifications } from "./components/Certifications";
import { AdminLogin } from "./components/admin/AdminLogin";
import { AdminPanel } from "./components/admin/AdminPanel";


function AppContent() {
  const { user, loading } = useAuth();

  // Memoiza el valor para evitar recomputar en cada render
  const isAdminRoute = useMemo(
    () => window.location.pathname.startsWith("/admin"),
    []
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <p className="text-slate-600 dark:text-slate-400 animate-pulse">
          Cargando...
        </p>
      </div>
    );
  }

  // Admin zone
  if (isAdminRoute) {
    return user ? <AdminPanel /> : <AdminLogin />;
  }

  // Public portfolio
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Education />
        <Experience />
        <Skills />
        <Projects />
        <Certifications />
      </main>

      <footer className="bg-slate-900 dark:bg-black text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-slate-400 text-sm tracking-wide">
            &copy; {new Date().getFullYear()} Romario Martinez. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
