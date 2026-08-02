document.addEventListener('DOMContentLoaded', () => {

  // ════════════════════════════════════════════════════════════════
  //  MOBILE MENU
  // ════════════════════════════════════════════════════════════════
  const mobileMenuOverlay = document.getElementById('mobile-menu');
  const hamburgerBtn      = document.getElementById('hamburger-btn');
  const menuCloseBtn      = document.getElementById('mobile-menu-close');

  function openMenu() {
    if (!mobileMenuOverlay) return;
    mobileMenuOverlay.classList.add('open');
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    if (!mobileMenuOverlay) return;
    mobileMenuOverlay.classList.remove('open');
    document.body.classList.remove('menu-open');
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMenu);
  if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeMenu);

  // Click outside drawer to close
  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', (e) => {
      if (e.target === mobileMenuOverlay) closeMenu();
    });
  }

  // ════════════════════════════════════════════════════════════════
  //  SMOOTH SCROLL — all anchor links + close mobile menu
  // ════════════════════════════════════════════════════════════════
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        closeMenu();
        setTimeout(() => {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      }
    });
  });

  // ════════════════════════════════════════════════════════════════
  //  ACTIVE NAV PILL ON SCROLL
  // ════════════════════════════════════════════════════════════════
  const sections = document.querySelectorAll('header[id], section[id]');
  const navPills = document.querySelectorAll('.nav-pill');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navPills.forEach(p => p.classList.remove('active'));
        const match = document.querySelector(`.nav-pill[href="#${entry.target.id}"]`);
        if (match) match.classList.add('active');
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => sectionObserver.observe(s));

  // ════════════════════════════════════════════════════════════════
  //  SERVICE ROW SWITCHING (Services We Provide)
  // ════════════════════════════════════════════════════════════════
  const serviceData = {
    'svc-bridal': {
      largeImg: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=900&q=85',
      smallImg:  'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=600&q=80'
    },
    'svc-nails': {
      largeImg: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=85',
      smallImg:  'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=600&q=80'
    },
    'svc-lash': {
      largeImg: 'https://images.unsplash.com/photo-1583241800698-e8ab01830a34?auto=format&fit=crop&w=900&q=85',
      smallImg:  'https://images.unsplash.com/photo-1512290900676-26c2a48f9f3d?auto=format&fit=crop&w=600&q=80'
    },
    'svc-pedi': {
      largeImg: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=85',
      smallImg:  'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=600&q=80'
    }
  };

  document.querySelectorAll('.service-row-item').forEach(row => {
    row.addEventListener('click', () => {
      document.querySelectorAll('.service-row-item').forEach(r => r.classList.remove('active'));
      row.classList.add('active');

      const data = serviceData[row.id];
      if (data) {
        const largeCard = document.querySelector('.service-img-card.large-service-img');
        const smallCard = document.querySelector('.service-img-card.small-service-img');
        if (largeCard) largeCard.style.backgroundImage = `url('${data.largeImg}')`;
        if (smallCard) smallCard.style.backgroundImage = `url('${data.smallImg}')`;
      }
    });
  });

  // ════════════════════════════════════════════════════════════════
  //  ALL SERVICES CARD FILTER (category pills)
  // ════════════════════════════════════════════════════════════════
  const serviceFilterPills = document.querySelectorAll('.category-filter-pills .filter-pill');
  const serviceCards       = document.querySelectorAll('.service-card');

  serviceFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      serviceFilterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.dataset.filter;
      serviceCards.forEach(card => {
        const show = (filter === 'all') || (card.dataset.category === filter);
        card.style.display = show ? '' : 'none';
      });
    });
  });

  // ════════════════════════════════════════════════════════════════
  //  GALLERY FILTER PILLS
  // ════════════════════════════════════════════════════════════════
  const galleryFilterPills = document.querySelectorAll('.gallery-filter-pills .filter-pill');
  const galleryItems       = document.querySelectorAll('.gallery-item');

  galleryFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      galleryFilterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.dataset.galFilter;
      galleryItems.forEach(item => {
        const show = (filter === 'all') || (item.dataset.galCategory === filter);
        item.style.display = show ? '' : 'none';
      });
    });
  });

  // ════════════════════════════════════════════════════════════════
  //  GALLERY LIGHTBOX
  // ════════════════════════════════════════════════════════════════
  const lightbox    = document.createElement('div');
  lightbox.className = 'lightbox-overlay';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.innerHTML = `
    <div class="lightbox-inner">
      <img class="lightbox-img" src="" alt="Gallery preview" />
      <span class="lightbox-label"></span>
    </div>
    <button class="lightbox-close" aria-label="Close">&times;</button>
  `;
  document.body.appendChild(lightbox);

  const lbImg   = lightbox.querySelector('.lightbox-img');
  const lbLabel = lightbox.querySelector('.lightbox-label');
  const lbClose = lightbox.querySelector('.lightbox-close');

  function openLightbox(url, label) {
    lbImg.src     = url;
    lbLabel.textContent = label || '';
    lightbox.classList.add('open');
    document.body.classList.add('menu-open');
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.classList.remove('menu-open');
    setTimeout(() => { lbImg.src = ''; }, 300);
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const bg    = item.style.backgroundImage || '';
      const url   = bg.replace(/url\(['"]?/, '').replace(/['"]?\)$/, '');
      const label = item.querySelector('.gallery-label')?.textContent || '';
      openLightbox(url, label);
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // ════════════════════════════════════════════════════════════════
  //  ESC KEY — close lightbox or mobile menu
  // ════════════════════════════════════════════════════════════════
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (lightbox.classList.contains('open')) { closeLightbox(); return; }
    if (mobileMenuOverlay?.classList.contains('open')) closeMenu();
  });

  // ════════════════════════════════════════════════════════════════
  //  FAQ ACCORDION
  // ════════════════════════════════════════════════════════════════
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ════════════════════════════════════════════════════════════════
  //  HERO SLIDER PROGRESS BAR ANIMATION
  // ════════════════════════════════════════════════════════════════
  let fill   = 0;
  const fillEl = document.querySelector('.t-progress');
  if (fillEl) {
    setInterval(() => {
      fill = (fill + 1) % 101;
      fillEl.style.width = (20 + fill * 0.7) + '%';
    }, 80);
  }

  // ════════════════════════════════════════════════════════════════
  //  SCROLL-REVEAL ANIMATION (subtle entrance for section cards)
  // ════════════════════════════════════════════════════════════════
  const revealEls = document.querySelectorAll(
    '.service-card, .review-card-item, .why-item, .gallery-item, .faq-item'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => {
    el.classList.add('reveal-ready');
    revealObserver.observe(el);
  });

});
