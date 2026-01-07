import React, { useEffect } from 'react';
import { trackEvent } from '../utils/behaviorTracking';
import { useTracking, useFormTracking } from '../utils/trackingHooks';

// Componente para tracking de botões
interface TrackingButtonProps {
  children: React.ReactNode;
  trackingType: string;
  trackingData?: Record<string, unknown>;
  onClick?: () => void;
  className?: string;
}

export const TrackingButton: React.FC<TrackingButtonProps> = ({
  children,
  trackingType,
  trackingData = {},
  onClick,
  className,
  ...props
}) => {
  const handleClick = () => {
    // Rastrear clique no botão
    trackEvent(`button_${trackingType}`, {
      buttonText: typeof children === 'string' ? children : 'complex_content',
      ...trackingData
    });

    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={className}
      onClick={handleClick}
      data-track="button"
      data-track-type={trackingType}
      {...props}
    >
      {children}
    </button>
  );
};

// Componente para tracking de seções
interface TrackingSectionProps {
  children: React.ReactNode;
  sectionName: string;
  className?: string;
}

export const TrackingSection: React.FC<TrackingSectionProps> = ({
  children,
  sectionName,
  className,
  ...props
}) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackEvent('section_viewed', {
              sectionName,
              visibilityRatio: entry.intersectionRatio,
              timestamp: Date.now()
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    const element = document.querySelector(`[data-section="${sectionName}"]`);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [sectionName]);

  return (
    <div
      className={className}
      data-track="section"
      data-section={sectionName}
      {...props}
    >
      {children}
    </div>
  );
};

// Exemplo de uso em um componente
export const ExampleComponent: React.FC = () => {
  const { trackEvent: track } = useTracking();
  const formTracking = useFormTracking('newsletter_signup');

  const handleNewsletterSubmit = async (email: string) => {
    formTracking.trackFormStart();
    
    try {
      // Simular envio do formulário
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        formTracking.trackFormSubmit(true, { email });
        track('newsletter_success', { email });
      } else {
        formTracking.trackFormError('server_error');
      }
    } catch (error) {
      formTracking.trackFormError('network_error');
    }
  };

  return (
    <TrackingSection sectionName="newsletter" className="newsletter-section">
      <h2>Newsletter</h2>
      
      <TrackingButton
        trackingType="newsletter_cta"
        trackingData={{ location: 'hero_section' }}
        onClick={() => handleNewsletterSubmit('test@email.com')}
      >
        Assinar Newsletter
      </TrackingButton>

      <TrackingButton
        trackingType="demo_request"
        trackingData={{ 
          location: 'newsletter_section',
          priority: 'high'
        }}
        onClick={() => {
          track('demo_request_clicked', {
            source: 'newsletter_section'
          });
        }}
      >
        Solicitar Demo
      </TrackingButton>
    </TrackingSection>
  );
};