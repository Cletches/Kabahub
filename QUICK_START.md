# 🚀 Quick Start Guide - KabaHub Landing Page

## ✅ What's Already Working

- ✅ Landing page with all sections
- ✅ Waitlist modal with beautiful design
- ✅ Email notifications (if EmailJS configured)
- ✅ Demo video player with optimized MP4
- ✅ Responsive design for all devices
- ✅ Smooth animations and transitions

## 🔧 What Needs Setup (5 minutes)

### Google Sheets Integration

Your waitlist will save to Google Sheets for easy contact management.

**Follow: [GOOGLE_SHEETS_SETUP.md](GOOGLE_SHEETS_SETUP.md)**

**Super Quick Steps:**
1. Create Google Sheet → Add headers (Timestamp, Name, Email, Company, Source)
2. Extensions → Apps Script → Paste the code from setup guide
3. Deploy → Web App → Copy URL
4. Edit `src/googleSheetsConfig.js` → Paste URL → Set `ENABLED: true`
5. Done! Test at http://localhost:5173

## 📁 All Documentation Files

| File | Purpose | When to Use |
|------|---------|-------------|
| **[GOOGLE_SHEETS_SETUP.md](GOOGLE_SHEETS_SETUP.md)** | Complete setup guide | Setting up waitlist database |
| **[WAITLIST_INTEGRATION_SUMMARY.md](WAITLIST_INTEGRATION_SUMMARY.md)** | Overview & workflow | Understanding how it works |
| **[GOOGLE_SHEET_TEMPLATE.md](GOOGLE_SHEET_TEMPLATE.md)** | Sheet tips & formulas | Organizing your data |
| **[EMAIL_SETUP_GUIDE.md](EMAIL_SETUP_GUIDE.md)** | EmailJS setup | Contact form emails |
| **[README.md](README.md)** | Project overview | General information |

## 🎯 Development Workflow

### Running Locally
```bash
npm run dev
```
Visit: http://localhost:5173

### Building for Production
```bash
npm run build
```
Output: `dist/` folder

### Preview Production Build
```bash
npm run preview
```

## 📊 Managing Your Waitlist

### Where to Find Contacts
1. **Google Sheet** - All contacts in one spreadsheet
2. **Email** - Get notified via kabahubteam@gmail.com

### Exporting Contacts
From Google Sheets:
- Excel: File → Download → Microsoft Excel (.xlsx)
- CSV: File → Download → Comma-separated values (.csv)

### Analytics
Your Google Sheet automatically tracks:
- Timestamp of each signup
- Name, Email, Company
- Source (all "Website" for now)

Add formulas for:
- Total signups: `=COUNTA(B:B)-1`
- Today's signups: `=COUNTIF(A:A,">="&TODAY())`
- This week: `=COUNTIF(A:A,">="&TODAY()-7)`

## 🎨 Customization Quick Tips

### Change Colors
Edit `tailwind.config.js`:
```javascript
primary: { 600: '#YOUR_COLOR' }
accent: { 600: '#YOUR_COLOR' }
```

### Update Content
All text is in `src/App.jsx`:
- Hero section: Line ~270
- Features: Line ~335
- Pricing: Line ~450
- Contact: Line ~665

### Replace Demo Video
1. Add your video to `/media/`
2. Update video source in `src/App.jsx` line ~269

## 🐛 Troubleshooting

### Waitlist not saving to Google Sheets?
- [ ] Deployed Apps Script as Web App?
- [ ] Copied correct URL (ends with /exec)?
- [ ] Updated `src/googleSheetsConfig.js`?
- [ ] Set `ENABLED: true`?
- [ ] Refreshed the website?

### Video not playing?
- Check file is in `/media/demo-video.mp4`
- Verify path in `src/App.jsx` is `/media/demo-video.mp4`
- Try different browser

### Styling looks broken?
```bash
npm run dev
```
Make sure Tailwind is compiling

## 📱 Testing Checklist

Before going live:
- [ ] Test waitlist form on desktop
- [ ] Test waitlist form on mobile
- [ ] Verify data appears in Google Sheet
- [ ] Check email notifications work
- [ ] Test on different browsers (Chrome, Safari, Firefox)
- [ ] Verify all links work
- [ ] Check video plays on mobile
- [ ] Test form validation

## 🚀 Deployment Options

### Vercel (Recommended - Free)
1. Push code to GitHub
2. Import to Vercel
3. Deploy automatically

### Netlify (Free)
1. Push code to GitHub
2. Import to Netlify
3. Deploy automatically

### Custom Server
1. Run `npm run build`
2. Upload `dist/` folder to server
3. Point domain to folder

## 📧 Support

Questions? Issues?
1. Check the documentation files above
2. Review troubleshooting section
3. Check browser console for errors (F12)

## 🎉 You're Ready!

Your landing page is set up and ready to collect signups. Just configure Google Sheets (5 min) and you're live!

**Start here:** [GOOGLE_SHEETS_SETUP.md](GOOGLE_SHEETS_SETUP.md)

---

**Pro Tip**: Set up Google Sheets first thing so you don't lose any early signups! 🎯
