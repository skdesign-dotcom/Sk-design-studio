/**
 * Sunil's Portfolio - Web Components & Interactivity
 */

// ==========================================================================
// PORTFOLIO PROJECT DATABASE
// ==========================================================================
const projectsData = [
  {
    id: 'pup',
    title: 'PUP - Power On Demand',
    category: 'all',
    desc: 'PUP is an on-demand mobile charging app solution for electric vehicles. It provides a simple checkout process where users can locate mobile fast charging vans on a map, book real-time charge slots, and monitor battery statistics directly in the application.',
    image: 'assets/project-pup.png'
  },
  {
    id: 'fitpulse',
    title: 'FitPulse - Health Companion',
    category: 'product',
    desc: 'A comprehensive health tracking application combining hardware sensor telemetry with dietary tracking. Features custom widgets for real-time heart rate monitoring, calorie counters, sleep tracking, and personalized medical suggestions.',
    image: 'assets/service-uiux.png'
  },
  {
    id: 'aura',
    title: 'Aura Creative Agency Website',
    category: 'animation',
    desc: 'A high-end creative agency marketing portal built to highlight immersive visual assets. Features fluid canvas web animations, modern typography layout, and optimized web load times for high-density photography.',
    image: 'assets/service-web.png'
  },
  {
    id: 'schedulego',
    title: 'ScheduleGo Dashboard',
    category: 'figma',
    desc: 'A premium calendar workspace dashboard designed to automate meetings scheduling. Offers user timezone matching, drag-and-drop availability charts, team stats reports, and deep slack integrations.',
    image: 'assets/service-app.png'
  },
  {
    id: 'neonbranding',
    title: 'Neon Brand Graphic System',
    category: 'graphic',
    desc: 'Complete brand identity guidelines and digital assets suite developed for a modern EV brand. Includes typography styles, color palette formulations, high-contrast layouts, and dynamic print collateral mockups.',
    image: 'assets/project-pup.png'
  }
];

// ==========================================================================
// REGISTER CUSTOM ELEMENTS (WEB COMPONENTS)
// ==========================================================================
class NavBar extends HTMLElement {
  connectedCallback() {
    // Add scroll shrink listener
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        this.classList.add('scrolled');
      } else {
        this.classList.remove('scrolled');
      }
    });
  }
}
customElements.define('nav-bar', NavBar);

class HeroSection extends HTMLElement {}
customElements.define('hero-section', HeroSection);

class AboutSection extends HTMLElement {}
customElements.define('about-section', AboutSection);

class ServicesSection extends HTMLElement {}
customElements.define('services-section', ServicesSection);

class ExperienceSection extends HTMLElement {}
customElements.define('experience-section', ExperienceSection);

class WhyHireMeSection extends HTMLElement {}
customElements.define('why-hire-me-section', WhyHireMeSection);

class PortfolioSection extends HTMLElement {}
customElements.define('portfolio-section', PortfolioSection);

class ContactSection extends HTMLElement {}
customElements.define('contact-section', ContactSection);

class MarqueeBanner extends HTMLElement {}
customElements.define('marquee-banner', MarqueeBanner);

class FooterSection extends HTMLElement {}
customElements.define('footer-section', FooterSection);

