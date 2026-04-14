// ===================================
// Utility Functions
// ===================================

const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// ===================================
// Navigation
// ===================================

class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        // Scroll event for navbar
        window.addEventListener('scroll', throttle(() => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        }, 100));
        
        // Mobile menu toggle
        this.navToggle.addEventListener('click', () => {
            this.toggleMenu();
        });
        
        // Close menu when clicking on a link
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    this.closeMenu();
                    this.scrollToSection(targetSection);
                    this.setActiveLink(link);
                }
            });
        });
        
        // Set active link on scroll
        window.addEventListener('scroll', throttle(() => {
            this.updateActiveLink();
        }, 100));
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navMenu.contains(e.target) && !this.navToggle.contains(e.target)) {
                this.closeMenu();
            }
        });
    }
    
    toggleMenu() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
    }
    
    closeMenu() {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
    }
    
    scrollToSection(section) {
        const navHeight = this.navbar.offsetHeight;
        const targetPosition = section.offsetTop - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
    
    setActiveLink(activeLink) {
        this.navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }
    
    updateActiveLink() {
        const sections = document.querySelectorAll('.section, .hero');
        const navHeight = this.navbar.offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const scrollPosition = window.scrollY;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const targetId = section.getAttribute('id');
                const correspondingLink = document.querySelector(`.nav-link[href="#${targetId}"]`);
                
                if (correspondingLink) {
                    this.setActiveLink(correspondingLink);
                }
            }
        });
    }
}

// ===================================
// Scroll Animations
// ===================================

class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Trigger specific animations
                    if (entry.target.classList.contains('stat-number')) {
                        this.animateCounter(entry.target);
                    }
                    
                    if (entry.target.classList.contains('skill-progress')) {
                        this.animateSkillBar(entry.target);
                    }
                }
            });
        }, this.observerOptions);
        
        // Observe elements
        const animatedElements = document.querySelectorAll('.section-header, .about-text, .about-stats, .timeline-item, .skill-category, .project-card, .contact-card');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
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
        
        // Observe stat numbers
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => observer.observe(stat));
        
        // Observe skill bars
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => observer.observe(bar));
    }
    
    animateCounter(element) {
        if (element.dataset.animated) return;
        element.dataset.animated = 'true';
        
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    }
    
    animateSkillBar(element) {
        if (element.dataset.animated) return;
        element.dataset.animated = 'true';
        
        const progress = element.dataset.progress;
        setTimeout(() => {
            element.style.width = progress + '%';
        }, 100);
    }
}

// ===================================
// Contact Form
// ===================================

class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.successMessage = document.getElementById('formSuccess');
        
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }
    
    async handleSubmit() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!this.validateForm(data)) {
            return;
        }
        
        // Show loading state
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<span>Enviando...</span><i class="fas fa-spinner fa-spin"></i>';
        submitButton.disabled = true;
        
        // Simulate API call (replace with actual API endpoint)
        try {
            await this.simulateAPICall(data);
            
            // Show success message
            this.showSuccess();
            
            // Reset form
            this.form.reset();
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Erro ao enviar mensagem. Por favor, tente novamente.');
        } finally {
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    }
    
    validateForm(data) {
        const { name, email, subject, message } = data;
        
        if (!name || !email || !subject || !message) {
            alert('Por favor, preencha todos os campos.');
            return false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um email válido.');
            return false;
        }
        
        return true;
    }
    
    simulateAPICall(data) {
        return new Promise((resolve) => {
            console.log('Form data:', data);
            setTimeout(resolve, 1500);
        });
    }
    
    showSuccess() {
        this.successMessage.classList.add('show');
        
        setTimeout(() => {
            this.successMessage.classList.remove('show');
        }, 5000);
    }
}

// ===================================
// Scroll to Top Button
// ===================================

class ScrollToTop {
    constructor() {
        this.button = document.getElementById('scrollTop');
        this.init();
    }
    
    init() {
        if (!this.button) return;
        
        // Show/hide button on scroll
        window.addEventListener('scroll', throttle(() => {
            if (window.scrollY > 500) {
                this.button.classList.add('show');
            } else {
                this.button.classList.remove('show');
            }
        }, 100));
        
        // Scroll to top on click
        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===================================
// Typing Effect
// ===================================

class TypingEffect {
    constructor(element, texts, speed = 100) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        
        if (this.element) {
            this.type();
        }
    }
    
    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }
        
        let typeSpeed = this.speed;
        
        if (this.isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = 2000;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// ===================================
// Parallax Effect
// ===================================

class ParallaxEffect {
    constructor() {
        this.init();
    }
    
    init() {
        const heroBackground = document.querySelector('.hero-background');
        
        if (!heroBackground) return;
        
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.scrollY;
            const parallaxSpeed = 0.5;
            
            heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }, 16));
    }
}

// ===================================
// Cursor Effect (Optional)
// ===================================

