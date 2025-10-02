# NexaCRM Landing Page

A modern, responsive SaaS landing page built with React, Vite, and Tailwind CSS.

## Features

- ✨ Clean, minimalist design inspired by Stripe/Notion/Linear
- 📱 Fully responsive layout
- ⚡ Built with Vite for fast development
- 🎨 Styled with Tailwind CSS
- 🧩 Modular component structure

## Sections Included

1. **Navbar** - Fixed navigation with logo, menu items, and CTA button
2. **Hero Section** - Eye-catching headline with CTAs and dashboard preview
3. **Features** - 6-card grid showcasing key features with icons
4. **Demo Video** - Video placeholder section with play button
5. **Pricing** - 3-tier pricing cards (Starter, Growth, Enterprise)
6. **Resources** - Quick links to Blog, Help Center, and Product Updates
7. **About Us** - Mission statement and team section
8. **Contact** - Contact form with validation
9. **Footer** - Final CTA, social links, and sitemap

## Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
NEXA/
├── src/
│   ├── App.jsx          # Main app component with all sections
│   ├── main.jsx         # React entry point
│   └── index.css        # Tailwind directives
├── index.html           # HTML template
├── tailwind.config.js   # Tailwind configuration
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies and scripts
```

## Customization

### Colors
Edit the color scheme in `tailwind.config.js` to match your brand.

### Content
All content is easily editable within the component functions in `src/App.jsx`.

### Fonts
The project uses Inter font from Google Fonts. Change it in `index.html` if needed.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **PostCSS** - CSS processing

## License

MIT License - feel free to use this for your projects!