// ==========================================================================
// PAGE INTERACTIVITY HANDLERS
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Mobile navigation toggle drawer
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinksLeft = document.querySelector('.nav-links.left');
  const navLinksRight = document.querySelector('.nav-links.right');
  
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navLinksLeft.classList.toggle('open');
      navLinksRight.classList.toggle('open');
    });
  }

  // Close mobile drawer when a link is clicked
  const allNavLinks = document.querySelectorAll('.nav-link');
  allNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navLinksLeft.classList.contains('open')) {
        mobileToggle.classList.remove('active');
        navLinksLeft.classList.remove('open');
        navLinksRight.classList.remove('open');
      }
    });
  });

  // 2. Active Section Scroll Highlighter (IntersectionObserver)
  const sections = document.querySelectorAll('hero-section, about-section, services-section, experience-section, why-hire-me-section, portfolio-section, contact-section');
  const navItems = {
    'hero': document.getElementById('nav-home'),
    'about': document.getElementById('nav-about'),
    'services': document.getElementById('nav-services'),
    'experience': document.getElementById('nav-experience'),
    'portfolio': document.getElementById('nav-portfolio'),
    'contact': document.getElementById('nav-contact')
  };

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        
        // Remove active class from all links
        Object.values(navItems).forEach(item => {
          if (item) item.classList.remove('active');
        });

        // Add active class to corresponding menu link
        let targetKey = id;
        if (id === 'why-hire') targetKey = 'experience'; // Map why-hire to experience area contextually
        
        if (navItems[targetKey]) {
          navItems[targetKey].classList.add('active');
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // 3. Portfolio Tab Filter & Slide updates
  const filterButtons = document.querySelectorAll('.filter-pill');
  const projectCard = document.getElementById('project-card');
  const projectImg = document.getElementById('project-img');
  const projectTitle = document.getElementById('project-title');
  const projectDesc = document.getElementById('project-desc');
  const projectIndicators = document.querySelectorAll('#portfolio .indicator');
  
  let currentFilteredProjects = [...projectsData];
  let activeProjectIndex = 0;

  function updateProjectDisplay(project, animate = true) {
    if (!project) return;
    
    if (animate) {
      // Fade out transition
      projectCard.style.opacity = '0';
      projectCard.style.transform = 'translateY(15px)';
      
      setTimeout(() => {
        projectImg.src = project.image;
        projectImg.alt = `${project.title} Mockup`;
        projectTitle.textContent = project.title;
        projectDesc.textContent = project.desc;
        
        // Fade back in
        projectCard.style.opacity = '1';
        projectCard.style.transform = 'translateY(0)';
      }, 300);
    } else {
      projectImg.src = project.image;
      projectImg.alt = `${project.title} Mockup`;
      projectTitle.textContent = project.title;
      projectDesc.textContent = project.desc;
    }
  }

  function renderProjectIndicators() {
    projectIndicators.forEach((ind, index) => {
      if (index < currentFilteredProjects.length) {
        ind.style.display = 'inline-block';
        if (index === activeProjectIndex) {
          ind.classList.add('active');
        } else {
          ind.classList.remove('active');
        }
      } else {
        ind.style.display = 'none';
      }
    });
  }

  // Hook up filter tab clicks
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Active state highlight
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      
      if (filter === 'all') {
        currentFilteredProjects = projectsData.filter(p => p.category === 'all' || p.category === 'product' || p.category === 'animation' || p.category === 'figma' || p.category === 'graphic');
      } else {
        currentFilteredProjects = projectsData.filter(p => p.category === filter);
      }
      
      activeProjectIndex = 0;
      updateProjectDisplay(currentFilteredProjects[activeProjectIndex]);
      renderProjectIndicators();
    });
  });

  // Hook up project dot indicator clicks
  projectIndicators.forEach(ind => {
    ind.addEventListener('click', () => {
      const idx = parseInt(ind.getAttribute('data-index'), 10);
      if (idx < currentFilteredProjects.length) {
        activeProjectIndex = idx;
        updateProjectDisplay(currentFilteredProjects[activeProjectIndex]);
        renderProjectIndicators();
      }
    });
  });

  // Initial render of indicators
  renderProjectIndicators();

  // 4. Services Slider dots
  const serviceIndicators = document.querySelectorAll('#services .indicator');
  const serviceCards = document.querySelectorAll('.service-card');
  const servicesGrid = document.getElementById('services-grid-container');

  serviceIndicators.forEach(ind => {
    ind.addEventListener('click', () => {
      const idx = parseInt(ind.getAttribute('data-index'), 10);
      
      // Update active indicator pill
      serviceIndicators.forEach(i => i.classList.remove('active'));
      ind.classList.add('active');
      
      // On small screens, we shift scroll positions. On large screens, we can visual translate or highlight
      if (window.innerWidth <= 768) {
        const cardWidth = serviceCards[0].offsetWidth + 32; // width + gap
        servicesGrid.scrollTo({
          left: idx * cardWidth,
          behavior: 'smooth'
        });
      } else {
        // Desktop visual highlight/fade effect
        serviceCards.forEach((card, cidx) => {
          if (idx === 0) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          } else {
            // Focus on index card, blur/dim others
            if (cidx === idx + 1 || cidx === idx) {
              card.style.opacity = '1';
            } else {
              card.style.opacity = '0.4';
            }
          }
        });
      }
    });
  });

  // 5. Contact & Newsletter Form validation/alerts
  const contactForm = document.getElementById('contact-form');
  const newsletterForm = document.getElementById('newsletter-form');

  function showToast(message, isSuccess = true) {
    // Create toast container if not exists
    let toast = document.getElementById('system-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'system-toast';
      // Style toast
      Object.assign(toast.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        backgroundColor: isSuccess ? '#051614' : '#bd2a2a',
        color: '#ffffff',
        border: `1px solid ${isSuccess ? '#00E5BC' : '#ff4d4d'}`,
        boxShadow: isSuccess ? '0 0 15px rgba(0, 229, 188, 0.2)' : '0 0 15px rgba(255, 77, 77, 0.2)',
        padding: '16px 28px',
        borderRadius: '30px',
        fontFamily: 'var(--font-heading)',
        fontWeight: '600',
        zIndex: '9999',
        opacity: '0',
        transform: 'translateY(20px)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      });
      document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    
    // Show toast
    setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    }, 100);
    
    // Hide toast
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
    }, 4000);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailVal = document.getElementById('email-address').value;
      const submitBtn = document.getElementById('email-submit');
      
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        showToast(`Thank you! Let's discuss your project soon.`);
        submitBtn.textContent = 'Send';
        submitBtn.disabled = false;
        contactForm.reset();
      }, 1200);
    });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('newsletter-submit');
      
      submitBtn.disabled = true;
      
      setTimeout(() => {
        showToast('Successfully subscribed to newsletters!');
        submitBtn.disabled = false;
        newsletterForm.reset();
      }, 1000);
    });
  }
});
