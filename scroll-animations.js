document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.content-area .nav-item.nav-link');

  // Accessibility: no motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    cards.forEach(el => (el.style.opacity = '1'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;

      const anim = entry.target.dataset.anim || 'fadeInUp';
      entry.target.classList.add('animated', anim);
      entry.target.style.opacity = '1';

      obs.unobserve(entry.target); // animate once
    }
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

  cards.forEach(el => observer.observe(el));
});
