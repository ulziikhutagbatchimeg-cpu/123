// Makes sure the page is the newest build. GitHub Pages can keep an older index.html in the browser for a few minutes after a deploy,
// so an open page may still run an old build. When the newest index.html names a different build, the page loads once more under a
// new address, which the browser fetches fresh. The check runs on load and whenever the tab comes back into view.
const BUILD_PATTERN = /assets\/index-[^"'\s]+\.js/;
const RELOAD_KEY = 'chem_fresh_build_at';
// Within this many milliseconds of a reload, no further reload is made, so a stale server cannot cause a loop
const RELOAD_GAP = 60_000;

// The build script this page runs, such as assets/index-AbC.js
const runningBuild = (): string | null => {
  const src = [...document.querySelectorAll('script[src]')].map(s => s.getAttribute('src') ?? '').find(s => BUILD_PATTERN.test(s));
  return src ? src.match(BUILD_PATTERN)?.[0] ?? null : null;
};

export const checkForNewBuild = async (): Promise<void> => {
  const current = runningBuild();
  // A development server has no built script, so there is nothing to compare
  if (!current) return;
  try {
    const last = Number(sessionStorage.getItem(RELOAD_KEY) ?? 0);
    if (Date.now() - last < RELOAD_GAP) return;
    // A fresh request for the folder's index.html, bypassing the browser's stored copy
    const response = await fetch(new URL('./', location.href).href, { cache: 'no-store' });
    const latest = (await response.text()).match(BUILD_PATTERN)?.[0];
    if (!latest || current === latest) return;
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
    location.replace(`${location.pathname}?v=${Date.now()}${location.hash}`);
  } catch {
    // Offline, or the check failed: keep the build on the screen
  }
};

export const watchForNewBuild = (): void => {
  void checkForNewBuild();
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') void checkForNewBuild();
  });
};
