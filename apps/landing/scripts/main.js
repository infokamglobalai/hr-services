/* Futurestick Landing — Main JS */
document.addEventListener('DOMContentLoaded', () => {

  // ─── Animated Counters ───
  const animateCount = (el, target, duration = 2000) => {
    const start = performance.now();
    const update = (time) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      const value = Math.floor(eased * target);
      el.textContent = value.toLocaleString('en-IN');
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.stat__num').forEach(el => {
          const target = parseInt(el.dataset.count);
          animateCount(el, target);
        });
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const statsEl = document.getElementById('hero-stats');
  if (statsEl) statsObserver.observe(statsEl);

  // ─── Mobile Hamburger ───
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  const navCta    = document.getElementById('nav-cta');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('mobile-open');
      hamburger.setAttribute('aria-expanded', isOpen);
      navLinks.style.display = isOpen ? 'flex' : '';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'fixed';
      navLinks.style.top = '60px';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = 'rgba(8,11,20,0.97)';
      navLinks.style.padding = '1.5rem 2rem';
      navLinks.style.gap = '1.5rem';
      navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
      navLinks.style.backdropFilter = 'blur(20px)';
      navLinks.style.zIndex = '999';
    });
  }

  // Close mobile nav on link click
  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks) {
        navLinks.classList.remove('mobile-open');
        navLinks.style.display = '';
      }
    });
  });

  // ─── Smooth scroll for nav links ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ─── Feature card mouse-tracking glow ───
  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });

  // ─── AI tool hover effect ───
  document.querySelectorAll('.ai-tool').forEach(tool => {
    tool.addEventListener('mouseenter', () => {
      tool.style.boxShadow = '0 0 0 1px rgba(139,92,246,0.5), 0 8px 32px rgba(139,92,246,0.15)';
    });
    tool.addEventListener('mouseleave', () => {
      tool.style.boxShadow = '';
    });
  });

  // ─── Logos pause on hover ───
  const logosInner = document.querySelector('.logos__inner');
  if (logosInner) {
    logosInner.addEventListener('mouseenter', () => {
      logosInner.style.animationPlayState = 'paused';
    });
    logosInner.addEventListener('mouseleave', () => {
      logosInner.style.animationPlayState = 'running';
    });
  }

  // ─── Simple reveal fallback (without GSAP) ───
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

});
