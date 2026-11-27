import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { destroySmoothScroll, getLenis, initSmoothScroll } from '../lib/smoothScroll';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

function isWorkspaceRoute(pathname: string): boolean {
  return (
    pathname.startsWith('/workspace') ||
    pathname.startsWith('/editor') ||
    (pathname.startsWith('/interview/') && pathname !== '/interview') ||
    (pathname.startsWith('/placement/') && pathname !== '/placement') ||
    (pathname.startsWith('/role-specific/') && pathname !== '/role-specific') ||
    (pathname.startsWith('/contests/') && pathname !== '/contests')
  );
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const location = useLocation();
  const isWorkspaceLike = isWorkspaceRoute(location.pathname);
  const prevPathRef = useRef(location.pathname);

  // Destroy Lenis completely on workspace-like routes so its global wheel/touch
  // listeners never intercept or preventDefault() scrolling inside panes or Monaco.
  useEffect(() => {
    if (isWorkspaceLike) {
      destroySmoothScroll();
      window.scrollTo(0, 0);
      prevPathRef.current = location.pathname;
      return;
    }

    const lenis = getLenis() ?? initSmoothScroll();
    lenis.start();
    if (prevPathRef.current !== location.pathname) {
      lenis.scrollTo(0, { immediate: true });
      prevPathRef.current = location.pathname;
    }
  }, [location.pathname, isWorkspaceLike]);

  useEffect(() => {
    return () => {
      destroySmoothScroll();
    };
  }, []);

  return <>{children}</>;
}
