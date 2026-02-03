const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navBar = document.getElementById('navbar');
const scrollTopButton = document.getElementById('scrollTop');
const typingText = document.getElementById('typingText');
const formStatus = document.getElementById('formStatus');

const setYear = () => {
  const year = new Date().getFullYear();
  const yearElement = document.getElementById('currentYear');
  if (yearElement) yearElement.textContent = year;
};

const toggleMenu = () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('active', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
};

if (navToggle) {
  navToggle.addEventListener('click', toggleMenu);
}

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('scroll', () => {
  navBar.classList.toggle('scrolled', window.scrollY > 20);
  scrollTopButton.classList.toggle('visible', window.scrollY > 500);
});

scrollTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const phrases = [
  'Building reliable backend systems',
  'Designing ML-powered products',
  'Turning data into clarity',
  'Crafting APIs that scale'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeLoop = () => {
  if (!typingText) return;
  const current = phrases[phraseIndex];
  typingText.textContent = isDeleting
    ? current.substring(0, charIndex--)
    : current.substring(0, charIndex++);

  let speed = isDeleting ? 45 : 90;
  if (!isDeleting && charIndex === current.length) {
    speed = 1600;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 400;
  }
  setTimeout(typeLoop, speed);
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const counters = document.querySelectorAll('.counter');
let countersStarted = false;

const startCounters = () => {
  counters.forEach((counter) => {
    const target = Number(counter.dataset.target || 0);
    const increment = Math.max(1, Math.ceil(target / 60));
    const update = () => {
      const current = Number(counter.textContent);
      if (current < target) {
        counter.textContent = Math.min(target, current + increment);
        requestAnimationFrame(update);
      }
    };
    update();
  });
};

const meters = document.querySelectorAll('.meter-bar span');

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      meters.forEach((meter) => {
        meter.style.width = `${meter.dataset.progress || 0}%`;
      });
      skillsObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillsObserver.observe(skillsSection);

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      startCounters();
    }
  });
}, { threshold: 0.4 });

const heroSection = document.getElementById('home');
if (heroSection) statsObserver.observe(heroSection);

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    projectCards.forEach((card) => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.display = match ? 'block' : 'none';
    });
  });
});

const updateActiveLink = () => {
  const sections = document.querySelectorAll('section, header');
  let currentId = '';
  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      currentId = section.id;
    }
  });

  document.querySelectorAll('.nav-link').forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
  });
};

window.addEventListener('scroll', updateActiveLink);

const contactForm = document.getElementById('contactForm');

const handleFormSubmit = async (event) => {
  event.preventDefault();
  if (!formStatus) return;

  const form = event.target;
  const submitButton = form.querySelector('button[type="submit"]');
  const payload = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    message: form.message.value.trim(),
    company: form.company.value.trim()
  };

  formStatus.textContent = 'Sending your message...';
  submitButton.disabled = true;

  try {
    const response = await fetch('/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok || !result.ok) {
      throw new Error(result.error || 'Unable to send message right now.');
    }

    formStatus.textContent = 'Thanks! Your message has been sent.';
    form.reset();
  } catch (error) {
    formStatus.textContent = error.message || 'Something went wrong. Please try again.';
  } finally {
    setTimeout(() => {
      formStatus.textContent = '';
    }, 4000);
    submitButton.disabled = false;
  }
};

if (contactForm) contactForm.addEventListener('submit', handleFormSubmit);

setYear();
typeLoop();
updateActiveLink();
