// Analytics utility for tracking user interactions
// Supports Google Analytics, Plausible, or custom analytics

type EventCategory = 
  | 'engagement' 
  | 'navigation' 
  | 'project' 
  | 'contact' 
  | 'social';

type EventAction = 
  | 'click' 
  | 'scroll' 
  | 'submit' 
  | 'view';

interface AnalyticsEvent {
  category: EventCategory;
  action: EventAction;
  label?: string;
  value?: number;
}

class Analytics {
  private initialized = false;
  private analyticsId: string | null = null;

  // Initialize analytics (call this in App.tsx)
  init(analyticsId?: string) {
    this.analyticsId = analyticsId || import.meta.env.VITE_GA_MEASUREMENT_ID || null;
    this.initialized = true;

    if (this.analyticsId) {
      // Load Google Analytics
      this.loadGoogleAnalytics();
    }
  }

  private loadGoogleAnalytics() {
    if (!this.analyticsId) return;

    // Google Analytics 4
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.analyticsId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    }
    gtag('js', new Date());
    gtag('config', this.analyticsId);
  }

  // Track custom events
  trackEvent({ category, action, label, value }: AnalyticsEvent) {
    if (!this.initialized) {
      console.warn('Analytics not initialized');
      return;
    }

    // Google Analytics event
    if (this.analyticsId && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    }

    // Console log for development
    if (import.meta.env.DEV) {
      console.log('[Analytics]', { category, action, label, value });
    }
  }

  // Track page views
  trackPageView(path: string, title: string) {
    if (!this.initialized) return;

    if (this.analyticsId && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: path,
        page_title: title
      });
    }

    if (import.meta.env.DEV) {
      console.log('[Analytics] Page View:', { path, title });
    }
  }

  // Track outbound links
  trackOutboundLink(url: string, category: string = 'external') {
    this.trackEvent({
      category: 'navigation',
      action: 'click',
      label: `${category}: ${url}`
    });
  }

  // Track project views
  trackProjectView(projectName: string) {
    this.trackEvent({
      category: 'project',
      action: 'view',
      label: projectName
    });
  }

  // Track project demo clicks
  trackProjectDemoClick(projectName: string) {
    this.trackEvent({
      category: 'project',
      action: 'click',
      label: `${projectName} - demo`
    });
  }

  // Track project code clicks
  trackProjectCodeClick(projectName: string) {
    this.trackEvent({
      category: 'project',
      action: 'click',
      label: `${projectName} - code`
    });
  }

  // Track contact form submissions
  trackContactFormSubmit(success: boolean) {
    this.trackEvent({
      category: 'contact',
      action: 'submit',
      label: success ? 'success' : 'error'
    });
  }

  // Track social media clicks
  trackSocialClick(platform: string) {
    this.trackEvent({
      category: 'social',
      action: 'click',
      label: platform
    });
  }

  // Track scroll depth
  private scrollDepthTracked = false;
  trackScrollDepth() {
    if (this.scrollDepthTracked) return;

    const trackDepth = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      if (scrollPercent >= 25 && scrollPercent <= 100) {
        this.trackEvent({
          category: 'engagement',
          action: 'scroll',
          label: `${scrollPercent}%`
        });

        if (scrollPercent === 100) {
          this.scrollDepthTracked = true;
        }
      }
    };

    window.addEventListener('scroll', trackDepth, { passive: true });
  }
}

// Declare gtag globally
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

// Export singleton instance
export const analytics = new Analytics();

// Hook for React components
export function useAnalytics() {
  return analytics;
}
