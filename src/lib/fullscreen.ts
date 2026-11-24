/**
 * Cross-browser Fullscreen Helpers for Proctored Contest & Mock Interview Mode
 */

export function isAppFullscreen(): boolean {
  if (typeof document === 'undefined') return false;
  const doc = document as any;
  return Boolean(
    doc.fullscreenElement ||
    doc.webkitFullscreenElement ||
    doc.mozFullScreenElement ||
    doc.msFullscreenElement
  );
}

export async function requestAppFullscreen(): Promise<boolean> {
  if (typeof document === 'undefined') return false;
  const docEl = document.documentElement as any;

  if (isAppFullscreen()) return true;

  try {
    if (docEl.requestFullscreen) {
      await docEl.requestFullscreen();
      return true;
    } else if (docEl.webkitRequestFullscreen) {
      await docEl.webkitRequestFullscreen();
      return true;
    } else if (docEl.mozRequestFullScreen) {
      await docEl.mozRequestFullScreen();
      return true;
    } else if (docEl.msRequestFullscreen) {
      await docEl.msRequestFullscreen();
      return true;
    }
  } catch (err) {
    console.warn('Proctored fullscreen request failed or blocked by browser:', err);
    return false;
  }
  return false;
}

export async function exitAppFullscreen(): Promise<boolean> {
  if (typeof document === 'undefined') return false;
  const doc = document as any;

  if (!isAppFullscreen()) return true;

  try {
    if (doc.exitFullscreen) {
      await doc.exitFullscreen();
      return true;
    } else if (doc.webkitExitFullscreen) {
      await doc.webkitExitFullscreen();
      return true;
    } else if (doc.mozCancelFullScreen) {
      await doc.mozCancelFullScreen();
      return true;
    } else if (doc.msExitFullscreen) {
      await doc.msExitFullscreen();
      return true;
    }
  } catch (err) {
    console.warn('Proctored exit fullscreen failed:', err);
    return false;
  }
  return false;
}

export function onFullscreenChange(listener: (isFullscreen: boolean) => void): () => void {
  if (typeof document === 'undefined') return () => {};

  const handler = () => {
    listener(isAppFullscreen());
  };

  document.addEventListener('fullscreenchange', handler);
  document.addEventListener('webkitfullscreenchange', handler);
  document.addEventListener('mozfullscreenchange', handler);
  document.addEventListener('MSFullscreenChange', handler);

  return () => {
    document.removeEventListener('fullscreenchange', handler);
    document.removeEventListener('webkitfullscreenchange', handler);
    document.removeEventListener('mozfullscreenchange', handler);
    document.removeEventListener('MSFullscreenChange', handler);
  };
}
