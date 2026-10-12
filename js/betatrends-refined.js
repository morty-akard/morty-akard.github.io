// Inline evidence disclosures retain authored defaults; margin-note defaults stay shared.
(() => {
  const article = document.querySelector('.betatrends-refined .cse-article');
  article?.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const disclosure = event.target.closest('details.bt-disclosure');
    if (!disclosure?.open) return;
    event.preventDefault();
    disclosure.open = false;
    disclosure.querySelector(':scope > summary')?.focus();
  });
})();
