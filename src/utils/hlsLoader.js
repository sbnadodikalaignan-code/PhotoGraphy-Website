/**
 * Dynamic lazy-loader for Hls.js to avoid bundling heavy video libraries
 * into the critical initial render path.
 */

let hlsPromise = null;

export async function getHls() {
  if (typeof window !== 'undefined' && window.Hls) {
    return window.Hls;
  }
  if (!hlsPromise) {
    hlsPromise = import('hls.js').then((module) => module.default || module);
  }
  return hlsPromise;
}

export function isHlsSupported() {
  if (typeof window === 'undefined') return false;
  return Boolean(
    window.MediaSource || 
    window.WebKitMediaSource
  );
}

