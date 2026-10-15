# 🌟 Sneh Gohil — Personal Portfolio (React + Vite)

Modern, responsive developer portfolio converted to **React 18** and **Vite** with **Tailwind CSS**.

---

## 🖥️ Tech Stack

- **Framework:** React 18
- **Bundler & Dev Server:** Vite
- **Styling:** Tailwind CSS + PostCSS + Vanilla CSS utilities
- **Icons:** Lucide React + Custom Tech SVG Icons
- **Typography:** Space Grotesk (Google Fonts)

---

## 📂 Project Structure

```
Portfolio/
├── public/                 # Static assets (images, icons)
│   ├── Img/
│   │   ├── MarketStore.jpg
│   │   └── Sneh.png
│   ├── sneh-gohil.jpg
│   └── diamond-website.png
├── src/
│   ├── components/         # Modular React components
│   │   ├── Navbar.jsx      # Sticky glassmorphic nav & mobile drawer
│   │   ├── Hero.jsx        # Hero section with animated morphing avatar
│   │   ├── Experience.jsx  # Career timeline
│   │   ├── Projects.jsx    # Featured projects with links and tags
│   │   ├── Skills.jsx      # Essential tools with category filtering
│   │   └── Footer.jsx      # Footer with social links & back-to-top
│   ├── data/
│   │   └── portfolioData.js # Centralized data configuration
│   ├── App.jsx             # Root React application component
│   ├── index.css           # Tailwind & custom keyframe styling
│   └── main.jsx            # React DOM entry point
├── index.html              # HTML entry point for Vite
├── package.json            # Scripts & dependencies
├── tailwind.config.js      # Tailwind configuration
└── vite.config.js          # Vite configuration
```

---

## 🚀 Getting Started

### 1. Install dependencies:
```bash
npm install
```

### 2. Start local development server:
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

### 3. Build for production:
```bash
npm run build
```

The optimized production bundle will be generated in `dist/`.

---

## 🌍 Live Demo

View the live portfolio: [https://snehgohil-portfolio.netlify.app/](https://snehgohil-portfolio.netlify.app/)
