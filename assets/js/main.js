// ===== Year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Theme toggle =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');
const root = document.documentElement;

const stored = localStorage.getItem('theme');
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
const initial = stored || (prefersLight ? 'light' : 'dark');
applyTheme(initial);

themeToggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem('theme', next);
});

function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    themeIcon.className = theme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

// ===== Mobile nav =====
const burger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => navLinks.classList.toggle('is-open'));
navLinks.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => navLinks.classList.remove('is-open'))
);

// ===== Active section tracking =====
const sections = document.querySelectorAll('section[id]');
const linkMap = new Map();
navLinks.querySelectorAll('a').forEach(a => {
    const id = a.getAttribute('href').slice(1);
    if (id) linkMap.set(id, a);
});

const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const link = linkMap.get(entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
            linkMap.forEach(l => l.classList.remove('is-active'));
            link.classList.add('is-active');
        }
    });
}, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

sections.forEach(s => activeObserver.observe(s));

// ===== Reveal on scroll =====
const revealTargets = document.querySelectorAll(
    '.section__head, .skill-card, .timeline__item, .research-card, .edu-card, .training-item, .contact-card, .stat, .about__lead'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealTargets.forEach(el => revealObserver.observe(el));
