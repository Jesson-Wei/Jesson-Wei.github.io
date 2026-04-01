/* Rongzhe Wei — Personal Website */
(function () {
  'use strict';

  // Theme
  var toggle = document.getElementById('themeToggle');
  var html = document.documentElement;
  html.setAttribute('data-theme', localStorage.getItem('theme') || 'light');

  toggle.addEventListener('click', function () {
    var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // Mobile nav
  var hamburger = document.getElementById('mobileToggle');
  var navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { navLinks.classList.remove('open'); });
  });

  // Active nav on scroll
  var sections = document.querySelectorAll('section[id], header[id]');
  var anchors = document.querySelectorAll('.nav-links a[href^="#"]');

  function onScroll() {
    var y = window.scrollY + 80;
    sections.forEach(function (s) {
      if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) {
        var id = s.getAttribute('id');
        anchors.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Subtle entrance for research cards
  var cards = document.querySelectorAll('.research-card, .highlight-card');
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });

    cards.forEach(function (c, i) {
      c.style.opacity = '0';
      c.style.transform = 'translateY(16px)';
      c.style.transition = 'opacity 0.5s ease ' + (i * 0.08) + 's, transform 0.5s ease ' + (i * 0.08) + 's';
      obs.observe(c);
    });
  }
})();
