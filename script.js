const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const particles = [];
const particleCount = 80;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `rgba(${99 + Math.random() * 40}, ${102 + Math.random() * 40}, 241, ${Math.random() * 0.5 + 0.3})`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 150) {
                ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - distance / 150)})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => preloader.classList.add('hide'), 2000);
});

const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-pill');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(2)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorFollower.classList.add('active');
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.classList.remove('active');
    });
});

const themeToggle = document.getElementById('themeToggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') body.classList.add('light-theme');

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
});

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section').forEach(section => {
        const top = section.offsetTop;
        const height = section.clientHeight;
        if (scrollY >= top - 200) current = section.id;
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) link.classList.add('active');
    });
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

function updateTime() {
    const timeElement = document.getElementById('currentTime');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes} IST`;
}

updateTime();
setInterval(updateTime, 60000);
document.getElementById('currentYear').textContent = new Date().getFullYear();

const typedTextElement = document.querySelector('.typed-text');
const textArray = ['Python Developer 🐍', 'AI Enthusiast 🤖', 'Backend Developer ⚡', 'Problem Solver 💡', 'Full Stack Developer 🚀'];
let textArrayIndex = 0, charIndex = 0, isDeleting = false;

function type() {
    const currentText = textArray[textArrayIndex];
    typedTextElement.textContent = isDeleting
        ? currentText.substring(0, charIndex--)
        : currentText.substring(0, charIndex++);
    let speed = isDeleting ? 50 : 100;
    if (!isDeleting && charIndex === currentText.length) {
        speed = 2000; isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textArrayIndex = (textArrayIndex + 1) % textArray.length;
        speed = 500;
    }
    setTimeout(type, speed);
}
document.addEventListener('DOMContentLoaded', type);

const revealElements = document.querySelectorAll('.reveal, .reveal-scale');
const revealOnScroll = () => {
    revealElements.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 150) el.classList.add('active');
    });
};
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

const timelineItems = document.querySelectorAll('.timeline-item');
const animateTimeline = () => {
    timelineItems.forEach((item, i) => {
        if (item.getBoundingClientRect().top < window.innerHeight - 100) {
            setTimeout(() => item.classList.add('active'), i * 200);
        }
    });
};
window.addEventListener('scroll', animateTimeline);
animateTimeline();

const counters = document.querySelectorAll('.counter');
let countStarted = false;

const startCounter = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 100;
        const update = () => {
            const current = +counter.innerText;
            if (current < target) {
                counter.innerText = Math.ceil(current + increment);
                setTimeout(update, 20);
            } else counter.innerText = target;
        };
        update();
    });
};

window.addEventListener('scroll', () => {
    const statsSection = document.querySelector('.stats-bar');
    if (statsSection && !countStarted && statsSection.getBoundingClientRect().top < window.innerHeight - 200) {
        startCounter();
        countStarted = true;
    }
});

const skillBars = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

window.addEventListener('scroll', () => {
    const skillsSection = document.querySelector('.skills');
    if (skillsSection && !skillsAnimated && skillsSection.getBoundingClientRect().top < window.innerHeight - 200) {
        skillBars.forEach(bar => bar.style.width = bar.dataset.progress + '%');
        skillsAnimated = true;
    }
});

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('.btn-submit');
    submitBtn.classList.add('loading');
    setTimeout(() => {
        submitBtn.classList.remove('loading');
        contactForm.style.display = 'none';
        formSuccess.classList.add('show');
        createConfetti();
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'block';
            formSuccess.classList.remove('show');
        }, 5000);
    }, 2000);
});

function createConfetti() {
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position:fixed;width:10px;height:10px;border-radius:50%;
            background-color:${colors[Math.floor(Math.random() * colors.length)]};
            left:${Math.random() * 100}%;top:-10px;opacity:1;z-index:10000;
            transform:rotate(${Math.random() * 360}deg);
            transition:all 3s ease-out;
        `;
        document.body.appendChild(confetti);
        setTimeout(() => {
            confetti.style.top = '100vh';
            confetti.style.opacity = '0';
            confetti.style.transform = `rotate(${Math.random() * 720}deg)`;
        }, 10);
        setTimeout(() => confetti.remove(), 3000);
    }
}

const backToTopButton = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    backToTopButton.classList.toggle('show', window.scrollY > 500);
});
backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.hero-particles, .glow-effect').forEach(el => {
        el.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
});

document.querySelectorAll('.ripple-effect').forEach(button => {
    button.addEventListener('click', e => {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.classList.add('ripple');
        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});
