import Lenis from 'lenis';
import gsap from 'gsap';

let lenisInstance: Lenis | null = null;
let tickerListener: ((time: number) => void) | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function initSmoothScroll(): Lenis {
  if (typeof window === 'undefined') return null as unknown as Lenis;

  if (lenisInstance) {
    lenisInstance.destroy();
  }

  const lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.5,
  });

  lenisInstance = lenis;

  // Couple GSAP ticker with Lenis frame loop
  if (tickerListener) {
    gsap.ticker.remove(tickerListener);
  }
  tickerListener = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(tickerListener);
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function destroySmoothScroll() {
  if (tickerListener) {
    gsap.ticker.remove(tickerListener);
    tickerListener = null;
  }
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}
