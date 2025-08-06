
// Import card images so Vite can process them
import card1 from './assets/bombalicious-card1.jpg';
import card2 from './assets/bombalicious-card2.jpg';
import card3 from './assets/bombalicious-card3.jpg';
import card4 from './assets/bombalicious-card4.jpg';
import card5 from './assets/bombalicious-card5.jpg';
import card6 from './assets/bombalicious-card6.jpg';

// Loading Animation
window.addEventListener('load', function() {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (loadingSpinner) {
        setTimeout(() => {
            loadingSpinner.classList.add('hidden');
            setTimeout(() => {
                loadingSpinner.style.display = 'none';
            }, 500);
        }, 1000);
    }
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // Add fade-in animation for elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.product-card, .testimonial, .about-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // WhatsApp Widget functionality
    const whatsappToggle = document.getElementById('whatsapp-toggle');
    const whatsappPopup = document.getElementById('whatsapp-popup');
    const whatsappClose = document.getElementById('whatsapp-close');

    whatsappToggle.addEventListener('click', function() {
        whatsappPopup.classList.toggle('active');
    });

    whatsappClose.addEventListener('click', function(e) {
        e.stopPropagation();
        whatsappPopup.classList.remove('active');
    });

    // Close popup when clicking outside
    document.addEventListener('click', function(e) {
        if (!whatsappToggle.contains(e.target) && !whatsappPopup.contains(e.target)) {
            whatsappPopup.classList.remove('active');
        }
    });

    // Add click tracking for WhatsApp buttons (for analytics)
    document.querySelectorAll('a[href*="wa.me"]').forEach(button => {
        button.addEventListener('click', function() {
            // Track WhatsApp button clicks
            console.log('WhatsApp order button clicked');
            // Add analytics tracking code here if needed
        });
    });

    // Keyboard navigation improvements
    document.addEventListener('keydown', function(e) {
        // Close popup on Escape key
        if (e.key === 'Escape') {
            const popup = document.getElementById('whatsapp-popup');
            if (popup.classList.contains('active')) {
                popup.classList.remove('active');
            }
            
            // Close mobile menu on Escape
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });

    // Improve focus management for accessibility
    let isUsingMouse = false;
    
    // Track mouse usage
    document.addEventListener('mousedown', function() {
        isUsingMouse = true;
    });
    
    // Track keyboard usage
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            isUsingMouse = false;
        }
    });
    
    // Apply focus styles only when using keyboard
    document.querySelectorAll('button, a, input').forEach(element => {
        element.addEventListener('focus', function() {
            if (!isUsingMouse) {
                this.style.outline = '2px solid #FF6B9D';
                this.style.outlineOffset = '2px';
            } else {
                this.style.outline = 'none';
            }
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    // Lazy loading for better performance
    if ('IntersectionObserver' in window) {
        // Lazy load regular images
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });

        // Map of card images
        const cardImages = {
            'card1': card1,
            'card2': card2,
            'card3': card3,
            'card4': card4,
            'card5': card5,
            'card6': card6
        };

        // Lazy load background images for product cards
        const bgImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const cardKey = element.dataset.cardKey;
                    if (cardKey && cardImages[cardKey]) {
                        element.style.backgroundImage = `url('${cardImages[cardKey]}')`;
                        element.classList.add('loaded');
                        bgImageObserver.unobserve(element);
                    }
                }
            });
        }, {
            rootMargin: '50px'
        });

        // Observe product images for lazy loading
        document.querySelectorAll('.product-image[data-card-key]').forEach(element => {
            bgImageObserver.observe(element);
        });
    }
});

// Initialize page
document.body.style.opacity = '1';
