// TradeTrack Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const navHeight = document.querySelector('.nav').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Navbar background on scroll
  const nav = document.querySelector('.nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      nav.style.background = 'rgba(10, 10, 18, 0.95)';
      nav.style.borderBottomColor = 'rgba(255, 255, 255, 0.1)';
    } else {
      nav.style.background = 'rgba(10, 10, 18, 0.8)';
      nav.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
    }

    lastScroll = currentScroll;
  });

  // Animate elements on scroll
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe feature cards, platform cards, and pricing cards
  document.querySelectorAll('.feature-card, .platform-card, .pricing-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  // Add animate-in class styles
  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  // Stagger animation for grid items
  document.querySelectorAll('.features-grid, .platforms-grid, .pricing-grid').forEach(grid => {
    const cards = grid.querySelectorAll('.feature-card, .platform-card, .pricing-card');
    cards.forEach((card, index) => {
      card.style.transitionDelay = `${index * 0.1}s`;
    });
  });

  // Hero stats counter animation
  const statValues = document.querySelectorAll('.stat-value');

  const animateValue = (element, start, end, duration, suffix = '') => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = Math.floor(progress * (end - start) + start);

      if (suffix === '%') {
        element.textContent = current + suffix;
      } else if (suffix === '+') {
        element.textContent = current.toLocaleString() + suffix;
      } else {
        element.textContent = current.toLocaleString() + suffix;
      }

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statElements = entry.target.querySelectorAll('.stat-value');
        statElements.forEach(stat => {
          const text = stat.textContent;
          if (text.includes('K+')) {
            animateValue(stat, 0, 10, 1500, 'K+');
          } else if (text.includes('+')) {
            animateValue(stat, 0, 500, 1500, '+');
          } else if (text.includes('%')) {
            animateValue(stat, 0, 99.9, 1500, '%');
          }
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    statsObserver.observe(heroStats);
  }

  // Mobile menu toggle (for future implementation)
  const createMobileMenu = () => {
    const nav = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');

    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.className = 'nav-hamburger';
    hamburger.innerHTML = `
      <span></span>
      <span></span>
      <span></span>
    `;
    hamburger.style.cssText = `
      display: none;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
    `;

    hamburger.querySelectorAll('span').forEach(span => {
      span.style.cssText = `
        width: 24px;
        height: 2px;
        background: white;
        transition: all 0.3s ease;
      `;
    });

    // Show hamburger on mobile
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleMediaChange = (e) => {
      hamburger.style.display = e.matches ? 'flex' : 'none';
    };
    mediaQuery.addListener(handleMediaChange);
    handleMediaChange(mediaQuery);

    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('nav-links-open');
      hamburger.classList.toggle('nav-hamburger-open');
    });

    nav.appendChild(hamburger);
  };

  // Initialize mobile menu
  createMobileMenu();

  // Add mobile menu styles
  const mobileStyles = document.createElement('style');
  mobileStyles.textContent = `
    @media (max-width: 768px) {
      .nav-links {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(10, 10, 18, 0.98);
        flex-direction: column;
        padding: 24px;
        gap: 16px;
        transform: translateY(-10px);
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s ease;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }

      .nav-links-open {
        display: flex !important;
        transform: translateY(0);
        opacity: 1;
        pointer-events: all;
      }

      .nav-hamburger-open span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }

      .nav-hamburger-open span:nth-child(2) {
        opacity: 0;
      }

      .nav-hamburger-open span:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -5px);
      }
    }
  `;
  document.head.appendChild(mobileStyles);

  // Console welcome message
  console.log('%cTradeTrack', 'font-size: 24px; font-weight: bold; color: #6366f1;');
  console.log('%cProfessional Trade Journaling & Copy Trading', 'font-size: 14px; color: #888;');
});
