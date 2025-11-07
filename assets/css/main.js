(function () {
  const topbar = document.querySelector('.topbar');
  const btn = document.querySelector('.nav-toggle');
  const menu = document.getElementById('primary-menu');

  btn?.addEventListener('click', () => {
    const open = topbar.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  document.addEventListener('click', (e) => {
    if (!topbar.contains(e.target)) {
      topbar.classList.remove('open');
      btn?.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      topbar.classList.remove('open');
      btn?.setAttribute('aria-expanded', 'false');
    }
  });
})();
