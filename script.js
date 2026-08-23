// ============================================
// NAVIGATION — fond au scroll + section active
// ============================================
(function () {
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id], header[id]');

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
    let current = '';
    sections.forEach((sec) => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom > 100) current = sec.id;
    });
    navLinks.forEach((link) => link.classList.toggle('active', link.dataset.section === current));
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const navToggle = document.getElementById('navToggle');
  const navLinksList = document.getElementById('navLinks');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinksList.style.display === 'flex';
      navLinksList.style.display = isOpen ? 'none' : 'flex';
      Object.assign(navLinksList.style, {
        flexDirection: 'column', position: 'absolute', top: '52px', right: '1rem',
        background: '#15181C', border: '0.5px solid rgba(255,255,255,0.08)',
        borderRadius: '8px', padding: '1rem 1.5rem', gap: '12px'
      });
      navToggle.setAttribute('aria-expanded', String(!isOpen));
    });
  }
})();

// ============================================
// TUILES — composant homogène (formations / projets / expériences)
// ============================================
(function () {
  const tiles = document.querySelectorAll('.tile');

  function openTile(tile) {
    const grid = tile.closest('.grid-cards');
    grid.querySelectorAll('.tile.open').forEach((t) => {
      if (t !== tile) {
        t.classList.remove('open');
        t.setAttribute('aria-expanded', 'false');
      }
    });
    tile.classList.add('open');
    tile.setAttribute('aria-expanded', 'true');
  }

  function closeTile(tile) {
    tile.classList.remove('open');
    tile.setAttribute('aria-expanded', 'false');
  }

  tiles.forEach((tile) => {
    tile.addEventListener('click', () => {
      if (!tile.classList.contains('open')) openTile(tile);
    });
    tile.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && !tile.classList.contains('open')) {
        e.preventDefault();
        openTile(tile);
      }
    });

    const backBtn = tile.querySelector('.tile-back');
    if (backBtn) {
      backBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeTile(tile);
      });
    }

    // Empêche les clics sur les liens internes de rouvrir/fermer la tuile
    tile.querySelectorAll('a').forEach((el) => {
      el.addEventListener('click', (e) => e.stopPropagation());
    });
  });
})();
