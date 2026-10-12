/* Progressive enhancement for the opt-in template; no legacy selectors. */
(() => {
  const root = document.querySelector('.case-study-editorial');
  const toc = root?.querySelector('.cse-toc');
  if (!toc) return;
  const links = [...toc.querySelectorAll('a[href^="#"]')];
  const sections = links.map(link => document.getElementById(decodeURIComponent(link.hash.slice(1))));
  if (!links.length || sections.some(section => !section)) return;
  // Collapsed visual labels must keep the links' complete accessible names.
  links.forEach(link => link.setAttribute('aria-label', link.querySelector('.cse-nav-label')?.textContent.trim() || link.textContent.trim()));
  const opening = root.querySelector('[data-cse-opening]') || sections[0];
  const story = sections.find(section => section !== opening) || opening;
  const article = root.querySelector('.cse-article');
  const summary = toc.querySelector('summary');
  const currentLabel = toc.querySelector('.cse-toc-current');
  const mobile = matchMedia('(max-width: 1023px)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let current = -1;
  let visible = false;
  let touchExpanded = false;
  let scheduled = false;

  function setCurrent(index) {
    if (index === current) return;
    current = index;
    links.forEach((link, i) => {
      if (i === index) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    const name = links[index].querySelector('.cse-nav-label')?.textContent.trim() || links[index].textContent.trim();
    if (currentLabel) currentLabel.textContent = name;
    summary.setAttribute('aria-label', `Sections: ${name}`);
  }
  function updateCurrent() {
    const headerOffset = parseFloat(getComputedStyle(root).getPropertyValue('--cse-header-offset'));
    const offset = headerOffset + 24;
    let index = 0;
    sections.forEach((section, i) => { if (section.getBoundingClientRect().top <= offset) index = i; });
    setCurrent(index);
    const storyBox = story.getBoundingClientRect();
    const articleBox = article.getBoundingClientRect();
    const nextVisible = storyBox.top <= offset && articleBox.bottom > offset;
    if (visible !== nextVisible) {
      visible = nextVisible;
      // If a deep-link scroll hides the control, do not leave focus on a hidden link.
      if (!visible && toc.contains(document.activeElement)) {
        const heading = sections[index].querySelector('h1, h2');
        heading?.setAttribute('tabindex', '-1');
        heading?.focus({ preventScroll: true });
      }
      toc.dataset.visible = String(visible);
      root.classList.toggle('cse-nav-visible', visible);
      toc.inert = !visible || root.classList.contains('cse-primary-open');
      if (!visible && mobile.matches) toc.open = false;
    }
    const travel = Math.max(1, articleBox.bottom - storyBox.top - (innerHeight - headerOffset));
    root.style.setProperty('--cse-nav-progress', String(Math.min(1, Math.max(0, (headerOffset - storyBox.top) / travel))));
  }
  function onScroll() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { scheduled = false; updateCurrent(); });
  }
  function updateHeader() {
    const header = root.querySelector('.floating-nav');
    if (header) {
      const box = header.getBoundingClientRect();
      root.style.setProperty('--cse-header-offset', `${Math.ceil(box.bottom) + (mobile.matches ? 52 : 16)}px`);
      root.style.setProperty('--cse-dock-top', `${box.bottom}px`);
      root.style.setProperty('--cse-dock-left', `${box.left}px`);
      root.style.setProperty('--cse-dock-width', `${box.width}px`);
    }
    root.style.setProperty('--cse-scroll-padding', `${parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0}px`);
    root.style.setProperty('--cse-nav-left', `${root.querySelector('.cse-layout').getBoundingClientRect().left}px`);
    updateCurrent();
  }
  function closeMenu(returnFocus = false) {
    if (mobile.matches) toc.open = false;
    touchExpanded = false;
    delete toc.dataset.expanded;
    if (returnFocus && mobile.matches) summary.focus();
  }
  function updateMode() { closeMenu(); toc.open = !mobile.matches; updateHeader(); }
  links.forEach((link, index) => {
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      // First touch reveals the complete desktop list; the next selects its section.
      if (!mobile.matches && event.pointerType === 'touch' && !touchExpanded) {
        event.preventDefault();
        touchExpanded = true;
        toc.dataset.expanded = 'true';
        return;
      }
      event.preventDefault();
      closeMenu();
      const heading = sections[index].querySelector('h1, h2');
      heading?.setAttribute('tabindex', '-1');
      heading?.focus({ preventScroll: true });
      if (location.hash !== link.hash) history.pushState(null, '', link.hash);
      sections[index].scrollIntoView({ behavior: reduced.matches ? 'instant' : 'smooth', block: 'start' });
      updateCurrent();
    });
  });
  toc.addEventListener('keydown', event => {
    if (event.key === 'Escape') { event.preventDefault(); closeMenu(true); }
  });
  document.addEventListener('pointerdown', event => { if (!toc.contains(event.target)) closeMenu(); });
  toc.addEventListener('focusout', () => {
    requestAnimationFrame(() => { if (!toc.contains(document.activeElement)) { closeMenu(); updateCurrent(); } });
  });
  mobile.addEventListener('change', updateMode);
  window.addEventListener('resize', updateHeader);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('hashchange', updateCurrent);
  window.addEventListener('popstate', onScroll);
  const header = root.querySelector('.site-nav-section');
  const primaryNav = root.querySelector('.floating-nav');
  if (primaryNav) new MutationObserver(() => {
    root.classList.toggle('cse-primary-open', primaryNav.classList.contains('is-open'));
    toc.inert = !visible || primaryNav.classList.contains('is-open');
    if (primaryNav.classList.contains('is-open')) closeMenu();
  }).observe(primaryNav, { attributes: true, attributeFilter: ['class'] });
  if (header && 'ResizeObserver' in window) new ResizeObserver(updateHeader).observe(header);
  toc.dataset.visible = 'false';
  toc.inert = true;
  root.classList.add('cse-ready');
  updateMode();
  document.fonts?.ready.then(() => {
    updateHeader();
    const section = sections.find(item => `#${item.id}` === decodeURIComponent(location.hash));
    if (section) { section.scrollIntoView({ behavior: 'instant', block: 'start' }); updateCurrent(); }
  });
})();

