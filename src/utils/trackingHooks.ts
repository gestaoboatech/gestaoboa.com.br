import { useEffect } from 'react';
import { trackEvent, trackConversion, setUserId } from './behaviorTracking';

// Hook personalizado para tracking
export const useTracking = () => {
  useEffect(() => {
    // Rastrear entrada na página
    trackEvent('page_enter', {
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      timestamp: Date.now()
    });

    return () => {
      // Rastrear saída da página
      trackEvent('page_exit', {
        timestamp: Date.now()
      });
    };
  }, []);

  return {
    trackEvent,
    trackConversion,
    setUserId
  };
};

// Hook para tracking de formulários
export const useFormTracking = (formName: string) => {
  const trackFormStart = () => {
    trackEvent('form_start', {
      formName,
      timestamp: Date.now()
    });
  };

  const trackFormField = (fieldName: string, fieldType: string) => {
    trackEvent('form_field_interaction', {
      formName,
      fieldName,
      fieldType,
      timestamp: Date.now()
    });
  };

  const trackFormSubmit = (success: boolean, data?: Record<string, unknown>) => {
    trackEvent('form_submit', {
      formName,
      success,
      timestamp: Date.now(),
      ...data
    });

    if (success) {
      trackConversion('form_submission', 1);
    }
  };

  const trackFormError = (errorType: string, fieldName?: string) => {
    trackEvent('form_error', {
      formName,
      errorType,
      fieldName,
      timestamp: Date.now()
    });
  };

  return {
    trackFormStart,
    trackFormField,
    trackFormSubmit,
    trackFormError
  };
};