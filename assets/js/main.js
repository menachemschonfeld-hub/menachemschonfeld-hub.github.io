/* ============================================
   SAFESIDE INSURANCE — MAIN JS
   ============================================ */

// ===== CONFIG =====
// Replace with your actual n8n webhook URLs when connecting
const N8N_ENDPOINTS = {
  quote: 'https://YOUR-N8N-INSTANCE.com/webhook/safeside-quote',
  contact: 'https://YOUR-N8N-INSTANCE.com/webhook/safeside-contact',
  claim: 'https://YOUR-N8N-INSTANCE.com/webhook/safeside-claim',
  coi: 'https://YOUR-N8N-INSTANCE.com/webhook/safeside-coi',
  policyChange: 'https://YOUR-N8N-INSTANCE.com/webhook/safeside-policy-change',
  newsletter: 'https://YOUR-N8N-INSTANCE.com/webhook/safeside-newsletter'
};

// ===== STICKY NAV =====
const nav = document.querySelector('.nav');
let lastScroll = 0;
function handleScroll() {
  const scroll = window.scrollY;
  if (nav) {
    if (scroll > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  lastScroll = scroll;
}
window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

// ===== MOBILE MENU =====
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  // close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ===== STAT COUNTERS =====
function animateNumber(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const decimals = parseInt(el.dataset.decimals) || 0;
  const duration = 1800;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = (target * eased).toFixed(decimals);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateNumber(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => statObserver.observe(el));

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-question, .faq-q');
  if (!q) return;
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    // close all others (one-at-a-time within same list)
    const list = item.parentElement;
    if (list) list.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ===== ACTIVE NAV LINK =====
const path = window.location.pathname;
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href && href !== '/' && path.includes(href.replace(/\/index\.html$/, ''))) {
    link.classList.add('active');
  }
});

// ===== MULTI-STEP QUOTE FORM =====
const quoteForm = document.querySelector('[data-form="quote"]');
if (quoteForm) {
  const steps = quoteForm.querySelectorAll('.form-step');
  const dots = quoteForm.querySelectorAll('.form-step-progress-item');
  const nextBtns = quoteForm.querySelectorAll('[data-step-next], [data-action="next"]');
  const prevBtns = quoteForm.querySelectorAll('[data-step-prev], [data-action="prev"]');
  let currentStep = 0;

  function showStep(idx) {
    steps.forEach((s, i) => {
      s.classList.toggle('active', i === idx);
      s.style.display = i === idx ? 'block' : 'none';
    });
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === idx);
      d.classList.toggle('complete', i < idx);
    });
  }
  function validateStep(idx) {
    const required = steps[idx].querySelectorAll('[required]');
    let valid = true;
    const radioGroupsChecked = new Set();
    required.forEach(r => {
      if (r.type === 'radio') {
        if (radioGroupsChecked.has(r.name)) return;
        radioGroupsChecked.add(r.name);
        const group = steps[idx].querySelectorAll(`[name="${r.name}"]`);
        const checked = Array.from(group).some(g => g.checked);
        if (!checked) valid = false;
      } else if (!r.value.trim()) {
        r.style.borderColor = '#A32D2D';
        valid = false;
      } else {
        r.style.borderColor = '';
      }
    });
    return valid;
  }
  nextBtns.forEach(btn => btn.addEventListener('click', () => {
    if (!validateStep(currentStep)) return;
    if (currentStep < steps.length - 1) {
      currentStep++;
      showStep(currentStep);
      quoteForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }));
  prevBtns.forEach(btn => btn.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  }));
  showStep(0);
  // expose for submit handler to advance to last step on success
  quoteForm._advanceToFinal = () => { currentStep = steps.length - 1; showStep(currentStep); };
}

// ===== UNIVERSAL FORM SUBMIT (n8n) =====
async function submitForm(form, endpoint) {
  const data = Object.fromEntries(new FormData(form));
  data._submittedAt = new Date().toISOString();
  data._page = window.location.pathname;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.ok;
  } catch (err) {
    console.warn('Form submission failed (likely no n8n endpoint set yet):', err);
    return false;
  }
}

document.querySelectorAll('form[data-form]').forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formType = form.dataset.form;
    const endpoint = N8N_ENDPOINTS[formType];
    const submitBtn = form.querySelector('[type="submit"]');
    const successMsg = form.querySelector('.form-success');
    const errorMsg = form.querySelector('.form-error');

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.dataset.originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending…';
    }

    // If endpoint not configured, simulate success for demo
    let ok = false;
    if (endpoint && !endpoint.includes('YOUR-N8N-INSTANCE')) {
      ok = await submitForm(form, endpoint);
    } else {
      // Demo mode — log to console, show success
      console.log('[DEMO MODE] Form data:', Object.fromEntries(new FormData(form)));
      await new Promise(r => setTimeout(r, 800));
      ok = true;
    }

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = submitBtn.dataset.originalText || 'Submit';
    }

    if (ok) {
      if (form === quoteForm && quoteForm._advanceToFinal) {
        quoteForm._advanceToFinal();
        form.reset();
      } else {
        if (successMsg) successMsg.classList.add('active');
        form.reset();
      }
      if (errorMsg) errorMsg.classList.remove('active');
    } else {
      if (errorMsg) errorMsg.classList.add('active');
    }
  });
});

// ===== SMOOTH ANCHOR SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== CURRENT YEAR =====
document.querySelectorAll('[data-year]').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// ===== WORD ROTATOR (cinematic hero) =====
document.querySelectorAll('.word-rotator').forEach(rotator => {
  let words;
  try {
    words = JSON.parse(rotator.dataset.words);
  } catch (e) {
    return;
  }
  if (!Array.isArray(words) || words.length < 2) return;
  
  const current = rotator.querySelector('.word-rotator-current');
  if (!current) return;
  
  let idx = 0;
  const cycle = () => {
    current.classList.add('fading');
    setTimeout(() => {
      idx = (idx + 1) % words.length;
      current.innerHTML = words[idx];
      current.classList.remove('fading');
      current.classList.add('entering');
      requestAnimationFrame(() => {
        current.classList.remove('entering');
      });
    }, 400);
  };
  
  setInterval(cycle, 2800);
});

// ===== PARALLAX IMAGES (subtle, performant) =====
const parallaxImages = document.querySelectorAll('.parallax-image');
if (parallaxImages.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let ticking = false;
  const updateParallax = () => {
    const scrollY = window.scrollY;
    parallaxImages.forEach(img => {
      const rect = img.getBoundingClientRect();
      const speed = parseFloat(img.dataset.parallaxSpeed) || 0.3;
      // Only animate when in viewport
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        const offset = (rect.top - window.innerHeight / 2) * -speed * 0.4;
        img.style.transform = `translateY(${offset}px) scale(1.15)`;
      }
    });
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
  updateParallax();
}

// ===== VIDEO HERO — graceful fallback if video fails =====
document.querySelectorAll('.hero-video').forEach(video => {
  video.addEventListener('error', () => {
    const poster = video.getAttribute('poster');
    if (poster) {
      const fallback = document.createElement('div');
      fallback.style.cssText = `position:absolute;inset:0;background-image:url('${poster}');background-size:cover;background-position:center;z-index:1;`;
      video.parentNode.insertBefore(fallback, video);
      video.style.display = 'none';
    }
  });
  // Ensure autoplay works on iOS
  video.play().catch(() => {});
});
