import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export type NavigationGuard = (targetPath: string) => boolean;

interface UiContextValue {
  commandPaletteOpen: boolean;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
  toggleCommandPalette: () => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
  toggleSidebar: () => void;
  announce: (message: string) => void;
  announcement: string;
  registerNavigationGuard: (guard: NavigationGuard | null) => void;
  requestNavigate: (targetPath: string) => void;
}

const UiContext = createContext<UiContextValue | undefined>(undefined);

const ROUTE_TITLES: Array<{ prefix: string; label: string }> = [
  { prefix: '/dashboard', label: 'Overview' },
  { prefix: '/problems', label: 'Problem Library' },
  { prefix: '/workspace', label: 'Code Workspace' },
  { prefix: '/daily-challenges', label: 'Daily Challenges' },
  { prefix: '/learning-paths', label: 'Learning Paths' },
  { prefix: '/progress', label: 'Your Progress' },
  { prefix: '/profile', label: 'Your Profile' },
  { prefix: '/leaderboard', label: 'Leaderboard' },
  { prefix: '/settings', label: 'Settings' },
  { prefix: '/admin', label: 'Admin Dashboard' },
  { prefix: '/login', label: 'Sign In' },
];

export function UiProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const [sidebarCollapsed, setSidebarCollapsedState] = useState(() => {
    try {
      return localStorage.getItem('prism_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  const setSidebarCollapsed = useCallback((action: boolean | ((prev: boolean) => boolean)) => {
    setSidebarCollapsedState((prev) => {
      const next = typeof action === 'function' ? action(prev) : action;
      try {
        localStorage.setItem('prism_sidebar_collapsed', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => !prev);
  }, [setSidebarCollapsed]);

  const guardRef = useRef<NavigationGuard | null>(null);
  const announceTimerRef = useRef<number | null>(null);
  const prevPathRef = useRef(location.pathname);

  const announce = useCallback((message: string) => {
    if (!message.trim()) return;
    if (announceTimerRef.current !== null) {
      window.clearTimeout(announceTimerRef.current);
    }
    // Clear briefly before setting so repeated identical messages are still announced.
    setAnnouncement('');
    announceTimerRef.current = window.setTimeout(() => {
      setAnnouncement(message);
    }, 30);
  }, []);

  useEffect(() => () => {
    if (announceTimerRef.current !== null) {
      window.clearTimeout(announceTimerRef.current);
    }
  }, []);

  // Announce client-side route transitions to screen readers.
  useEffect(() => {
    if (prevPathRef.current === location.pathname) return;
    prevPathRef.current = location.pathname;
    const match = ROUTE_TITLES.find((item) => location.pathname.startsWith(item.prefix));
    if (match) {
      announce(`Navigated to ${match.label}`);
    }
  }, [announce, location.pathname]);

  // Global Ctrl+K (command palette) and Ctrl+B (sidebar toggle) triggers.
  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && !event.altKey && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        event.stopPropagation();
        setCommandPaletteOpen((open) => !open);
      } else if ((event.ctrlKey || event.metaKey) && !event.altKey && event.key.toLowerCase() === 'b') {
        event.preventDefault();
        event.stopPropagation();
        toggleSidebar();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown, true);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown, true);
  }, [toggleSidebar]);

  const registerNavigationGuard = useCallback((guard: NavigationGuard | null) => {
    guardRef.current = guard;
  }, []);

  const requestNavigate = useCallback((targetPath: string) => {
    const currentFull = `${location.pathname}${location.search}`;
    if (targetPath === currentFull || targetPath === location.pathname) {
      return;
    }
    if (guardRef.current && !guardRef.current(targetPath)) {
      return;
    }
    navigate(targetPath);
  }, [location.pathname, location.search, navigate]);

  // Intercept clicks on in-app anchor links when a navigation guard is active (e.g. unsaved workspace draft).
  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (!guardRef.current) return;
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!(target instanceof HTMLAnchorElement)) return;
      if (target.target && target.target !== '_self') return;
      if (target.hasAttribute('download')) return;

      const hrefAttr = target.getAttribute('href');
      if (!hrefAttr || hrefAttr.startsWith('#') || hrefAttr.startsWith('mailto:') || hrefAttr.startsWith('tel:')) return;

      let url: URL;
      try {
        url = new URL(target.href, window.location.origin);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;

      const nextPath = `${url.pathname}${url.search}${url.hash}`;
      const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      if (nextPath === currentPath) return;

      if (!guardRef.current(nextPath)) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    document.addEventListener('click', handleDocumentClick, true);
    return () => document.removeEventListener('click', handleDocumentClick, true);
  }, []);

  const openCommandPalette = useCallback(() => setCommandPaletteOpen(true), []);
  const closeCommandPalette = useCallback(() => setCommandPaletteOpen(false), []);
  const toggleCommandPalette = useCallback(() => setCommandPaletteOpen((open) => !open), []);

  const value = useMemo<UiContextValue>(() => ({
    commandPaletteOpen,
    openCommandPalette,
    closeCommandPalette,
    toggleCommandPalette,
    sidebarCollapsed,
    setSidebarCollapsed,
    toggleSidebar,
    announce,
    announcement,
    registerNavigationGuard,
    requestNavigate,
  }), [
    commandPaletteOpen,
    openCommandPalette,
    closeCommandPalette,
    toggleCommandPalette,
    sidebarCollapsed,
    setSidebarCollapsed,
    toggleSidebar,
    announce,
    announcement,
    registerNavigationGuard,
    requestNavigate,
  ]);

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export function useUi() {
  const ctx = useContext(UiContext);
  if (!ctx) throw new Error('useUi must be used inside UiProvider');
  return ctx;
}
