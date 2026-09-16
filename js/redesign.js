/**
 * RV UNIVERSITY PLACEMENTS REDESIGN INTERACTION ENGINE
 * Accessible, lightweight vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initStatCounters();
  initSchoolTabs();
  initAccordions();
  initPolicyFilters();
  initRecruiterModal();
  initStakeholderNavScroll();
  initCopyButtons();
});

/* 1. Animated Stat Counters with IntersectionObserver */
function initStatCounters() {
  const statElements = document.querySelectorAll('.rvu-stat-number[data-target]');
  if (!statElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target'));
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const isDecimal = el.getAttribute('data-decimal') === 'true';
        
        animateValue(el, 0, target, 1600, prefix, suffix, isDecimal);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  statElements.forEach(el => observer.observe(el));
}

function animateValue(obj, start, end, duration, prefix, suffix, isDecimal) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    // Ease-out cubic
    const easeOutProgress = 1 - Math.pow(1 - progress, 3);
    const current = start + (end - start) * easeOutProgress;
    
    obj.textContent = prefix + (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
    
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      obj.textContent = prefix + (isDecimal ? end.toFixed(1) : end) + suffix;
    }
  };
  window.requestAnimationFrame(step);
}

/* 2. School-by-School Talent Directory Tab Switcher */
function initSchoolTabs() {
  const tabBtns = Array.from(document.querySelectorAll('.rvu-tab-btn'));
  const tabPanes = document.querySelectorAll('.rvu-tab-pane');

  tabBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const targetSchool = btn.getAttribute('data-school');

      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const targetPane = document.getElementById(`school-pane-${targetSchool}`);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });

    // Keyboard arrow accessibility for WAI-ARIA tablist
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const next = tabBtns[(index + 1) % tabBtns.length];
        next.focus();
        next.click();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = tabBtns[(index - 1 + tabBtns.length) % tabBtns.length];
        prev.focus();
        prev.click();
      }
    });
  });
}

/* 3. Accessible Accordion Toggle for Policies & FAQs */
function initAccordions() {
  const accordionButtons = document.querySelectorAll('.rvu-accordion-btn');

  accordionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.rvu-accordion-item');
      const isOpen = item.classList.contains('open');

      // Close sibling items in the same group if desired, or allow multiple
      item.classList.toggle('open');
      btn.setAttribute('aria-expanded', !isOpen);
    });
  });
}

/* 4. Policy Filter Pills */
function initPolicyFilters() {
  const filterPills = document.querySelectorAll('.rvu-filter-pill');
  const accordionItems = document.querySelectorAll('.rvu-policy-drawer .rvu-accordion-item');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const category = pill.getAttribute('data-filter');

      accordionItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (category === 'all' || itemCat === category) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* 5. Corporate Recruiter Modal */
function initRecruiterModal() {
  const openBtns = document.querySelectorAll('[data-open-modal="recruiter-modal"]');
  const modal = document.getElementById('recruiter-modal');
  const closeBtn = document.querySelector('.rvu-modal-close');

  if (!modal) return;

  const openModal = () => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  openBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    const schoolSelect = btn.getAttribute('data-school-select');
    if (schoolSelect) {
      const selectEl = document.getElementById('target-school');
      if (selectEl) selectEl.value = schoolSelect;
    }
    openModal();
  }));

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  const form = document.getElementById('rvu-recruiter-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.textContent = 'Submitting Request...';
      submitBtn.disabled = true;

      setTimeout(() => {
        form.innerHTML = `
          <div style="text-align: center; padding: 30px 10px;">
            <div style="width: 56px; height: 56px; background-color: #d1fae5; color: #065f46; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 16px;">✓</div>
            <h4 style="color: #233039; font-size: 1.3rem; margin-bottom: 8px;">Expression of Interest Received!</h4>
            <p style="color: #475569; font-size: 0.95rem; margin-bottom: 20px;">Thank you for partnering with RV University. The Corporate & Alumni Relations (CAR) directorate will contact you within 24 business hours.</p>
            <button type="button" class="rvu-btn rvu-btn-primary" onclick="document.getElementById('recruiter-modal').classList.remove('active'); document.body.style.overflow='';">Close</button>
          </div>
        `;
      }, 900);
    });
  }
}

/* 6. Stakeholder Nav Active Tracker on Scroll & Smooth Click Navigation */
function initStakeholderNavScroll() {
  const navLinks = Array.from(document.querySelectorAll('.rvu-pill-link'));
  if (!navLinks.length) return;

  const targetMap = navLinks.map(link => {
    const id = link.getAttribute('href').replace('#', '');
    return {
      id,
      link,
      target: document.getElementById(id)
    };
  }).filter(item => item.target !== null);

  const onScroll = () => {
    const scrollPos = window.scrollY + 140;
    let activeId = '';

    targetMap.forEach(item => {
      const top = item.target.getBoundingClientRect().top + window.scrollY;
      const height = item.target.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        activeId = item.id;
      }
    });

    targetMap.forEach(item => {
      if (activeId && item.id === activeId) {
        item.link.classList.add('active');
      } else {
        item.link.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Smooth click scroll with sticky header offset
  targetMap.forEach(item => {
    item.link.addEventListener('click', (e) => {
      e.preventDefault();
      const headerOffset = 64;
      const elementPosition = item.target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      if (history.pushState) {
        history.pushState(null, null, `#${item.id}`);
      }
    });
  });
}

/* 7. Interactive Clipboard Copy Buttons */
function initCopyButtons() {
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const text = btn.getAttribute('data-copy');
      if (!text) return;

      const performFeedback = () => {
        const originalContent = btn.innerHTML;
        btn.classList.add('copied');
        btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Copied!`;
        setTimeout(() => {
          btn.innerHTML = originalContent;
          btn.classList.remove('copied');
        }, 2200);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(performFeedback).catch(() => {
          fallbackCopy(text);
          performFeedback();
        });
      } else {
        fallbackCopy(text);
        performFeedback();
      }
    });
  });
}

function fallbackCopy(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
  } catch (err) {}
  document.body.removeChild(textArea);
}
