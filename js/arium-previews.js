/* Refined demonstrations: silent, looping visibility autoplay and mobile tap-to-fullscreen.
   The user explicitly requested autoplay; all native controls remain available. */
(() => {
  const mobile = matchMedia('(max-width: 767px)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const previews = [];
  document.querySelectorAll('[data-arium-autoplay]').forEach(video => {
    const button = document.querySelector(`[data-arium-fullscreen="${video.id}"]`);
    const device = button?.closest('.arium-preview-device');
    const state = { visible: false, userPaused: false, internalPause: false, blocked: false, fullscreen: false };
    video.muted = true;
    const pauseAutomatically = () => {
      if (!video.paused) { state.internalPause = true; video.pause(); }
    };
    const autoplay = () => {
      if ((!state.visible && !state.fullscreen) || document.hidden || reduced.matches || state.userPaused || state.blocked || !video.paused) return;
      video.play().catch(error => { if (error.name !== 'AbortError') state.blocked = true; });
    };
    const restorePreview = () => {
      state.fullscreen = false;
      device?.classList.remove('arium-preview-active');
      if (mobile.matches && button && !button.hidden) button.focus({ preventScroll: true });
      if (!state.visible) pauseAutomatically();
    };
    const updateMobile = () => {
      if (button) button.hidden = !mobile.matches;
      if (!state.fullscreen) device?.classList.remove('arium-preview-active');
    };
    updateMobile();
    mobile.addEventListener('change', updateMobile);
    video.addEventListener('play', () => { state.userPaused = false; state.blocked = false; });
    video.addEventListener('pause', () => {
      if (state.internalPause) state.internalPause = false;
      else if (!video.ended) state.userPaused = true;
    });
    video.addEventListener('click', event => {
      const bounds = video.getBoundingClientRect();
      if (event.clientY < bounds.bottom - 48 && !video.paused) {
        event.preventDefault();
        video.pause();
        // Native picture-click handling can run after this listener.
        setTimeout(() => { state.userPaused = true; video.pause(); }, 0);
      }
    });
    button?.addEventListener('click', () => {
      if (!mobile.matches) return;
      const wasPlaying = !video.paused;
      if (wasPlaying) video.pause();
      device.classList.add('arium-preview-active');
      // Fullscreen is requested within the user gesture; playback never enters it automatically.
      if (video.requestFullscreen) {
        video.requestFullscreen().then(() => { state.fullscreen = true; }).catch(() => { /* Native inline controls remain available. */ });
      } else if (video.webkitEnterFullscreen) {
        const enter = () => {
          try { video.webkitEnterFullscreen(); } catch { /* Native inline controls remain available. */ }
        };
        if (video.readyState) enter();
        else video.addEventListener('loadedmetadata', enter, { once: true });
      }
      if (!wasPlaying) video.play().catch(() => {
        if (!document.fullscreenElement && !state.fullscreen) device?.classList.remove('arium-preview-active');
      });
    });
    document.addEventListener('fullscreenchange', () => {
      if (document.fullscreenElement === video) state.fullscreen = true;
      else if (state.fullscreen) restorePreview();
    });
    video.addEventListener('webkitbeginfullscreen', () => { state.fullscreen = true; });
    video.addEventListener('webkitendfullscreen', restorePreview);
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        const entry = entries[0];
        state.visible = entry.isIntersecting && entry.intersectionRatio >= .55;
        if (state.fullscreen || document.fullscreenElement === video) return;
        if (!state.visible) pauseAutomatically();
        else autoplay();
      }, { threshold: [0, .55] });
      observer.observe(video);
    }
    previews.push({ autoplay, pauseAutomatically });
  });
  reduced.addEventListener('change', () => {
    previews.forEach(preview => reduced.matches ? preview.pauseAutomatically() : preview.autoplay());
  });
  document.addEventListener('visibilitychange', () => {
    previews.forEach(preview => document.hidden ? preview.pauseAutomatically() : preview.autoplay());
  });
  // Supporting evidence stays inline and uses native disclosures at every width.
  document.querySelectorAll('.arium-support-disclosure').forEach(details => {
    details.addEventListener('toggle', () => {
      if (!details.open) details.querySelectorAll('video').forEach(video => video.pause());
    });
  });
})();
