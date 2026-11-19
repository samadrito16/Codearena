import React, { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { hasError: boolean; message: string };

export default class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error?.message || 'An unexpected rendering error occurred.' };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('CodeArena render error:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, background: '#0b1020', color: '#f8fafc', fontFamily: "'Manrope', ui-sans-serif, system-ui, sans-serif" }}>
          <section style={{ width: 'min(100%, 680px)', border: '1px solid #334155', borderRadius: 18, padding: 24, background: '#111827' }}>
            <p style={{ margin: 0, color: '#fb7185', fontSize: 12, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase' }}>CodeArena encountered an error</p>
            <h1 style={{ margin: '10px 0', fontSize: 24 }}>The page could not be rendered.</h1>
            <p style={{ color: '#cbd5e1', lineHeight: 1.6 }}>Copy this message when reporting the issue. The full details are also available in the browser console (F12 → Console).</p>
            <pre style={{ overflowWrap: 'anywhere', whiteSpace: 'pre-wrap', padding: 14, borderRadius: 10, background: '#020617', color: '#fda4af', fontSize: 12 }}>{this.state.message}</pre>
            <button onClick={() => window.location.reload()} style={{ marginTop: 8, border: 0, borderRadius: 10, padding: '10px 14px', background: '#6366f1', color: 'white', fontWeight: 700, cursor: 'pointer' }}>Reload CodeArena</button>
          </section>
        </main>
      );
    }
    return this.props.children;
  }
}
