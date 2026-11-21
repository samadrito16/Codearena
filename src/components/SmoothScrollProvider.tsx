import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { destroySmoothScroll, getLenis, initSmoothScroll } from '../lib/smoothScroll';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const location = useLocation();
  const isWorkspace = location.pathname.startsWith('/workspace');
  const prevPathRef = useRef(location.pathname);

  // Initialize Lenis on mount
  useEffect(() => {
    initSmoothScroll();
    return () => {
      destroySmoothScroll();
    };
  }, []);

  // Pause / Resume and Scroll to Top on route change
  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;

    if (isWorkspace) {
      lenis.stop();
    } else {
      lenis.start();
      if (prevPathRef.current !== location.pathname) {
        lenis.scrollTo(0, { immediate: true });
        prevPathRef.current = location.pathname;
      }
    }
  }, [location.pathname, isWorkspace]);

  return <>{children}</>;
}
