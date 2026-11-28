import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/react';
import App from './App';
import AppErrorBoundary from './components/AppErrorBoundary';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { UiProvider } from './context/UiContext';
import { resetLegacyCatalogProgress } from './lib/catalogMigration';
import './index.css';

resetLegacyCatalogProgress();

const CLERK_PUBLISHABLE_KEY =
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ||
  (typeof window !== 'undefined' ? localStorage.getItem('clerk_publishable_key') || '' : '');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <BrowserRouter>
        {CLERK_PUBLISHABLE_KEY ? (
          <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} afterSignOutUrl="/login">
            <AuthProvider>
              <AppProvider>
                <UiProvider>
                  <App />
                </UiProvider>
              </AppProvider>
            </AuthProvider>
          </ClerkProvider>
        ) : (
          <AuthProvider>
            <AppProvider>
              <UiProvider>
                <App />
              </UiProvider>
            </AppProvider>
          </AuthProvider>
        )}
      </BrowserRouter>
    </AppErrorBoundary>
  </React.StrictMode>,
);
