/* Fallback for browsers without cross-document view transitions. */
(() => {
  if ('CSSViewTransitionRule' in window) return;
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const route = /\/(?:index|superbank-case-study|ovo-nabung-case-study|bridex-case-study)\.html$/;
  let leaving = false;
  addEventListener('pageshow', () => { leaving = false; });
  try {
    const arriving = sessionStorage.getItem('portfolio-page-transition');
    sessionStorage.removeItem('portfolio-page-transition');
    if (arriving === location.pathname && !reduced()) {
      document.body.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 320, easing: 'cubic-bezier(.22,1,.36,1)' });
    }
  } catch { /* Navigation still works when storage is unavailable. */ }
  document.addEventListener('click', (event) => {
    const link = event.target.closest?.('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target || link.hasAttribute('download') || reduced()) return;
    const destination = new URL(link.href, location.href);
    if (destination.origin !== location.origin || !route.test(destination.pathname) || destination.pathname === location.pathname) return;
    event.preventDefault();
    if (leaving) return;
    leaving = true;
    try { sessionStorage.setItem('portfolio-page-transition', destination.pathname); } catch {}
    const animation = document.body.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 160, easing: 'ease-out' });
    animation.finished.finally(() => location.assign(destination.href));
  });
})();
