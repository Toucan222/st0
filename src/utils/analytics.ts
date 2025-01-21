	type EventType = 'page_view' | 'stock_view' | 'analysis_view' | 'error' | 'performance' | 'web_vitals' | 'interaction';
const isDevelopment = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1';
export const trackEvent = async (eventType: EventType, data?: any) => {
  if (!isDevelopment) {
    try {
      const payload = {
        event: eventType,
        timestamp: Date.now(),
        environment: isDevelopment ? 'development' : 'production',
        data,
        userAgent: navigator.userAgent,
        url: window.location.href,
      };
      // For demo purposes, just log the analytics
      console.log('Analytics:', payload);
    } catch (error) {
      console.error('Analytics Error:', error);
    }
  }
};
export const trackError = (error: Error) => {
  trackEvent('error', {
    message: error.message,
    stack: error.stack,
    type: error.name,
    timestamp: Date.now(),
    url: window.location.href,
    userAgent: navigator.userAgent,
  });
};
