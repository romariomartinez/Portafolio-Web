// Skeleton para tarjetas de proyectos
export function ProjectCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg">
      <div className="w-full h-56 bg-slate-200 dark:bg-slate-700 animate-pulse" />
      <div className="p-6 space-y-3">
        <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        <div className="flex gap-2 pt-2">
          <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />
          <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}

// Skeleton para habilidades
export function SkillCardSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center bg-white dark:bg-slate-800/80 rounded-2xl shadow-md p-5 w-36 h-44">
      <div className="w-14 h-14 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse mb-3" />
      <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-2" />
      <div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
      <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-3 animate-pulse" />
    </div>
  );
}

// Skeleton para experiencia/educación
export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse">
          <div className="w-6 h-6 bg-slate-300 dark:bg-slate-600 rounded" />
        </div>
        <div className="flex-1 space-y-3">
          <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="h-5 w-1/2 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

// Skeleton para sección Hero
export function HeroSkeleton() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pt-20">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <div className="h-12 w-3/4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mx-auto md:mx-0" />
            <div className="h-8 w-1/2 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mx-auto md:mx-0" />
            <div className="h-6 w-full bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            <div className="h-6 w-2/3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          </div>
          <div className="flex justify-center">
            <div className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}

// Skeleton para certificaciones
export function CertificationSkeleton() {
  return (
    <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse">
          <div className="w-6 h-6 bg-slate-300 dark:bg-slate-600 rounded" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="h-5 w-3/4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          <div className="h-3 w-1/4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

// Grid de skeletons para proyectos
export function ProjectsGridSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  );
}

// Grid de skeletons para habilidades
export function SkillsGridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 sm:gap-4 justify-items-center">
      {[...Array(12)].map((_, i) => (
        <SkillCardSkeleton key={i} />
      ))}
    </div>
  );
}
