/* Rongzhe Wei — Personal Website */
(function () {
  'use strict';

  var nav = document.getElementById('nav');

  // Theme
  var toggle = document.getElementById('themeToggle');
  var html = document.documentElement;
  html.setAttribute('data-theme', localStorage.getItem('theme') || 'light');

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  // Mobile nav
  var hamburger = document.getElementById('mobileToggle');
  var navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { navLinks.classList.remove('open'); });
    });
  }

  // Active nav on scroll
  var sections = document.querySelectorAll('section[id], header[id]');
  var anchors = document.querySelectorAll('.nav-links a[href^="#"]');

  function onScroll() {
    var y = window.scrollY + 80;
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 12);
    }
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

  // Subtle entrance animations
  var cards = document.querySelectorAll(
    '.hero-avatar-col, .hero-text-col, .research-card, .highlight-card, .pub-item, #experience .col, #misc .col'
  );
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });

    cards.forEach(function (c, i) {
      c.classList.add('reveal');
      c.style.transitionDelay = (i % 6) * 0.05 + 's';
      obs.observe(c);
    });
  }

  // Konami code easter egg — invert the palette briefly for a retro nod.
  var seq = [38,38,40,40,37,39,37,39,66,65], idx = 0;
  document.addEventListener('keydown', function (e) {
    if (e.keyCode === seq[idx]) {
      idx++;
      if (idx === seq.length) {
        idx = 0;
        document.body.classList.toggle('konami');
      }
    } else {
      idx = 0;
    }
  });

  // Draw the pixel underlines with a short stroke-dash animation when
  // their heading first enters the viewport.
  if ('IntersectionObserver' in window) {
    var uObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var p = e.target.querySelector('path');
        if (!p) return;
        var len = p.getTotalLength();
        p.style.strokeDasharray = len;
        p.style.strokeDashoffset = len;
        p.getBoundingClientRect(); // reflow
        p.style.transition = 'stroke-dashoffset 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s';
        p.style.strokeDashoffset = 0;
        uObs.unobserve(e.target);
      });
    }, { threshold: 0.4 });
    document.querySelectorAll('.sketch-underline').forEach(function (s) { uObs.observe(s); });
  }
})();
