/* ============================================
   ParaWinter 2026 — Milano Cortina Paralympic Games Hub
   JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ---- Snowfall Canvas Animation ----
    initSnowfall();

    // ---- Navbar scroll effect ----
    initNavbar();

    // ---- Mobile menu ----
    initMobileMenu();

    // ---- Countdown Timer ----
    initCountdown();

    // ---- Scroll Animations ----
    initScrollAnimations();

    // ---- Back to Top ----
    initBackToTop();

    // ---- Active Nav Link ----
    setActiveNavLink();
});

/* ============================================
   SNOWFALL ANIMATION
   ============================================ */
function initSnowfall() {
    const canvas = document.getElementById('snowCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let snowflakes = [];
    const maxSnowflakes = 80;

    function resizeCanvas() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Snowflake {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * -canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speed = Math.random() * 1 + 0.3;
            this.wind = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.6 + 0.2;
        }

        update() {
            this.y += this.speed;
            this.x += this.wind + Math.sin(this.y * 0.01) * 0.3;

            if (this.y > canvas.height || this.x > canvas.width + 10 || this.x < -10) {
                this.reset();
                this.y = -5;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(240, 244, 248, ${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < maxSnowflakes; i++) {
        snowflakes.push(new Snowflake());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snowflakes.forEach(flake => {
            flake.update();
            flake.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
}

/* ============================================
   NAVBAR
   ============================================ */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ============================================
   MOBILE MENU
   ============================================ */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const overlay = document.querySelector('.nav-overlay');

    if (!hamburger || !navLinks) return;

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        if (overlay) overlay.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

/* ============================================
   COUNTDOWN TIMER
   ============================================ */
function initCountdown() {
    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minsEl = document.getElementById('countdown-mins');
    const secsEl = document.getElementById('countdown-secs');

    if (!daysEl) return;

    // Opening Ceremony: March 6, 2026 at 20:00 CET (UTC+1)
    const targetDate = new Date('2026-03-06T20:00:00+01:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff <= 0) {
            daysEl.textContent = '0';
            hoursEl.textContent = '0';
            minsEl.textContent = '0';
            secsEl.textContent = '0';

            const label = document.querySelector('.countdown-label');
            if (label) label.textContent = '🎉 The Games Have Begun!';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        daysEl.textContent = days;
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minsEl.textContent = mins.toString().padStart(2, '0');
        secsEl.textContent = secs.toString().padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

/* ============================================
   SCROLL ANIMATIONS (Intersection Observer)
   ============================================ */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

/* ============================================
   BACK TO TOP
   ============================================ */
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ============================================
   ACTIVE NAV LINK
   ============================================ */
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}
