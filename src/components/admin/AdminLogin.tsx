import { useState, FormEvent } from 'react';
import { LogIn } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

export function AdminLogin() {
  const { signIn } = useAuth();
  const { t } = useLanguage();

  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const { error } = await signIn(form.email, form.password);
      if (error) throw new Error('invalid_credentials');
    } catch {
      setStatus('error');
      setErrorMessage(t('Credenciales inválidas', 'Invalid credentials'));
    } finally {
      setStatus('idle');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-6">
      <section className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
        <header className="flex flex-col items-center mb-8">
          <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full">
            <LogIn className="text-blue-600 dark:text-blue-400" size={32} />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white text-center">
            {t('Panel de Administración', 'Admin Panel')}
          </h1>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {['email', 'password'].map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >
                {field === 'email'
                  ? t('Correo Electrónico', 'Email')
                  : t('Contraseña', 'Password')}
              </label>
              <input
                id={field}
                type={field}
                value={form[field as 'email' | 'password']}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoComplete={field}
              />
            </div>
          ))}

          {status === 'error' && (
            <p className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg text-sm text-center">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading'
              ? t('Iniciando...', 'Signing in...')
              : t('Iniciar Sesión', 'Sign In')}
          </button>
        </form>
      </section>
    </main>
  );
}