class CursorEffect {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursorFollower = document.createElement('div');
        this.init();
    }
    
    init() {
        // Only enable on desktop
        if (window.innerWidth < 768) return;
        
        this.cursor.className = 'custom-cursor';
        this.cursorFollower.className = 'custom-cursor-follower';
        
        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorFollower);
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .custom-cursor,
            .custom-cursor-follower {
                position: fixed;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                mix-blend-mode: difference;
            }
            
            .custom-cursor {
                width: 10px;
                height: 10px;
                background: white;
                transition: transform 0.1s ease;
            }
            
            .custom-cursor-follower {
                width: 40px;
                height: 40px;
                border: 2px solid white;
                transition: transform 0.3s ease;
            }
            
            .custom-cursor.active {
                transform: scale(0.5);
            }
            
            .custom-cursor-follower.active {
                transform: scale(1.5);
            }
        `;
        document.head.appendChild(style);
        
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                this.cursorFollower.style.left = e.clientX + 'px';
                this.cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });
        
        // Add active state on clickable elements
        const clickableElements = document.querySelectorAll('a, button, input, textarea');
        clickableElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('active');
                this.cursorFollower.classList.add('active');
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('active');
                this.cursorFollower.classList.remove('active');
            });
        });
    }
}

// ===================================
// Project Filter (Optional Enhancement)
// ===================================

class ProjectFilter {
    constructor() {
        this.projects = document.querySelectorAll('.project-card');
        this.init();
    }
    
    init() {
        // Add filter buttons if needed
        const projectsSection = document.querySelector('.projects');
        if (!projectsSection) return;
        
        // Get unique categories
        const categories = new Set();
        this.projects.forEach(project => {
            const category = project.querySelector('.project-category').textContent;
            categories.add(category);
        });
        
        // Create filter buttons
        if (categories.size > 1) {
            this.createFilterButtons(Array.from(categories), projectsSection);
        }
    }
    
    createFilterButtons(categories, container) {
        const filterContainer = document.createElement('div');
        filterContainer.className = 'project-filters';
        filterContainer.style.cssText = `
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        `;
        
        // Add "All" button
        const allButton = this.createFilterButton('Todos', 'all', true);
        filterContainer.appendChild(allButton);
        
        // Add category buttons
        categories.forEach(category => {
            const button = this.createFilterButton(category, category, false);
            filterContainer.appendChild(button);
        });
        
        // Insert before projects grid
        const projectsGrid = container.querySelector('.projects-grid');
        projectsGrid.parentNode.insertBefore(filterContainer, projectsGrid);
    }
    
    createFilterButton(text, filter, active) {
        const button = document.createElement('button');
        button.textContent = text;
        button.dataset.filter = filter;
        button.className = 'filter-btn' + (active ? ' active' : '');
        button.style.cssText = `
            padding: 0.5rem 1.5rem;
            border: 2px solid var(--primary-color);
            background: ${active ? 'var(--primary-color)' : 'transparent'};
            color: ${active ? 'white' : 'var(--primary-color)'};
            border-radius: 2rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        `;
        
        button.addEventListener('click', () => {
            this.filterProjects(filter);
            this.setActiveButton(button);
        });
        
        return button;
    }
    
    filterProjects(filter) {
        this.projects.forEach(project => {
            const category = project.querySelector('.project-category').textContent;
            
            if (filter === 'all' || category === filter) {
                project.style.display = 'block';
                setTimeout(() => {
                    project.style.opacity = '1';
                    project.style.transform = 'scale(1)';
                }, 10);
            } else {
                project.style.opacity = '0';
                project.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    project.style.display = 'none';
                }, 300);
            }
        });
    }
    
    setActiveButton(activeButton) {
        const buttons = document.querySelectorAll('.filter-btn');
        buttons.forEach(btn => {
            btn.classList.remove('active');
            btn.style.background = 'transparent';
            btn.style.color = 'var(--primary-color)';
        });
        
        activeButton.classList.add('active');
        activeButton.style.background = 'var(--primary-color)';
        activeButton.style.color = 'white';
    }
}

// ===================================
// Loading Animation
// ===================================

class LoadingAnimation {
    constructor() {
        this.init();
    }
    
    init() {
        // Create loading overlay
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner"></div>
                <p>Carregando...</p>
            </div>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .page-loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: var(--bg-dark);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                transition: opacity 0.5s ease;
            }
            
            .page-loader.fade-out {
                opacity: 0;
                pointer-events: none;
            }
            
            .loader-content {
                text-align: center;
                color: white;
            }
            
            .loader-spinner {
                width: 50px;
                height: 50px;
                border: 4px solid rgba(255, 255, 255, 0.1);
                border-top-color: var(--primary-color);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 1rem;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(loader);
        
        // Remove loader when page is loaded
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('fade-out');
                setTimeout(() => {
                    loader.remove();
                }, 500);
            }, 500);
        });
    }
}

// ===================================
// Initialize Everything
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    new Navigation();
    new ScrollAnimations();
    new ContactForm();
    new ScrollToTop();
    new ParallaxEffect();
    new LoadingAnimation();
    
    // Optional enhancements
    new ProjectFilter();
    
    // Uncomment for custom cursor (desktop only)
    // new CursorEffect();
    
    // Optional typing effect for hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        
        // Simple fade-in instead of typing for better UX
        setTimeout(() => {
            heroSubtitle.textContent = originalText;
        }, 1000);
    }
    
    // Add smooth reveal for hero content
    const heroElements = document.querySelectorAll('.hero-greeting, .hero-title, .hero-subtitle, .hero-description, .hero-buttons, .hero-social');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});

// ===================================
// Performance Optimization
// ===================================

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Preload critical resources
const preloadResources = () => {
    const criticalResources = [
        // Add paths to critical resources here
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.css') ? 'style' : 'script';
        document.head.appendChild(link);
    });
};

// Call on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadResources);
} else {
    preloadResources();
}

// Made with Bob
