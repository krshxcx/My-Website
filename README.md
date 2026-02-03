# My Website

A modern, responsive portfolio website showcasing my work as a Python Developer with expertise in AI/ML and backend engineering.

## 🚀 Features

- **Responsive Design**: Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations**: Elegant scroll animations and interactive elements using Intersection Observer API
- **Dynamic Typing Effect**: Auto-rotating typing animation for featured descriptions
- **Project Filtering**: Interactive filter buttons to browse projects by category (AI/ML, Web Apps, Data)
- **Skill Progress Bars**: Animated skill meters that trigger on scroll
- **Live Counters**: Animated statistics that count up when the hero section comes into view
- **Smooth Scrolling**: Enhanced navigation with smooth scroll-to-section functionality
- **Dark Theme**: Modern dark UI with gradient backgrounds and glassmorphism effects

## 🛠️ Tech Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, gradients, animations, and responsive design
- **JavaScript (ES6+)**: Vanilla JS for interactivity (no frameworks)
- **Google Fonts**: DM Serif Display & Space Grotesk

## 📁 Project Structure

```
.
├── index.html          # Main HTML file with all sections
├── style.css           # Styling with CSS variables and animations
├── script.js           # JavaScript for interactivity
├── README.md           # Project documentation
└── .github/
    └── workflows/
        └── static.yml  # GitHub Actions workflow for deployment
```

## 🎯 Sections

- **Home**: Hero section with typing effect and CTA buttons
- **About**: Background, strengths, and current focus
- **Skills**: Technical proficiencies with progress indicators
- **Projects**: Featured work with category filtering
- **Contact**: Contact information and message form

## ⚡ Key JavaScript Features

### Navigation
- Sticky navigation with scroll detection
- Mobile hamburger menu with toggle functionality
- Active link highlighting based on scroll position

### Animations
- Intersection Observer for reveal animations
- Typing animation loop with dynamic phrases
- Skill meter animations on scroll
- Counter animations for statistics

### Interactivity
- Project filtering by category
- Smooth anchor link scrolling
- Scroll-to-top button
- Form submission with status feedback

## 🚀 Deployment

This site is deployed to **GitHub Pages** via GitHub Actions. Any push to the `main` branch automatically builds and deploys the site.

### Workflow
The `.github/workflows/static.yml` file handles automatic deployment:
- Triggers on push to `main` branch
- Uploads the entire repository as a static artifact
- Deploys to GitHub Pages

## 📱 Responsive Breakpoints

- **Desktop**: Full layout with 2-column grids
- **Tablet** (≤ 980px): Single column layout, sticky nav toggle
- **Mobile** (≤ 640px): Full mobile optimization with adjusted spacing

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and roles for interactive elements
- Focus management for keyboard navigation
- `prefers-reduced-motion` support

## 🎨 Color Scheme

```css
--bg: #0b0f1c              /* Primary background */
--accent: #ffb56b          /* Orange accent */
--accent-2: #67d2ff        /* Cyan accent */
--accent-3: #c792ff        /* Purple accent */
--text: #f5f7ff            /* Primary text */
--muted: #b6bdd6           /* Secondary text */
```

## 📝 How to Use

1. Clone the repository
2. Open `index.html` in your browser
3. Customize content in the HTML
4. Modify styles in `style.css`
5. Update JavaScript interactions in `script.js`

## 🔧 Customization

- Update personal info in `index.html`
- Modify color variables in `:root` in `style.css`
- Change typing phrases in the `phrases` array in `script.js`
- Update skill levels and project details as needed

## 📧 Contact

- **Email**: [krshxcx@gmail.com](mailto:krshxcx@gmail.com)
- **LinkedIn**: [saikrishna-durgam](https://www.linkedin.com/in/saikrishna-durgam/)
- **GitHub**: [krshxcx](https://github.com/krshxcx)

## 📄 License

© 2026 Sai Krishna Durgam. All rights reserved.
