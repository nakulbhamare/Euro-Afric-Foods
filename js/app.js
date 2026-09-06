/**
 * EURO AFRIC FOODS - APPLICATION LOGIC & INTERACTIONS
 * Brand: Euro Afric Foods | Tagline: Fresh Connect
 */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initMobileNav();
    initScrollReveals();
    initHorizontalTimeline();
    initDualPathwayForm();
    initProductModals();
    initInsightModals();
    initSmoothAnchors();
  });

  /* 1. Header Scroll Effects */
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* 2. Mobile Navigation Menu */
  function initMobileNav() {
    const toggle = document.querySelector('.mobile-toggle');
    const menuWrapper = document.querySelector('.nav-menu-wrapper');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!toggle || !menuWrapper) return;

    toggle.addEventListener('click', () => {
      const isOpen = menuWrapper.classList.contains('open');
      if (isOpen) {
        menuWrapper.classList.remove('open');
        toggle.classList.remove('active');
        document.body.style.overflow = '';
      } else {
        menuWrapper.classList.add('open');
        toggle.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuWrapper.classList.remove('open');
        toggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* 3. Scroll Triggered Reveals */
  function initScrollReveals() {
    const revealItems = document.querySelectorAll('.reveal-item');
    if (!revealItems.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealItems.forEach(el => observer.observe(el));
  }

  /* 4. Horizontal Process Timeline Controls */
  function initHorizontalTimeline() {
    const track = document.querySelector('.horizontal-timeline-track');
    const prevBtn = document.querySelector('.btn-timeline-prev');
    const nextBtn = document.querySelector('.btn-timeline-next');

    if (!track) return;

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -340, behavior: 'smooth' });
      });

      nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: 340, behavior: 'smooth' });
      });
    }

    // Drag to scroll functionality
    let isDown = false;
    let startX;
    let scrollLeft;

    track.addEventListener('mousedown', (e) => {
      isDown = true;
      track.style.cursor = 'grabbing';
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });

    track.addEventListener('mouseleave', () => {
      isDown = false;
      track.style.cursor = 'grab';
    });

    track.addEventListener('mouseup', () => {
      isDown = false;
      track.style.cursor = 'grab';
    });

    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.6;
      track.scrollLeft = scrollLeft - walk;
    });
  }

  /* 5. Dual-Pathway Dynamic Contact Form */
  function initDualPathwayForm() {
    const pathwayBtns = document.querySelectorAll('.pathway-btn');
    const dynamicFieldContainer = document.getElementById('dynamicFormFields');
    const inquiryForm = document.getElementById('inquiryForm');
    const formFeedback = document.getElementById('formFeedback');
    const formHeading = document.getElementById('formHeading');

    if (!dynamicFieldContainer || !inquiryForm) return;

    const buyerFieldsHtml = `
      <div class="form-group-grid">
        <div class="form-group">
          <label class="form-label" for="contactName">Full Name *</label>
          <input type="text" id="contactName" name="name" class="form-input" placeholder="e.g. Marco Rossi" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="contactCompany">Company / Organization *</label>
          <input type="text" id="contactCompany" name="company" class="form-input" placeholder="e.g. EuroFruit Distribution S.r.l." required>
        </div>
      </div>
      <div class="form-group-grid">
        <div class="form-group">
          <label class="form-label" for="contactEmail">Work Email *</label>
          <input type="email" id="contactEmail" name="email" class="form-input" placeholder="m.rossi@eurofruit.it" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="productInterest">Product Category Interest *</label>
          <select id="productInterest" name="product_interest" class="form-select" required>
            <option value="" disabled selected>Select category...</option>
            <option value="Fresh Fruits">Fresh Fruits (Avocado, Mango, Passionfruit)</option>
            <option value="Dried Fruits">Dried Fruits & Nuts</option>
            <option value="Fresh Vegetables">Export Vegetables (Beans, Peas, Chilies)</option>
            <option value="Commodities">Agricultural Commodities (Coffee, Cocoa, Sesame)</option>
            <option value="Packaged Foods">Prepared & Packaged Products</option>
          </select>
        </div>
      </div>
      <div class="form-group-grid">
        <div class="form-group">
          <label class="form-label" for="requiredVolume">Estimated Required Volume</label>
          <input type="text" id="requiredVolume" name="volume" class="form-input" placeholder="e.g. 2 x 40ft Reefer Containers / month">
        </div>
        <div class="form-group">
          <label class="form-label" for="destinationPort">Destination Country / Port</label>
          <input type="text" id="destinationPort" name="destination" class="form-input" placeholder="e.g. Genoa, Italy / Rotterdam">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" for="contactMessage">Specification & Requirements *</label>
        <textarea id="contactMessage" name="message" class="form-textarea" placeholder="Detail your quality requirements, delivery schedule, and packaging specifications..." required></textarea>
      </div>
    `;

    const supplierFieldsHtml = `
      <div class="form-group-grid">
        <div class="form-group">
          <label class="form-label" for="contactName">Full Name *</label>
          <input type="text" id="contactName" name="name" class="form-input" placeholder="e.g. Kwame Mensah" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="contactCompany">Producer / Export Entity *</label>
          <input type="text" id="contactCompany" name="company" class="form-input" placeholder="e.g. Volta Valley Agro Exporters" required>
        </div>
      </div>
      <div class="form-group-grid">
        <div class="form-group">
          <label class="form-label" for="contactEmail">Business Email *</label>
          <input type="email" id="contactEmail" name="email" class="form-input" placeholder="k.mensah@voltavalley.com" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="originCountry">Country of Origin *</label>
          <input type="text" id="originCountry" name="origin_country" class="form-input" placeholder="e.g. Kenya, Ghana, Uganda, Côte d'Ivoire" required>
        </div>
      </div>
      <div class="form-group-grid">
        <div class="form-group">
          <label class="form-label" for="supplierProduct">Harvest / Product Details *</label>
          <input type="text" id="supplierProduct" name="product" class="form-input" placeholder="e.g. Hass Avocados / Fine Green Beans" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="availableCapacity">Seasonal Capacity</label>
          <input type="text" id="availableCapacity" name="capacity" class="form-input" placeholder="e.g. 50 metric tons / season">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" for="certifications">Compliance & Quality Certifications (If Any)</label>
        <input type="text" id="certifications" name="certifications" class="form-input" placeholder="e.g. GlobalG.A.P., SMETA, Organic, Phytosanitary readiness">
      </div>
      <div class="form-group">
        <label class="form-label" for="contactMessage">Supply Details & Harvest Timeline *</label>
        <textarea id="contactMessage" name="message" class="form-textarea" placeholder="Detail your harvest schedule, packing capabilities, and export readiness..." required></textarea>
      </div>
    `;

    // Set initial
    dynamicFieldContainer.innerHTML = buyerFieldsHtml;

    pathwayBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        pathwayBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const pathway = btn.getAttribute('data-pathway');

        if (pathway === 'buyer') {
          dynamicFieldContainer.innerHTML = buyerFieldsHtml;
          if (formHeading) formHeading.textContent = 'European Buyer Trade Inquiry';
        } else {
          dynamicFieldContainer.innerHTML = supplierFieldsHtml;
          if (formHeading) formHeading.textContent = 'African Producer & Supplier Inquiry';
        }
        if (formFeedback) formFeedback.classList.remove('success');
      });
    });

    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = inquiryForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = 'TRANSMITTING INQUIRY...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        if (formFeedback) {
          formFeedback.classList.add('success');
          formFeedback.innerHTML = `
            <strong>Inquiry Received Successfully.</strong><br>
            Our trade desk in Italy will review your specifications and connect with you within 24 business hours.
          `;
        }
        inquiryForm.reset();
      }, 1100);
    });
  }

  /* 6. Product Category Exploration Modal */
  function initProductModals() {
    const productCards = document.querySelectorAll('.product-card');
    const modalOverlay = document.getElementById('productModal');
    const modalContent = document.getElementById('productModalContent');
    const closeBtn = modalOverlay ? modalOverlay.querySelector('.modal-close-btn') : null;

    if (!modalOverlay || !modalContent) return;

    const categoryData = {
      'fresh-fruits': {
        title: 'FRESH FRUITS',
        eyebrow: 'TRADE CATEGORY 01',
        desc: 'Direct sourcing of high-demand African fresh fruits harvested at peak maturity, pre-cooled at origin, and transported under unbroken cold-chain conditions to European distribution hubs.',
        keyItems: ['Hass & Fuerte Avocados', 'Kent & Apple Mangoes', 'Purple Passion Fruits', 'Smooth Cayenne Pineapples', 'Citrus & Papayas'],
        tradeSpecs: 'Euro-pallet standard packing, controlled atmosphere reefer transport, complete phytosanitary compliance.',
        image: 'assets/images/fresh-fruits.jpg'
      },
      'dried-fruits': {
        title: 'DRIED FRUITS & NUTS',
        eyebrow: 'TRADE CATEGORY 02',
        desc: 'Naturally solar-dried and ambient-processed fruit varieties and premium edible nuts sourced from verified processing cooperatives across West and East Africa.',
        keyItems: ['Sun-Dried Mango Slices', 'Dried Golden Pineapple Rings', 'Dried Organic Bananas', 'Premium Raw & Roasted Cashews'],
        tradeSpecs: 'Bulk food-grade vacuum sealed cartons, moisture controlled, certified aflatoxin-tested.',
        image: 'assets/images/dried-fruits.jpg'
      },
      'vegetables': {
        title: 'EXPORT VEGETABLES',
        eyebrow: 'TRADE CATEGORY 03',
        desc: 'Specialty horticulture and fresh export vegetables cultivated under strict European compliance frameworks and flown or shipped with rapid port transit.',
        keyItems: ['Fine Green Beans (Haricots Verts)', 'Sugar Snap & Snow Peas', 'Bird\'s Eye & Habanero Chilies', 'Baby Courgettes & Fresh Herbs'],
        tradeSpecs: 'Rapid air-freight and maritime cold transit, MRL compliant, pesticide-residue audited.',
        image: 'assets/images/vegetables.jpg'
      },
      'commodities': {
        title: 'AGRICULTURAL COMMODITIES',
        eyebrow: 'TRADE CATEGORY 04',
        desc: 'Large-scale agricultural commodities sourced directly from organized farming networks with strict origin traceability and independent moisture and quality verification.',
        keyItems: ['Specialty Arabica & Robusta Coffee Beans', 'Single-Origin Cocoa Beans', 'High-Purity White Sesame Seeds', 'Raw Cashew Nuts in Shell (RCN)'],
        tradeSpecs: 'Standard 50kg/60kg jute bags, containerized bulk shipment, independent lab inspection certificates.',
        image: 'assets/images/commodities.jpg'
      },
      'packaged-foods': {
        title: 'PREPARED & PACKAGED FOODS',
        eyebrow: 'TRADE CATEGORY 05',
        desc: 'Value-added agro-food formulations, natural plant oils, purees, and ready-to-distribute packaged products adhering to strict EU labeling and packaging regulations.',
        keyItems: ['Cold-Pressed Extra Virgin Avocado Oil', 'Organic Single-Origin Fruit Purees', 'Refined & Virgin Seed Oils', 'Artisanal Natural Food Ingredients'],
        tradeSpecs: 'Retail-ready and food-service bulk containers, tamper-evident glass and aluminum packaging.',
        image: 'assets/images/packaged-foods.jpg'
      }
    };

    productCards.forEach(card => {
      card.addEventListener('click', () => {
        const catKey = card.getAttribute('data-category');
        const data = categoryData[catKey];
        if (!data) return;

        modalContent.innerHTML = `
          <div class="eyebrow-label" style="margin-bottom:0.75rem;">${data.eyebrow}</div>
          <h2 style="font-size:2rem; margin-bottom:1.25rem; color:#FFFFFF;">${data.title}</h2>
          <div style="width:100%; height:260px; overflow:hidden; border-radius:2px; margin-bottom:1.5rem;">
            <img src="${data.image}" alt="${data.title}" style="width:100%; height:100%; object-fit:cover;">
          </div>
          <p style="font-size:1rem; line-height:1.7; color:var(--text-light-muted); margin-bottom:1.5rem;">${data.desc}</p>
          <div style="background:var(--color-primary-dark); padding:1.5rem; border:1px solid var(--border-dark); border-radius:2px; margin-bottom:1.75rem;">
            <h4 style="font-size:0.875rem; color:var(--color-orange); letter-spacing:0.12em; margin-bottom:0.75rem;">REPRESENTATIVE PRODUCTS IN ARCHITECTURE:</h4>
            <ul style="list-style:none; display:grid; grid-template-columns:1fr 1fr; gap:0.5rem;">
              ${data.keyItems.map(item => `<li style="font-size:0.9rem; color:#FFFFFF;">• ${item}</li>`).join('')}
            </ul>
          </div>
          <div style="font-size:0.875rem; color:var(--color-beige-soft); margin-bottom:2rem;">
            <strong>Trade & Packaging Framework:</strong> ${data.tradeSpecs}
          </div>
          <a href="#contact" class="btn-primary modal-inquire-btn" style="width:100%;">
            INQUIRE ABOUT THIS CATEGORY <span class="btn-arrow">→</span>
          </a>
        `;

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        const modalInquire = modalContent.querySelector('.modal-inquire-btn');
        if (modalInquire) {
          modalInquire.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
          });
        }
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /* 7. Trade Intelligence Modal */
  function initInsightModals() {
    const insightCards = document.querySelectorAll('.insight-card');
    const modalOverlay = document.getElementById('insightModal');
    const modalContent = document.getElementById('insightModalContent');
    const closeBtn = modalOverlay ? modalOverlay.querySelector('.modal-close-btn') : null;

    if (!modalOverlay || !modalContent) return;

    const articles = {
      'insight-1': {
        tag: 'TRADE ARCHITECTURE',
        title: "Europe Doesn't Buy Promises. It Buys Systems.",
        body: `
          <p>International agricultural commerce between African origins and European commercial buyers is often misunderstood as a purely price-driven transaction. In reality, European importers, wholesalers, and retail chains operate under stringent regulatory and contractual protocols where consistency and verification supersede speculative spot pricing.</p>
          <p>A reliable trade architecture requires three non-negotiable foundations:</p>
          <ul style="margin:1rem 0 1.5rem 1.25rem; line-height:1.8;">
            <li><strong>Documentary Traceability:</strong> Complete auditable chain-of-custody from farm parcel to bill of lading.</li>
            <li><strong>Sanitary & Phytosanitary Alignment:</strong> Pre-emptive laboratory testing for pesticide maximum residue limits (MRLs) and microbiological standards.</li>
            <li><strong>Uninterrupted Cold-Chain Management:</strong> Continuous thermal tracking from harvest pre-cooling to bonded European warehouse.</li>
          </ul>
          <p>Euro Afric Foods designs trade protocols where compliance is engineered into the transaction from day one.</p>
        `
      },
      'insight-2': {
        tag: 'MARKET ACCESS',
        title: 'How African Agricultural Products Can Enter European Markets',
        body: `
          <p>Entering the European Union food market requires structured preparation across agronomy, packaging standards, and commercial alignment. The transition from local export readiness to certified European market access involves systematic compliance with EU Directive standards.</p>
          <p>Key pillars include GlobalG.A.P. certification, aligned grading and sizing, packaging durability suited for intercontinental transit, and reliable direct representation at European distribution terminals.</p>
        `
      },
      'insight-3': {
        tag: 'BUYER PERSPECTIVE',
        title: 'What European Buyers Look For in African Sourcing',
        body: `
          <p>European fresh produce buyers prioritize supply continuity, transparent communication, and rapid dispute-resolution mechanisms. Sourcing from African origins offers exceptional seasonal timing and product quality when backed by structured commercial governance.</p>
        `
      },
      'insight-4': {
        tag: 'SUPPLY CHAIN',
        title: 'From Farm to European Market: The Cold-Chain Mandate',
        body: `
          <p>Perishable agricultural commodities demand precision temperature management. Maintaining optimal pulp temperatures throughout pre-cooling, maritime reefer loading, and port clearance ensures shelf-life extension and commercial viability at final wholesale destinations.</p>
        `
      },
      'insight-5': {
        tag: 'COMMERCIAL STRATEGY',
        title: 'Building Reliable Agricultural Supply Chains',
        body: `
          <p>Moving away from erratic spot buying toward multi-season commercial frameworks allows producers to plan agricultural inputs and buyers to secure volume allocations with predictable quality metrics.</p>
        `
      },
      'insight-6': {
        tag: 'EU REGULATION',
        title: 'Understanding EU Market Requirements & Compliance',
        body: `
          <p>Detailed overview of European food safety regulations, official phytosanitary certificates, organic verification pathways, and compliant customs clearance documentation required for smooth port entry into Italy and broader Europe.</p>
        `
      }
    };

    insightCards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-insight-id');
        const art = articles[id];
        if (!art) return;

        modalContent.innerHTML = `
          <div class="eyebrow-label" style="margin-bottom:0.75rem;">${art.tag}</div>
          <h2 style="font-size:1.85rem; line-height:1.2; margin-bottom:1.5rem; color:#FFFFFF;">${art.title}</h2>
          <div style="font-size:1rem; line-height:1.75; color:var(--text-light-muted); margin-bottom:2rem;">
            ${art.body}
          </div>
          <a href="#contact" class="btn-primary modal-inquire-btn" style="width:100%;">
            START A TRADE CONVERSATION <span class="btn-arrow">→</span>
          </a>
        `;

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        const modalInquire = modalContent.querySelector('.modal-inquire-btn');
        if (modalInquire) {
          modalInquire.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
          });
        }
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /* 8. Smooth Anchor Navigation */
  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerHeight = 80;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
})();
