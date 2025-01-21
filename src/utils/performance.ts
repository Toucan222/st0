import { trackEvent } from './analytics';

const isDevelopment = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1';

export const measurePerformance = (metric: string) => {
  if (!isDevelopment) {
    try {
      const startTime = performance.now();
      performance.mark(`${metric}-start`);
      return () => {
        performance.mark(`${metric}-end`);
        performance.measure(metric, `${metric}-start`, `${metric}-end`);
        const duration = performance.now() - startTime;
        trackEvent('performance', {
          metric,
          duration,
          timestamp: Date.now(),
        });
      };
    } catch (error) {
      console.error('Performance Measurement Error:', error);
    }
  }
  return () => {};
};

export const reportWebVitals = (metric: any) => {
  if (!isDevelopment) {
    try {
      const { id, name, value, rating } = metric;
      trackEvent('web_vitals', {
        metric_id: id,
        name,
        value: Math.round(name === 'CLS' ? value * 1000 : value),
        rating,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error('Web Vitals Error:', error);
    }
  }
};

export const measureInteraction = (name: string) => {
  if (!isDevelopment) {
    try {
      const entry = new PerformanceEventTiming();
      entry.name = name;
      entry.entryType = 'interaction';
      entry.startTime = performance.now();
      return () => {
        entry.duration = performance.now() - entry.startTime;
        trackEvent('interaction', {
          name,
          duration: entry.duration,
          timestamp: Date.now(),
        });
      };
    } catch (error) {
      console.error('Interaction Measurement Error:', error);
    }
  }
  return () => {};
};
