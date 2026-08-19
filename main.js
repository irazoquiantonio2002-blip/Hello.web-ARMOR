// ARMOR — Cerraduras de Alta Seguridad — interactions

document.addEventListener('DOMContentLoaded', () => {

  /* ── Preloader ─────────────────────────────────────────── */
  const preloader = document.getElementById('preloader');
  const progressBar = document.getElementById('progressBar');
  const progressPercent = document.getElementById('progressPercent');
  const particlesWrap = document.getElementById('preloaderParticles');

  if (particlesWrap) {
    for (let i = 0; i < 24; i++) {
      const p = document.createElement('span');
      const size = 2 + Math.random() * 3;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + '%';
      p.style.bottom = '-10px';
      p.style.animationDuration = (4 + Math.random() * 5) + 's';
      p.style.animationDelay = (Math.random() * 4) + 's';
      particlesWrap.appendChild(p);
    }
  }

  let progress = 0;
  const progressTimer = setInterval(() => {
    progress += Math.random() * 18 + 6;
    if (progress >= 100) {
      progress = 100;
      clearInterval(progressTimer);
      setTimeout(() => {
        preloader && preloader.classList.add('is-hidden');
        document.body.classList.add('is-loaded');
        runHeroEntrance();
      }, 280);
    }
    if (progressBar) progressBar.style.width = progress + '%';
    if (progressPercent) progressPercent.textContent = Math.round(progress) + '%';
  }, 180);

  /* ── Navbar scroll state ───────────────────────────────── */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (!navbar) return;
    navbar.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Mobile menu ───────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    const toggleMenu = (open) => {
      hamburger.classList.toggle('is-open', open);
      mobileMenu.classList.toggle('is-open', open);
      hamburger.setAttribute('aria-expanded', String(open));
      mobileMenu.setAttribute('aria-hidden', String(!open));
      document.body.style.overflow = open ? 'hidden' : '';
    };
    hamburger.addEventListener('click', () => {
      toggleMenu(!mobileMenu.classList.contains('is-open'));
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => toggleMenu(false));
    });
  }

  /* ── Smooth anchor scroll with navbar offset ──────────────*/
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = 84;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── Reveal on scroll (IntersectionObserver) ──────────────*/
  const revealEls = document.querySelectorAll('.reveal-up, .stagger-card');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('in-view'), (i % 6) * 90);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ── Hero canvas — subtle particle field ──────────────────*/
  const canvas = document.getElementById('heroCanvas');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let raf;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const initParticles = () => {
      const count = Math.min(60, Math.floor((canvas.width * canvas.height) / 22000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        a: Math.random() * 0.5 + 0.15
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(224,138,46,${p.a})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };

    resize();
    initParticles();
    draw();
    window.addEventListener('resize', () => { resize(); initParticles(); });
  }

  /* ── Hero bubbles ──────────────────────────────────────── */
  const bubbleWrap = document.getElementById('heroBubbles');
  if (bubbleWrap) {
    for (let i = 0; i < 14; i++) {
      const b = document.createElement('span');
      b.className = 'hero-bubble';
      const size = 4 + Math.random() * 10;
      b.style.width = size + 'px';
      b.style.height = size + 'px';
      b.style.left = Math.random() * 100 + '%';
      b.style.bottom = '-20px';
      b.style.animationDuration = (7 + Math.random() * 8) + 's';
      b.style.animationDelay = (Math.random() * 6) + 's';
      bubbleWrap.appendChild(b);
    }
  }

  /* ── Hero entrance animation (anime.js if present) ────────*/
  function runHeroEntrance() {
    const targets = ['#heroBadge', '#heroTitle', '#heroSubtitle', '#heroCtas', '#heroTrust'];
    if (window.anime) {
      window.anime.timeline({ easing: 'easeOutExpo' })
        .add({ targets: targets, opacity: [0, 1], translateY: [24, 0], delay: window.anime.stagger(110), duration: 900 })
        .add({ targets: '#heroVisual', opacity: [0, 1], translateX: [40, 0], duration: 900 }, '-=700')
        .add({ targets: ['#fcPrice', '#fcSpeed', '#fcRating'], opacity: [0, 1], scale: [0.85, 1], delay: window.anime.stagger(120), duration: 700 }, '-=500');
    } else {
      [...targets, '#heroVisual'].forEach(sel => {
        const el = document.querySelector(sel);
        if (el) { el.style.opacity = 1; el.style.transform = 'none'; }
      });
    }
  }

  /* ── Contact form (no backend wired — see index.html note) */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const successBox = document.getElementById('formSuccess');
      form.classList.add('is-hidden');
      if (successBox) successBox.classList.add('is-visible');
      form.reset();
    });
  }

});
