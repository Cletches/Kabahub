# KabaHub Landing Page

A modern, responsive SaaS landing page built with React, Vite, and Tailwind CSS, featuring an integrated waitlist system with Google Sheets database.

## 🌐 Live Demo

**Live Site**: https://cletches.github.io/KabaHub/

**Repository**: https://github.com/Cletches/KabaHub

## Features

- ✨ Clean, minimalist design inspired by Stripe/Notion/Linear
- 📱 Fully responsive layout
- ⚡ Built with Vite for fast development
- 🎨 Styled with Tailwind CSS
- 🧩 Modular component structure
- 📋 **Integrated Waitlist System** with Google Sheets
- 📧 Email notifications via EmailJS
- 🎬 Demo video player with web-optimized MP4

## Sections Included

1. **Navbar** - Fixed navigation with logo, menu items, and waitlist CTA
2. **Hero Section** - Eye-catching headline with CTAs and animated background
3. **Features** - 14-module grid showcasing all CRM features with icons
4. **Demo Video** - Embedded MP4 video player with custom play button overlay
5. **Pricing** - 3-tier pricing cards with waitlist integration
6. **About Us** - Mission statement and company vision
7. **Contact** - Contact form with EmailJS integration
8. **Footer** - Final waitlist CTA, social links, and sitemap
9. **Waitlist Modal** - Beautiful glassmorphism modal with Google Sheets integration

## Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager
- Google Account (for waitlist integration)
- EmailJS Account (for contact form)

### Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

### Waitlist Setup (Required for Production)

The waitlist system saves contacts to Google Sheets. Follow these guides:

1. **[GOOGLE_SHEETS_SETUP.md](GOOGLE_SHEETS_SETUP.md)** - Step-by-step setup (5 minutes)
2. **[WAITLIST_INTEGRATION_SUMMARY.md](WAITLIST_INTEGRATION_SUMMARY.md)** - Overview and workflow
3. **[GOOGLE_SHEET_TEMPLATE.md](GOOGLE_SHEET_TEMPLATE.md)** - Sheet formatting tips

Quick setup:
- Create a Google Sheet with headers: Timestamp, Name, Email, Company, Source
- Deploy the provided Apps Script as a Web App
- Update `src/googleSheetsConfig.js` with your Web App URL
- Enable the integration by setting `ENABLED: true`

### Email Setup (Optional)

For contact form emails, follow **[EMAIL_SETUP_GUIDE.md](EMAIL_SETUP_GUIDE.md)**

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🚀 Deployment

### Deploy to GitHub Pages

Your site is configured for automatic deployment to GitHub Pages. See:

- **[DEPLOY_NOW.md](DEPLOY_NOW.md)** - Quick 3-command deployment
- **[GITHUB_PAGES_DEPLOYMENT.md](GITHUB_PAGES_DEPLOYMENT.md)** - Complete deployment guide

**Quick deploy**:
```bash
git add .
git commit -m "Your message"
git push origin main
```

Site automatically deploys to: https://cletches.github.io/KabaHub/

### Other Deployment Options

- **Vercel**: Import from GitHub for automatic deployments
- **Netlify**: Connect repository for continuous deployment
- **Custom Server**: Upload `dist/` folder after running `npm run build`

## Project Structure

```
NEXA/
├── src/
│   ├── App.jsx                  # Main app with all sections & waitlist modal
│   ├── main.jsx                 # React entry point
│   ├── index.css                # Tailwind directives
│   ├── emailConfig.js           # EmailJS configuration
│   └── googleSheetsConfig.js    # Google Sheets API configuration
├── media/
│   └── demo-video.mp4           # Optimized demo video
├── index.html                   # HTML template
├── tailwind.config.js           # Tailwind configuration
├── vite.config.js               # Vite configuration
├── package.json                 # Dependencies and scripts
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions deployment workflow
├── EMAIL_SETUP_GUIDE.md         # EmailJS setup instructions
├── GOOGLE_SHEETS_SETUP.md       # Google Sheets setup guide
├── GOOGLE_SHEET_TEMPLATE.md     # Sheet formatting tips
├── WAITLIST_INTEGRATION_SUMMARY.md  # Waitlist overview
├── DEPLOY_NOW.md                # Quick deployment commands
├── GITHUB_PAGES_DEPLOYMENT.md   # Complete deployment guide
└── QUICK_START.md               # Quick reference guide
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
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first styling
- **PostCSS** - CSS processing
- **EmailJS** - Email notifications
- **Google Sheets API** - Waitlist database
- **FFmpeg** - Video optimization

## Waitlist Features

### Data Collection
- Name (required)
- Email (required)
- Company (optional)
- Automatic timestamp
- Source tracking

### Integration
- **Google Sheets**: Real-time database with export options (Excel/CSV)
- **EmailJS**: Instant email notifications to your team
- **Dual System**: Redundancy if one service fails

### User Experience
- Beautiful glassmorphism modal design
- Smooth animations and transitions
- Form validation
- Success/error feedback
- Auto-close on success
- Mobile-responsive

## Video Optimization

The demo video is automatically optimized for web:
- Original: 221MB .mov file
- Optimized: 27MB .mp4 file (92% reduction)
- H.264 codec for universal compatibility
- Maintains visual quality

## License

MIT License - feel free to use this for your projects!