# Quick Start - Deployment Commands

## Prerequisites Setup (One-time)

### 1. Install Git (if not already installed)
```powershell
# Download from: https://git-scm.com/download/win
# Or use winget:
winget install --id Git.Git -e --source winget
```

### 2. Create Accounts
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas/register
- GitHub: https://github.com/signup
- Render: https://render.com/register
- Vercel: https://vercel.com/signup

---

## 🚀 Deployment Commands

### Step 1: Setup Git Repository

```powershell
# Navigate to project root
cd c:\Users\ikhus\Documents\project

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - MattersUrSkill MERN project"

# Create repository on GitHub (go to github.com/new)
# Then link it:
git remote add origin https://github.com/YOUR_USERNAME/matterurskill.git
git branch -M main
git push -u origin main
```

### Step 2: MongoDB Atlas

1. Create cluster on MongoDB Atlas (free M0)
2. Create database user
3. Whitelist IP: 0.0.0.0/0
4. Get connection string:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/matterurskill?retryWrites=true&w=majority
   ```

### Step 3: Deploy Backend on Render

1. Go to Render Dashboard
2. New → Web Service
3. Connect GitHub repository
4. Configure:
   - Name: `matterurskill-backend`
   - Root Directory: `backend`
   - Build: `npm install`
   - Start: `node server.js`
   - Plan: **Free**

5. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=generate_random_64_char_string
   JWT_EXPIRE=30d
   ```

6. Deploy (takes 5-10 min)
7. Copy backend URL: `https://matterurskill-backend.onrender.com`

### Step 4: Deploy Frontend on Vercel

```powershell
# Install Vercel CLI
npm install -g vercel

# Navigate to frontend
cd frontend

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Link to existing project: N
# - Project name: matterurskill
# - Directory: ./ (current)
# - Override settings: N
```

Or use Vercel Dashboard:
1. Import GitHub repository
2. Root Directory: `frontend`
3. Environment Variable:
   ```
   REACT_APP_API_URL=https://matterurskill-backend.onrender.com
   ```
4. Deploy

### Step 5: Test Deployment

Visit your Vercel URL and test:
- Registration
- Login
- Post job
- Browse jobs
- Apply for jobs

---

## 🔄 Update Deployment

```powershell
# Make code changes, then:
git add .
git commit -m "Your update message"
git push

# Both Render and Vercel auto-deploy from GitHub
```

---

## 📝 Environment Variables Reference

### Backend (Render)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/matterurskill
JWT_SECRET=your_64_character_random_string_here
JWT_EXPIRE=30d
FRONTEND_URL=https://your-app.vercel.app
```

### Frontend (Vercel)
```env
REACT_APP_API_URL=https://matterurskill-backend.onrender.com
```

---

## 🆘 Quick Troubleshooting

**Backend won't start:**
```powershell
# Check Render logs in dashboard
# Verify MONGODB_URI is correct
# Ensure all env vars are set
```

**Frontend can't connect:**
```powershell
# Check REACT_APP_API_URL is set
# Verify backend is running
# Check browser console for errors
```

**Database connection failed:**
```powershell
# Verify MongoDB user credentials
# Check Network Access whitelist
# Test connection string format
```

---

## 📊 Your Live URLs

After deployment:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://matterurskill-backend.onrender.com`
- **API Health**: `https://matterurskill-backend.onrender.com/api/health`

**Share your frontend URL with users! 🎉**
