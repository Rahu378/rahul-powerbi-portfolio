/* Rahul Reddy Ch — portfolio behavior.
   Progressive enhancement only: every word on the page is readable with
   JavaScript switched off. Motion follows HIG — it explains a change of
   state, and it stands down entirely when Reduce Motion is on. */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(pointer: fine)').matches;

  /* ---------- appearance: follow the system, remember an override ---------- */
  var STORE = 'rrc-appearance';
  try {
    var saved = localStorage.getItem(STORE);
    if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);
  } catch (e) { /* storage can throw in private mode */ }

  function appearance() {
    return root.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }

  var toggle = document.getElementById('theme');
  if (toggle) {
    var describe = function () {
      var dark = appearance() === 'dark';
      toggle.setAttribute('aria-label', dark ? 'Switch to light appearance' : 'Switch to dark appearance');
      toggle.setAttribute('aria-pressed', String(dark));
    };
    describe();
    toggle.addEventListener('click', function () {
      var next = appearance() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem(STORE, next); } catch (e) { /* ignore */ }
      describe();
    });
  }

  /* ---------- hero: let the name arrive a letter at a time ---------- */
  var glyphs = document.querySelector('.hero__name .glyphs');
  if (glyphs && !reduce) {
    var text = glyphs.textContent;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < text.length; i++) {
      var s = document.createElement('span');
      s.className = 'glyph';
      s.style.setProperty('--d', i);
      s.textContent = text[i];
      frag.appendChild(s);
    }
    glyphs.textContent = '';
    glyphs.appendChild(frag);
  }

  /* ---------- top bar ---------- */
  var topbar = document.getElementById('topbar');
  if (topbar) {
    var stuck = function () { topbar.classList.toggle('is-stuck', window.scrollY > 24); };
    stuck();
    window.addEventListener('scroll', stuck, { passive: true });
  }

  // The bar inverts over the dark closing section.
  var contact = document.getElementById('contact');
  if (topbar && contact) {
    var invert = function () {
      var r = contact.getBoundingClientRect();
      topbar.classList.toggle('is-invert', r.top <= 62 && r.bottom > 0);
    };
    invert();
    window.addEventListener('scroll', invert, { passive: true });
    window.addEventListener('resize', invert);
  }

  /* ---------- compact menu ---------- */
  var menu = document.getElementById('menu');
  var sheet = document.getElementById('sheet');
  if (menu && sheet) {
    var setMenu = function (open) {
      menu.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      sheet.hidden = !open;
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) {
        var first = sheet.querySelector('a');
        if (first) first.focus();
      }
    };

    menu.addEventListener('click', function () {
      setMenu(menu.getAttribute('aria-expanded') !== 'true');
    });
    sheet.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        menu.focus();
      }
    });
    // A resize past the breakpoint should never leave the page scroll-locked.
    window.addEventListener('resize', function () {
      if (window.innerWidth > 680 && menu.getAttribute('aria-expanded') === 'true') setMenu(false);
    });
  }

  /* ---------- experience rows: disclosure ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('.role__toggle'), function (btn, i) {
    var panel = btn.nextElementSibling;
    if (!panel) return;
    var id = 'role-panel-' + (i + 1);
    panel.id = id;
    btn.setAttribute('aria-controls', id);

    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      if (open) return;
      window.setTimeout(function () {
        var top = btn.getBoundingClientRect().top;
        if (top < 70 || top > window.innerHeight * 0.6) {
          btn.scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' });
        }
      }, 60);
    });
  });

  /* ---------- split body copy into words so it can fade in on cue ---------- */
  if (!reduce) {
    Array.prototype.forEach.call(document.querySelectorAll('[data-words] p'), function (p) {
      var words = p.textContent.split(/\s+/).filter(Boolean);
      var frag2 = document.createDocumentFragment();
      words.forEach(function (w, i) {
        var span = document.createElement('span');
        span.className = 'word';
        span.style.setProperty('--wd', Math.min(i * 18, 520) + 'ms');
        span.textContent = w;
        frag2.appendChild(span);
        frag2.appendChild(document.createTextNode(' '));
      });
      p.textContent = '';
      p.appendChild(frag2);
    });
  }

  /* ---------- reveals ---------- */
  var revealables = [];
  Array.prototype.push.apply(revealables, document.querySelectorAll('.statement, .contact__title'));
  Array.prototype.forEach.call(
    document.querySelectorAll('.sectag, .intro__cols, .roles, .card, .tile, .bg__col, .contact__pills, .contact__meta'),
    function (el) { el.classList.add('reveal'); revealables.push(el); }
  );

  if (reduce || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    Array.prototype.forEach.call(document.querySelectorAll('.line > span'), function (span, i) {
      span.style.setProperty('--d', (i % 3) * 90 + 'ms');
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    revealables.forEach(function (el) { io.observe(el); });
  }

  /* ---------- counters, so the figures land rather than just appear ---------- */
  if (!reduce && 'IntersectionObserver' in window) {
    var countObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        countObs.unobserve(el);
        var target = parseFloat(el.getAttribute('data-count'));
        var suffix = el.getAttribute('data-suffix') || '';
        var started = null;
        var step = function (ts) {
          if (started === null) started = ts;
          var t = Math.min((ts - started) / 1100, 1);
          var eased = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.round(target * eased) + (t === 1 ? suffix : '');
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    Array.prototype.forEach.call(document.querySelectorAll('[data-count]'), function (el) { countObs.observe(el); });
  }

  /* ---------- scroll: progress hairline and gentle parallax ---------- */
  var bar = document.querySelector('.progress i');
  var portrait = document.querySelector('.hero__portrait');
  var heroName = document.querySelector('.hero__name');
  var ticking = false;

  var onScroll = function () {
    var y = window.scrollY;
    if (bar) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? Math.min(y / max, 1) * 100 : 0) + '%';
    }
    // The portrait drifts slower than the name, so the hero gains depth as it leaves.
    if (!reduce && y < window.innerHeight * 1.2) {
      if (portrait) portrait.style.transform = 'translate3d(0,' + (y * -0.07).toFixed(1) + 'px,0)';
      if (heroName) heroName.style.transform = 'translate3d(0,' + (y * 0.045).toFixed(1) + 'px,0)';
    }
    ticking = false;
  };

  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(onScroll);
  }, { passive: true });
  onScroll();

  /* ---------- a quiet ring that follows a fine pointer ---------- */
  var ring = document.getElementById('cursor');
  if (ring && fine && !reduce) {
    var rx = window.innerWidth / 2, ry = window.innerHeight / 2, px = rx, py = ry, ringRaf = null;
    var draw = function () {
      px += (rx - px) * 0.18;
      py += (ry - py) * 0.18;
      ring.style.transform = 'translate3d(' + px.toFixed(1) + 'px,' + py.toFixed(1) + 'px,0)';
      ringRaf = (Math.abs(rx - px) > 0.2 || Math.abs(ry - py) > 0.2) ? requestAnimationFrame(draw) : null;
    };
    document.addEventListener('mousemove', function (e) {
      rx = e.clientX; ry = e.clientY;
      ring.classList.add('is-on');
      if (!ringRaf) ringRaf = requestAnimationFrame(draw);
    }, { passive: true });
    document.addEventListener('mouseleave', function () { ring.classList.remove('is-on'); });

    var hot = 'a, button, .card, .tile, .role__toggle';
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest(hot)) ring.classList.add('is-hot');
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest(hot)) ring.classList.remove('is-hot');
    });
  }

  /* ---------- project artwork leans toward the pointer ---------- */
  if (fine && !reduce) {
    Array.prototype.forEach.call(document.querySelectorAll('.card__art'), function (art) {
      var svg = art.querySelector('svg');
      if (!svg) return;
      art.addEventListener('mousemove', function (e) {
        var r = art.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) / r.width;
        var dy = (e.clientY - (r.top + r.height / 2)) / r.height;
        svg.style.transform = 'scale(1.045) rotateY(' + (dx * 5).toFixed(2) + 'deg) rotateX(' + (-dy * 4).toFixed(2) + 'deg)';
      });
      art.addEventListener('mouseleave', function () { svg.style.transform = ''; });
    });
  }

  /* ---------- navigation reflects the current section ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.topbar__nav a'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          if (a.getAttribute('href') === '#' + entry.target.id) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- the contact orb leans toward the pointer ---------- */
  var orb = document.getElementById('orb');
  if (orb && fine && !reduce) {
    var pull = 0.26, radius = 150, raf = null, tx = 0, ty = 0, cx = 0, cy = 0;
    var render = function () {
      cx += (tx - cx) * 0.16;
      cy += (ty - cy) * 0.16;
      orb.style.transform = 'translate(' + cx.toFixed(2) + 'px,' + cy.toFixed(2) + 'px)';
      raf = (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) ? requestAnimationFrame(render) : null;
    };
    var kick = function () { if (!raf) raf = requestAnimationFrame(render); };
    window.addEventListener('mousemove', function (e) {
      var r = orb.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      var dx = e.clientX - (r.left + r.width / 2);
      var dy = e.clientY - (r.top + r.height / 2);
      var near = Math.hypot(dx, dy) < radius + r.width / 2;
      tx = near ? dx * pull : 0;
      ty = near ? dy * pull : 0;
      kick();
    }, { passive: true });
    orb.addEventListener('mouseleave', function () { tx = 0; ty = 0; kick(); });
  }

  /* ---------- local time, so the footer is alive ---------- */
  var clock = document.getElementById('clock');
  if (clock) {
    var tick = function () {
      clock.textContent = new Date().toLocaleTimeString([], {
        hour: 'numeric', minute: '2-digit', timeZoneName: 'short'
      });
    };
    tick();
    setInterval(tick, 15000);
  }
})();
