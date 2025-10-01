import { useState, useCallback, useEffect } from 'react';

interface ScrollNavigationOptions {
  navbarHeight?: number;
  additionalOffset?: number;
  scrollDuration?: number;
  debounceDelay?: number;
}

interface ScrollNavigationReturn {
  navigateToSection: (sectionId: string) => void;
  navigateToPage: (page: 'home' | 'events' | 'news', onNavigate?: (page: 'home' | 'events' | 'news') => void) => void;
  getCurrentSection: () => string | null;
  isScrolling: boolean;
}

const SCROLL_CONFIG = {
  NAVBAR_HEIGHT: 80, // h-20 in Tailwind (20 * 4px = 80px)
  ADDITIONAL_OFFSET: 20, // Safety margin
  SCROLL_DURATION: 800,
  DEBOUNCE_DELAY: 100,
  NAVIGATION_DELAY: 150, // Time to complete page navigation
  MOBILE_DELAY: 200, // Additional delay for mobile
};

const SECTION_IDS = ['music', 'videos', 'bio', 'gallery', 'newsletter', 'contact'];

export const useScrollNavigation = (options: ScrollNavigationOptions = {}): ScrollNavigationReturn => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [currentSection, setCurrentSection] = useState<string | null>(null);

  const config = {
    navbarHeight: options.navbarHeight || SCROLL_CONFIG.NAVBAR_HEIGHT,
    additionalOffset: options.additionalOffset || SCROLL_CONFIG.ADDITIONAL_OFFSET,
    scrollDuration: options.scrollDuration || SCROLL_CONFIG.SCROLL_DURATION,
    debounceDelay: options.debounceDelay || SCROLL_CONFIG.DEBOUNCE_DELAY,
  };

  // Detect if user is on mobile device
  const isMobile = useCallback(() => {
    return window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }, []);

  // Calculate precise scroll position for a section
  const calculateScrollPosition = useCallback((sectionElement: HTMLElement): number => {
    const elementTop = sectionElement.offsetTop;
    const elementStyles = window.getComputedStyle(sectionElement);
    const sectionPaddingTop = parseInt(elementStyles.paddingTop) || 0;
    const borderTopWidth = parseInt(elementStyles.borderTopWidth) || 0;
    
    // Adjust for sections with significant top padding (we now use pt-24 = 96px)
    const paddingAdjustment = sectionPaddingTop > 60 ? Math.floor(sectionPaddingTop / 3) : 0;
    
    // Account for the border we added
    const borderAdjustment = borderTopWidth > 0 ? borderTopWidth : 0;
    
    // Calculate final position with improved precision
    const finalPosition = Math.max(0, 
      elementTop - config.navbarHeight - config.additionalOffset + paddingAdjustment - borderAdjustment
    );

    console.log('📐 Scroll calculation:', {
      sectionId: sectionElement.id,
      elementTop,
      sectionPaddingTop,
      borderTopWidth,
      paddingAdjustment,
      borderAdjustment,
      navbarHeight: config.navbarHeight,
      additionalOffset: config.additionalOffset,
      finalPosition
    });

    return finalPosition;
  }, [config.navbarHeight, config.additionalOffset]);

  // Check if smooth scroll is supported
  const isSmoothScrollSupported = useCallback(() => {
    return 'scrollBehavior' in document.documentElement.style;
  }, []);

  // Smooth scroll to position with proper timing and error handling
  const smoothScrollTo = useCallback((position: number, callback?: () => void) => {
    // Validate position
    if (!isFinite(position) || position < 0) {
      console.error('❌ Invalid scroll position:', position);
      position = 0;
    }

    setIsScrolling(true);
    
    try {
      // Use native smooth scroll if supported
      if (isSmoothScrollSupported()) {
        window.scrollTo({
          top: position,
          behavior: 'smooth'
        });
        
        // Estimate scroll completion time
        const scrollDistance = Math.abs(window.scrollY - position);
        const estimatedDuration = Math.min(config.scrollDuration, Math.max(300, scrollDistance * 1.5));
        
        setTimeout(() => {
          setIsScrolling(false);
          callback?.();
        }, estimatedDuration);
      } else {
        // Fallback for browsers without smooth scroll support
        console.log('🔄 Using smooth scroll polyfill');
        const startPosition = window.scrollY;
        const distance = position - startPosition;
        const duration = config.scrollDuration;
        let startTime: number | null = null;
        let animationId: number;

        const animateScroll = (currentTime: number) => {
          try {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
            const easedProgress = easeInOutCubic(progress);
            
            const currentPosition = startPosition + distance * easedProgress;
            window.scrollTo(0, currentPosition);
            
            if (progress < 1) {
              animationId = requestAnimationFrame(animateScroll);
            } else {
              setIsScrolling(false);
              callback?.();
            }
          } catch (error) {
            console.error('❌ Error during scroll animation:', error);
            // Fallback: immediate scroll
            window.scrollTo(0, position);
            setIsScrolling(false);
            callback?.();
          }
        };
        
        animationId = requestAnimationFrame(animateScroll);
        
        // Cleanup function in case component unmounts during animation
        return () => {
          if (animationId) {
            cancelAnimationFrame(animationId);
          }
        };
      }
    } catch (error) {
      console.error('❌ Error during smooth scroll:', error);
      // Ultimate fallback: immediate scroll
      try {
        window.scrollTo(0, position);
      } catch (scrollError) {
        console.error('❌ Even basic scroll failed:', scrollError);
      }
      setIsScrolling(false);
      callback?.();
    }
  }, [config.scrollDuration, isSmoothScrollSupported]);

  // Navigate to a specific section
  const navigateToSection = useCallback((sectionId: string) => {
    console.log('🧭 Navigating to section:', sectionId);
    
    // Validate section ID
    if (!sectionId || typeof sectionId !== 'string') {
      console.error('❌ Invalid section ID:', sectionId);
      return;
    }

    const targetElement = document.getElementById(sectionId);
    if (!targetElement) {
      console.error('❌ Section not found:', sectionId);
      // Fallback: scroll to top if section doesn't exist
      console.log('🔄 Fallback: scrolling to top');
      smoothScrollTo(0, () => {
        setCurrentSection(null);
      });
      return;
    }

    try {
      const scrollPosition = calculateScrollPosition(targetElement);
      
      // Validate scroll position
      if (scrollPosition < 0 || !isFinite(scrollPosition)) {
        console.error('❌ Invalid scroll position calculated:', scrollPosition);
        // Fallback to element's top position minus navbar
        const fallbackPosition = Math.max(0, targetElement.offsetTop - config.navbarHeight);
        console.log('🔄 Using fallback position:', fallbackPosition);
        smoothScrollTo(fallbackPosition, () => {
          setCurrentSection(sectionId);
        });
        return;
      }
      
      smoothScrollTo(scrollPosition, () => {
        try {
          // Update URL hash
          const newHash = `#${sectionId}`;
          if (window.location.hash !== newHash) {
            window.history.pushState({}, '', newHash);
          }
          setCurrentSection(sectionId);
          console.log('✅ Navigation completed to:', sectionId);
        } catch (error) {
          console.error('❌ Error updating URL hash:', error);
          // Continue anyway, navigation still worked
          setCurrentSection(sectionId);
        }
      });
    } catch (error) {
      console.error('❌ Error during navigation:', error);
      // Ultimate fallback: scroll to top
      smoothScrollTo(0, () => {
        setCurrentSection(null);
      });
    }
  }, [calculateScrollPosition, smoothScrollTo, config.navbarHeight]);

  // Navigate to a different page (events, news, home)
  const navigateToPage = useCallback((page: 'home' | 'events' | 'news', onNavigate?: (page: 'home' | 'events' | 'news') => void) => {
    console.log('🚀 Navigating to page:', page);
    
    // Validate page parameter
    if (!page || !['home', 'events', 'news'].includes(page)) {
      console.error('❌ Invalid page:', page);
      return;
    }
    
    try {
      if (onNavigate) {
        onNavigate(page);
        
        // If navigating to home, scroll to top after navigation completes
        if (page === 'home') {
          const delay = isMobile() ? SCROLL_CONFIG.MOBILE_DELAY : SCROLL_CONFIG.NAVIGATION_DELAY;
          setTimeout(() => {
            try {
              smoothScrollTo(0, () => {
                setCurrentSection(null);
                console.log('✅ Page navigation completed to:', page);
              });
            } catch (error) {
              console.error('❌ Error during scroll to top:', error);
              // Fallback: immediate scroll without animation
              window.scrollTo(0, 0);
              setCurrentSection(null);
            }
          }, delay);
        }
      } else {
        console.warn('⚠️ No onNavigate callback provided for page navigation');
      }
    } catch (error) {
      console.error('❌ Error during page navigation:', error);
    }
  }, [smoothScrollTo, isMobile]);

  // Get current section based on scroll position
  const getCurrentSection = useCallback((): string | null => {
    if (isScrolling) return currentSection;

    const scrollPosition = window.scrollY + config.navbarHeight + config.additionalOffset;
    
    for (const sectionId of SECTION_IDS) {
      const element = document.getElementById(sectionId);
      if (element) {
        const elementTop = element.offsetTop;
        const elementBottom = elementTop + element.offsetHeight;
        
        if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
          return sectionId;
        }
      }
    }
    
    return null;
  }, [isScrolling, currentSection, config.navbarHeight, config.additionalOffset]);

  // Handle browser navigation (back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.substring(1);
      if (hash && SECTION_IDS.includes(hash)) {
        navigateToSection(hash);
      } else if (!hash) {
        // Navigate to home/top
        smoothScrollTo(0, () => {
          setCurrentSection(null);
        });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [navigateToSection, smoothScrollTo]);

  // Handle initial navigation on page load - DISABLED to prevent conflicts
  // This is now handled by App.tsx to avoid double initialization
  useEffect(() => {
    console.log('🏠 useScrollNavigation: Initial navigation - ensuring page starts at top');
    // Only ensure we start at top, don't handle hash navigation here
    // Hash navigation is handled by App.tsx through urlHashManager
    if (!window.location.hash) {
      window.scrollTo(0, 0);
      setCurrentSection(null);
      console.log('🏠 useScrollNavigation: Scrolled to top (no hash)');
    }
  }, []); // Empty dependency array to run only once

  return {
    navigateToSection,
    navigateToPage,
    getCurrentSection,
    isScrolling,
  };
};