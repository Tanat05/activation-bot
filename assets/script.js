// Minimal interactions showcasing modern web tech
(function() {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const nav = document.querySelector('.nav');
  const menuToggle = document.getElementById('menuToggle');

  // Theme persistence
  const saved = localStorage.getItem('theme');
  if (saved) root.setAttribute('data-theme', saved);

  function setTheme(next) {
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') || 'light';
      setTheme(current === 'light' ? 'dark' : 'light');
    });
  }

  // Mobile menu toggle
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  // IntersectionObserver-based reveal animation
  const io = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) e.target.classList.add('visible');
    }
  }, { threshold: 0.08 }) : null;

  document.querySelectorAll('.reveal').forEach(el => {
    if (io) io.observe(el); else el.classList.add('visible');
  });

  // Tabs demo
  document.querySelectorAll('.tabs').forEach(tabs => {
    const buttons = tabs.querySelectorAll('.tab-btn');
    const panels = tabs.querySelectorAll('.tab-panel');
    buttons.forEach(btn => btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.toggle('active', b === btn));
      panels.forEach(p => p.hidden = p.id !== btn.getAttribute('aria-controls'));
    }));
  });

  // Service worker registration (PWA demo)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').catch(() => {});
  }
})();
