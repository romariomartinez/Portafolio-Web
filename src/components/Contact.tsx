import { useState, useEffect, FormEvent } from 'react';
import { Send, Mail, MapPin, Phone, Linkedin, Github, Globe as GlobeIcon, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { repositories } from '../repositories';
import { Database } from '../lib/database.types';
import { motion } from 'framer-motion';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function Contact() {
  const { language, t } = useLanguage();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Cargar perfil para obtener información de contacto
  useEffect(() => {
    repositories.profile.getFirst().then(setProfile).catch(console.error);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      // Usar FormSubmit (más confiable)
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('_to', 'romariomartiinez@gmail.com');
      formDataToSend.append('_subject', formData.subject);
      
      await fetch('https://formsubmit.co/ajax/romariomartiinez@gmail.com', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Resetear después de 5 segundos
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setErrorMessage(language === 'es' 
        ? 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.' 
        : 'Error sending message. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 dark:bg-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl font-semibold tracking-tight 
            text-slate-900 dark:text-white mb-10 text-center transition-colors duration-300"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {t('Contacto', 'Contact')}
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Información de contacto */}
            <div className="space-y-6">
              <p className="text-lg text-slate-600 dark:text-slate-300">
                {t(
                  '¿Tienes alguna pregunta o quieres trabajar juntos? No dudes en contactarme.',
                  'Do you have any questions or want to work together? Feel free to contact me.'
                )}
              </p>

              <div className="space-y-4">
                {profile?.email && (
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <Mail size={20} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <a href={`mailto:${profile.email}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {profile.email}
                    </a>
                  </div>
                )}

                {profile?.phone && (
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <Phone size={20} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <a href={`tel:${profile.phone}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {profile.phone}
                    </a>
                  </div>
                )}

                {profile?.location && (
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <MapPin size={20} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <span>{profile.location}</span>
                  </div>
                )}
              </div>

              {/* Redes sociales */}
              <div className="pt-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                  {t('Sígueme en redes sociales', 'Follow me on social media')}
                </h3>
                <div className="flex gap-3">
                  {profile?.linkedin && (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-slate-800 dark:bg-slate-700 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={22} />
                    </a>
                  )}
                  {profile?.github && (
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-slate-800 dark:bg-slate-700 text-white rounded-lg hover:bg-slate-700 transition-colors"
                      aria-label="GitHub"
                    >
                      <Github size={22} />
                    </a>
                  )}
                  {profile?.website && (
                    <a
                      href={profile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-slate-800 dark:bg-slate-700 text-white rounded-lg hover:bg-slate-700 transition-colors"
                      aria-label="Website"
                    >
                      <GlobeIcon size={22} />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Formulario de contacto */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                    >
                      {t('Nombre', 'Name')} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      minLength={2}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 
                        bg-white dark:bg-slate-700 text-slate-900 dark:text-white 
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        placeholder-slate-400 dark:placeholder-slate-500"
                      placeholder={t('Tu nombre', 'Your name')}
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                    >
                      {t('Correo electrónico', 'Email')} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 
                        bg-white dark:bg-slate-700 text-slate-900 dark:text-white 
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        placeholder-slate-400 dark:placeholder-slate-500"
                      placeholder="tu@email.com"
                      aria-required="true"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                  >
                    {t('Asunto', 'Subject')} *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    minLength={3}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 
                      bg-white dark:bg-slate-700 text-slate-900 dark:text-white 
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      placeholder-slate-400 dark:placeholder-slate-500"
                    placeholder={t('Asunto del mensaje', 'Message subject')}
                    aria-required="true"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                  >
                    {t('Mensaje', 'Message')} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    minLength={10}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 
                      bg-white dark:bg-slate-700 text-slate-900 dark:text-white 
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      placeholder-slate-400 dark:placeholder-slate-500 resize-none"
                    placeholder={t('Tu mensaje...', 'Your message...')}
                    aria-required="true"
                  />
                </div>

                {/* Mensajes de estado */}
                {status === 'success' && (
                  <div 
                    role="alert"
                    className="flex items-center gap-2 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg"
                  >
                    <CheckCircle size={20} />
                    <span>
                      {t('¡Mensaje enviado con éxito! Te responderé pronto.', 'Message sent successfully! I will reply soon.')}
                    </span>
                  </div>
                )}

                {status === 'error' && (
                  <div 
                    role="alert"
                    className="flex items-center gap-2 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg"
                  >
                    <AlertCircle size={20} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 
                    bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg 
                    transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                    focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {t('Enviando...', 'Sending...')}
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      {t('Enviar mensaje', 'Send message')}
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
