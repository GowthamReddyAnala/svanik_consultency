# Svanick Consultancy - Deployment Guide

## Free Hosting Options

### **Frontend (React + Vite)**
- **Vercel** (Recommended) - Free, super easy, optimized for React
- **Netlify** - Free, great alternative
- **GitHub Pages** - Free, but requires extra configuration

### **Backend (Express + SQLite)**
- **Render** (Recommended) - Free tier available
- **Railway** - Free trial with free tier options
- **Glitch** - Free and simple

---

## **Option 1: Deploy Frontend to Vercel (Easiest)**

### Step 1: Create GitHub Repository
```bash
cd d:\Gowtham\Learning
git init
git add .
git commit -m "Initial commit"
```

### Step 2: Push to GitHub
1. Go to [GitHub](https://github.com/new) and create new repo named `svanick-consultancy`
2. Copy the commands shown and run them in your project folder:
```bash
git remote add origin https://github.com/YOUR_USERNAME/svanick-consultancy.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel
1. Go to [Vercel.com](https://vercel.com)
2. Click **"New Project"**
3. Import your GitHub repository
4. **Framework:** Select "Vite"
5. **Root Directory:** Select "frontend"
6. Click **"Deploy"**

### Step 4: Set Environment Variables in Vercel
1. In Vercel project → **Settings** → **Environment Variables**
2. Add: `VITE_API_URL` = `https://your-backend-url.com` (will update after backend deployment)
3. Redeploy

### Step 5: Update Frontend Code
Change API URLs in [frontend/src/pages/Admin.jsx](frontend/src/pages/Admin.jsx), [Home.jsx](frontend/src/pages/Home.jsx), etc:

```javascript
// Before:
const res = await fetch('http://localhost:4000/api/admin/consultations')

// After:
const apiUrl = process.env.VITE_API_URL || 'http://localhost:4000'
const res = await fetch(`${apiUrl}/api/admin/consultations`)
```

---

## **Option 2: Deploy Backend to Render (Free)**

### Step 1: Prepare Backend
Update [backend/package.json](backend/package.json):
```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "node index.js"
  }
}
```

### Step 2: Create .env file
Create `backend/.env`:
```
PORT=4000
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
NODE_ENV=production
```

### Step 3: Push to GitHub (if not done)
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 4: Deploy to Render
1. Go to [Render.com](https://render.com)
2. Click **"New +"** → **"Web Service"**
3. Select **"Deploy an existing Git repository"**
4. Connect your GitHub account and select `svanick-consultancy`
5. **Settings:**
   - **Name:** `svanick-backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm install --prefix backend`
   - **Start Command:** `npm run start --prefix backend`
   - **Root Directory:** Leave blank
6. Scroll down → **Environment**
7. Add environment variables:
   - `PORT=4000`
   - `EMAIL_USER=your-email@gmail.com`
   - `EMAIL_PASSWORD=your-app-password`
8. Click **"Create Web Service"**

### Step 5: Get Backend URL
Once deployed, Render will give you a URL like:
```
https://svanick-backend.onrender.com
```

### Step 6: Update Vercel with Backend URL
1. Go back to Vercel project
2. **Settings** → **Environment Variables**
3. Update `VITE_API_URL` to `https://svanick-backend.onrender.com`
4. Redeploy

---

## **Step-by-Step Summary**

### For Frontend (Vercel):
1. ✅ Push code to GitHub
2. ✅ Connect GitHub to Vercel
3. ✅ Deploy automatically (Vercel handles this)
4. ✅ Set environment variables for backend URL
5. ✅ Your site is live at `https://project-name.vercel.app`

### For Backend (Render):
1. ✅ Create `.env` file with email credentials
2. ✅ Push to GitHub (same repo)
3. ✅ Connect GitHub to Render
4. ✅ Deploy automatically
5. ✅ Your API is live at `https://project-name.onrender.com`

---

## **Alternative: Deploy Everything to Railway**

Railway offers generous free tier for both frontend and backend.

### Step 1: Go to [Railway.app](https://railway.app)
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Select your repo

### Step 2: Configure Frontend Service
1. Click **"New Service"**
2. Select your repo
3. Environment: **Vite**
4. Build command: `cd frontend && npm run build`
5. Start command: `cd frontend && npm run preview`

### Step 3: Configure Backend Service
1. Click **"New Service"**
2. Select your repo
3. Environment: **Node.js**
4. Start command: `npm run start --prefix backend`
5. Add environment variables (EMAIL_USER, EMAIL_PASSWORD)

### Step 4: Connect Services
In Railway:
1. Click on Backend service
2. **Variables** → Add `FRONTEND_URL=https://your-frontend-url`
3. Update frontend to call backend API

---

## **Update Your Code for Production**

### Update all API calls:

**frontend/src/pages/Home.jsx:**
```javascript
const apiUrl = process.env.VITE_API_URL || 'http://localhost:4000'

const handleSubmit = async (e) => {
  const res = await fetch(`${apiUrl}/api/consultation`, {
    // ...
  })
}
```

**frontend/src/pages/Admin.jsx:**
```javascript
const fetchData = async () => {
  const apiUrl = process.env.VITE_API_URL || 'http://localhost:4000'
  const [consultRes, contactRes] = await Promise.all([
    fetch(`${apiUrl}/api/admin/consultations`),
    fetch(`${apiUrl}/api/admin/contacts`)
  ])
  // ...
}
```

**frontend/src/pages/Contact.jsx:**
```javascript
const apiUrl = process.env.VITE_API_URL || 'http://localhost:4000'
const res = await fetch(`${apiUrl}/api/contact`, {
  // ...
})
```

---

## **Database for Production**

### Current Setup (SQLite)
SQLite stores data in `data.db` (file-based). On Render, this gets reset after inactivity.

### Better Option: Use PostgreSQL (Free)
1. **Render** provides free PostgreSQL database
2. Update `backend/database.js` to use PostgreSQL instead of SQLite

Install postgres package:
```bash
npm install --prefix backend pg
```

Update database.js to use PostgreSQL connection.

---

## **Email Configuration**

For Gmail:
1. Enable 2FA on Gmail account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Select **Mail** and **Windows Computer**
4. Copy the 16-character password
5. Add to `.env`:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=xxxx-xxxx-xxxx-xxxx
```

---

## **Final Checklist**

- [ ] Code pushed to GitHub
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Render
- [ ] Environment variables set in both platforms
- [ ] Frontend API URLs updated with backend domain
- [ ] Test consultation form submission
- [ ] Test admin panel (press 'a' twice)
- [ ] Check backend logs for errors
- [ ] Verify emails are sending (if configured)

---

## **Common Issues**

### CORS Error
Update [backend/index.js](backend/index.js):
```javascript
app.use(cors({
  origin: ['https://your-frontend-url.vercel.app', 'http://localhost:5173'],
  credentials: true
}))
```

### Backend Timeout (Render free tier)
- Render spins down after 15 mins of inactivity
- First request takes 30 seconds to wake up
- Upgrade to paid or use Railway

### Database Issues
- SQLite doesn't persist on serverless
- Switch to PostgreSQL for production
- Add this to [backend/package.json](backend/package.json):
```json
{
  "engines": {
    "node": "18.x"
  }
}
```

---

## **Costs**

| Service | Cost |
|---------|------|
| Vercel (Frontend) | **Free** (up to 100 deployments/month) |
| Render (Backend) | **Free** (limited, ~750 hours/month) |
| Railway | **Free** ($5 credit/month auto) |
| Netlify (Frontend) | **Free** |

---

## **Next Steps**

1. **Choose your hosting:** Vercel + Render (easiest) or Railway (all-in-one)
2. **Prepare code:** Update API URLs with environment variables
3. **Deploy frontend:** Follow Vercel steps
4. **Deploy backend:** Follow Render steps
5. **Test:** Submit forms and check admin panel
6. **Configure email:** Add EMAIL_USER and EMAIL_PASSWORD
7. **Upgrade when needed:** As traffic grows

Your site will be live at:
- **Frontend:** `https://project-name.vercel.app`
- **Backend API:** `https://project-name.onrender.com`

Good luck! 🚀
