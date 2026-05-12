'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const audienceItems = document.querySelectorAll('.audience__item');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!audienceItems.length || reduceMotion || !('IntersectionObserver' in window)) {
    audienceItems.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.18,
  });

  audienceItems.forEach((item) => observer.observe(item));
});
