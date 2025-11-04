# 🚀 GitHub Pages Deployment Guide

## ✅ Pre-Deployment Checklist

All setup is complete! Your project is ready to deploy:
- ✅ GitHub Actions workflow created (`.github/workflows/deploy.yml`)
- ✅ Vite base path configured (`/KabaHub/`)
- ✅ package.json fixed and valid
- ✅ Build command working (`npm run build`)
- ✅ Google Sheets integration configured
- ✅ Video paths updated for base path

## 📋 Deployment Steps

### Step 1: Push to GitHub

If you haven't already pushed your code to GitHub:

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - KabaHub landing page"

# Add your GitHub repository as remote
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/KabaHub.git

# Push to main branch
git push -u origin main
```

**IMPORTANT**: Your GitHub repository MUST be named **exactly** `KabaHub` (case-sensitive) because that's what's configured in `vite.config.js`.

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/YOUR_USERNAME/KabaHub`

2. Click **Settings** (top navigation)

3. Scroll down and click **Pages** (left sidebar)

4. Under **Source**, select:
   - Source: `GitHub Actions`
   - (Don't select "Deploy from a branch" - we're using Actions)

5. Click **Save**

### Step 3: Trigger Deployment

The deployment will trigger automatically when you push to the `main` branch.

To manually trigger deployment:
1. Go to **Actions** tab in your repository
2. Click on **Deploy to GitHub Pages** workflow
3. Click **Run workflow** dropdown
4. Click green **Run workflow** button

### Step 4: Wait for Deployment

1. Go to **Actions** tab
2. Watch the deployment progress (takes 2-3 minutes)
3. Green checkmark = successful deployment ✅
4. Red X = failed deployment ❌ (check logs)

### Step 5: Access Your Site

Once deployed, your site will be available at:

```
https://YOUR_USERNAME.github.io/KabaHub/
```

Replace `YOUR_USERNAME` with your GitHub username.

## 🔧 Troubleshooting

### Build Fails in GitHub Actions

**Error**: `npm ci` fails
- **Fix**: Make sure package.json is valid (we just fixed this!)
- Run locally: `npm ci` to test

**Error**: `npm run build` fails
- **Fix**: Run locally first: `npm run build`
- Check for any TypeScript or ESLint errors

### Site Loads but Styles are Broken

**Cause**: Base path mismatch
- **Fix**: Repository name must match `vite.config.js` base path
- Current base path: `/KabaHub/`
- Repository must be named: `KabaHub`

### Video Not Playing on GitHub Pages

**Cause**: Path issues
- **Current path**: `/KabaHub/media/demo-video.mp4` ✅
- Make sure `media` folder is in repository root
- Check video file is committed to git

### 404 Error on GitHub Pages

**Causes**:
1. GitHub Pages not enabled in settings
2. Wrong source selected (should be "GitHub Actions")
3. Deployment didn't complete successfully
4. Base path mismatch

**Fix**:
1. Go to Settings → Pages
2. Verify "GitHub Actions" is selected as source
3. Check Actions tab for deployment status
4. Verify repository name matches base path

### Waitlist Form Not Working

**Google Sheets**:
- Check `src/googleSheetsConfig.js` has correct URL
- Verify `ENABLED: true`
- Test locally first: `npm run dev`

**EmailJS**:
- Verify credentials in `src/emailConfig.js`
- Check EmailJS dashboard for quota limits

## 🔄 Making Updates

After deployment, any push to `main` branch will automatically:
1. Trigger GitHub Actions workflow
2. Build the project
3. Deploy to GitHub Pages
4. Update your live site (takes 2-3 minutes)

```bash
# Make your changes
# Then commit and push
git add .
git commit -m "Update feature X"
git push
```

## 📊 Monitoring

### View Deployment History
- Go to **Actions** tab
- See all past deployments
- Click any workflow run to see logs

### Check Live Site Status
- **Environments** tab shows deployment status
- Shows current live URL
- View deployment history

## 🎯 Next Steps After Deployment

1. **Test Everything**:
   - [ ] Visit your live site
   - [ ] Test waitlist form
   - [ ] Verify data saves to Google Sheets
   - [ ] Test on mobile devices
   - [ ] Check video plays correctly
   - [ ] Test all navigation links

2. **Share Your Site**:
   - Share the URL: `https://YOUR_USERNAME.github.io/KabaHub/`
   - Add to your README
   - Share on social media

3. **Optional Enhancements**:
   - Add custom domain (see GitHub Pages docs)
   - Set up Google Analytics
   - Add meta tags for SEO
   - Configure social media preview cards

## 🌐 Custom Domain (Optional)

To use your own domain (e.g., `www.kabahub.com`):

1. **Update vite.config.js**:
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/', // Change from '/KabaHub/' to '/'
   })
   ```

2. **Update video paths in App.jsx**:
   - Change `/KabaHub/media/demo-video.mp4` to `/media/demo-video.mp4`

3. **Add custom domain in GitHub**:
   - Settings → Pages → Custom domain
   - Enter your domain
   - Configure DNS with your domain provider

4. **DNS Configuration**:
   ```
   Type: CNAME
   Name: www
   Value: YOUR_USERNAME.github.io
   ```

## 📝 Important Notes

- **Free Hosting**: GitHub Pages is completely free for public repositories
- **Build Time**: Deployments take 2-3 minutes
- **File Size Limits**: Repositories should be under 1GB
- **Bandwidth**: Soft limit of 100GB/month
- **HTTPS**: Automatically provided by GitHub

## 🆘 Need Help?

1. Check GitHub Actions logs for error messages
2. Test build locally: `npm run build && npm run preview`
3. Verify all paths use the correct base path: `/KabaHub/`
4. Check [GitHub Pages documentation](https://docs.github.com/en/pages)

## ✨ You're All Set!

Your KabaHub landing page is ready to deploy to GitHub Pages. Just follow the steps above and you'll be live in minutes!

**Repository name**: Must be exactly `KabaHub`
**Your site URL**: `https://YOUR_USERNAME.github.io/KabaHub/`

---

**Quick Deploy Checklist**:
- [ ] Push code to GitHub
- [ ] Repository named `KabaHub`
- [ ] Enable GitHub Pages (Source: GitHub Actions)
- [ ] Wait for deployment to complete
- [ ] Visit your live site
- [ ] Test waitlist form
