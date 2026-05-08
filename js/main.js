/* ========================================
   Expedite Software Services — Main JS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initVanta();
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initCounters();
  initBackToTop();
  initActiveNavLinks();
  initContactForm();
  initSmoothScroll();
});

/* ===== VANTA 3D BACKGROUNDS ===== */
function initVanta() {
  if (typeof VANTA === 'undefined') return;

  // Hero — NET effect
  if (document.getElementById('vanta-hero')) {
    VANTA.NET({
      el: '#vanta-hero',
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0xd4af37,
      backgroundColor: 0x080810,
      points: 12.00,
      maxDistance: 22.00,
      spacing: 18.00
    });
  }

  // About — WAVES effect
  if (document.getElementById('vanta-about')) {
    VANTA.WAVES({
      el: '#vanta-about',
      mouseControls: false,
      touchControls: false,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x0a0a18,
      waveHeight: 12,
      waveSpeed: 0.4,
      zoom: 0.9
    });
  }

  // Process — DOTS effect
  if (document.getElementById('vanta-process')) {
    VANTA.DOTS({
      el: '#vanta-process',
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0xd4af37,
      color2: 0x00d4ff,
      backgroundColor: 0x0d0d1a,
      size: 2,
      spacing: 35,
      showLines: false
    });
  }

  // Testimonials — NET effect (blue tint)
  if (document.getElementById('vanta-testimonials')) {
    VANTA.NET({
      el: '#vanta-testimonials',
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x00d4ff,
      backgroundColor: 0x080810,
      points: 8.00,
      maxDistance: 20.00,
      spacing: 22.00
    });
  }

  // CTA Banner — WAVES
  if (document.getElementById('vanta-cta')) {
    VANTA.WAVES({
      el: '#vanta-cta',
      mouseControls: false,
      touchControls: false,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x0d0d20,
      waveHeight: 20,
      waveSpeed: 0.6,
      zoom: 1.1
    });
  }
}

/* ===== NAVBAR ===== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ===== MOBILE MENU ===== */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  const toggle = () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  hamburger.addEventListener('click', toggle);

  mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  mobileMenu.addEventListener('click', e => {
    if (e.target === mobileMenu) toggle();
  });
}

/* ===== SCROLL REVEAL ===== */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

/* ===== ANIMATED COUNTERS ===== */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start = performance.now();

    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => observer.observe(el));
}

/* ===== BACK TO TOP ===== */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ===== ACTIVE NAV LINKS ===== */
function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.4, rootMargin: '-80px 0px -40% 0px' }
  );

  sections.forEach(s => observer.observe(s));
}

/* ===== CONTACT FORM ===== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = document.getElementById('submitBtn');
    const originalContent = btn.innerHTML;

    // Validate
    const required = form.querySelectorAll('[required]');
    let valid = true;
    required.forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = '#ff4444';
        valid = false;
      }
    });

    // Email validation
    const emailField = form.querySelector('#email');
    if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
      emailField.style.borderColor = '#ff4444';
      valid = false;
    }

    if (!valid) {
      shakeForm(form);
      return;
    }

    // Loading state
    btn.innerHTML = '<span>Sending...</span><span class="spinner">⟳</span>';
    btn.disabled = true;

    // Simulate submission (replace with actual endpoint)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Success state
    form.innerHTML = `
      <div class="form-success">
        <div class="success-icon">✅</div>
        <h4>Message Sent Successfully!</h4>
        <p>Thank you for reaching out. A senior engineer will contact you within 24 hours to discuss your project.</p>
      </div>
    `;
  });
}

function shakeForm(form) {
  form.animate([
    { transform: 'translateX(0)' },
    { transform: 'translateX(-8px)' },
    { transform: 'translateX(8px)' },
    { transform: 'translateX(-8px)' },
    { transform: 'translateX(0)' }
  ], { duration: 400, easing: 'ease-in-out' });
}

/* ===== SMOOTH SCROLL ===== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ===== SPINNER ANIMATION ===== */
const style = document.createElement('style');
style.textContent = `
  .spinner {
    display: inline-block;
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