/* Native disclosures remain open/usable without this optional enhancement. */
(() => {
  const root = document.querySelector('.case-study-editorial');
  const disclosures = [...(root?.querySelectorAll('.cse-support-disclosure') || [])];
  if (!disclosures.length) return;
  const wide = matchMedia('(min-width: 1024px)');
  const inlineChoices = new WeakMap(disclosures.map(disclosure => [disclosure, false]));
  let wasWide = wide.matches;
  let initialised = false;
  function updateSupportMode() {
    disclosures.forEach(disclosure => {
      // Native toggle events may be queued; capture the outgoing inline state too.
      if (initialised && !wasWide) inlineChoices.set(disclosure, disclosure.open);
      const open = wide.matches || inlineChoices.get(disclosure);
      // Do not leave keyboard focus inside content hidden by a resize.
      if (!open && disclosure.querySelector('.cse-support-content')?.contains(document.activeElement)) {
        disclosure.querySelector('summary').focus({ preventScroll: true });
      }
      disclosure.open = open;
    });
    wasWide = wide.matches;
    initialised = true;
  }
  disclosures.forEach(disclosure => {
    disclosure.addEventListener('toggle', () => {
      if (!wide.matches) inlineChoices.set(disclosure, disclosure.open);
    });
    disclosure.addEventListener('keydown', event => {
      if (event.key === 'Escape' && disclosure.open) {
        event.preventDefault();
        disclosure.open = false;
        disclosure.querySelector('summary').focus({ preventScroll: true });
      }
    });
  });
  function revealLinkedSupport() {
    if (!location.hash) return;
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    const disclosure = target?.closest('.cse-support-disclosure') || (target?.matches('.cse-support') ? target.querySelector('.cse-support-disclosure') : null);
    if (!disclosure || !disclosures.includes(disclosure)) return;
    if (!wide.matches) inlineChoices.set(disclosure, true);
    disclosure.open = true;
  }
  wide.addEventListener('change', updateSupportMode);
  window.addEventListener('hashchange', revealLinkedSupport);
  window.addEventListener('popstate', revealLinkedSupport);
  updateSupportMode();
  revealLinkedSupport();
})();
