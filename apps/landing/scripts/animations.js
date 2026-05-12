/* Futurestick Landing — GSAP Animations */
document.addEventListener('DOMContentLoaded', () => {

  // Wait for GSAP to load
  const waitForGSAP = setInterval(() => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      clearInterval(waitForGSAP);
      initAnimations();
    }
  }, 50);

  function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // ─── Reveal elements on scroll ───
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el) => {
      const delay = parseFloat(el.dataset.delay || 0) / 1000;
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          }
        }
      );
    });

    // ─── Step connectors draw-in ───
    const connectors = document.querySelectorAll('.step__connector');
    connectors.forEach((el) => {
      gsap.fromTo(el,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          }
        }
      );
    });

    // ─── Feature cards stagger ───
    gsap.fromTo('.feature-card',
      { opacity: 0, y: 50, scale: 0.96 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.features__grid',
          start: 'top 80%',
        }
      }
    );

    // ─── AI tools stagger ───
    gsap.fromTo('.ai-tool',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.07,
        scrollTrigger: {
          trigger: '.ai-tools',
          start: 'top 80%',
        }
      }
    );

    // ─── Navbar parallax gradient ───
    window.addEventListener('scroll', () => {
      const nav = document.getElementById('navbar');
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });

    // ─── Parallax orbs ───
    window.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 40;
      const yPos = (clientY / window.innerHeight - 0.5) * 40;

      gsap.to('.hero__orb--1', { x: xPos * 1.5, y: yPos * 1.5, duration: 2, ease: 'power2.out' });
      gsap.to('.hero__orb--2', { x: -xPos, y: -yPos, duration: 2.5, ease: 'power2.out' });
      gsap.to('.hero__orb--3', { x: xPos * 0.5, y: -yPos * 0.5, duration: 3, ease: 'power2.out' });
    });
  }

  // ─── Particle canvas ───
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 0.5;
        this.alpha  = Math.random() * 0.5 + 0.1;
        this.color  = Math.random() > 0.5 ? '139,92,246' : '6,182,212';
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
        ctx.fill();
      }
    }

    // Spawn particles
    for (let i = 0; i < 120; i++) particles.push(new Particle());

    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(139,92,246,${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      connectParticles();
      animId = requestAnimationFrame(animate);
    };
    animate();
  }
});
