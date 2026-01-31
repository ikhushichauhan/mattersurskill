# Deployment Guide - MattersUrSkill

This guide will help you deploy the MattersUrSkill platform for FREE using:
- **MongoDB Atlas** (Database) - Free tier
- **Render** (Backend) - Free tier
- **Vercel** (Frontend) - Free tier

## 📋 Prerequisites

- GitHub account
- MongoDB Atlas account (free)
- Render account (free)
- Vercel account (free)

---

## 🗄️ Step 1: Deploy Database (MongoDB Atlas)

### 1.1 Create MongoDB Atlas Account
1. Go to [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Choose **M0 Sandbox (FREE)** tier

### 1.2 Create Cluster
1. Click **"Build a Database"**
2. Select **FREE Shared Cluster**
3. Choose your preferred cloud provider and region
4. Click **"Create Cluster"** (takes 3-5 minutes)

### 1.3 Setup Database Access
1. Click **"Database Access"** in left sidebar
2. Click **"Add New Database User"**
3. Create username and strong password (save these!)
4. Set privileges to **"Read and write to any database"**
5. Click **"Add User"**

### 1.4 Setup Network Access
1. Click **"Network Access"** in left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

### 1.5 Get Connection String
1. Click **"Database"** in left sidebar
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<username>` and `<password>` with your actual credentials
6. Add database name before `?`: `...mongodb.net/matterurskill?retryWrites=true...`

**Save this connection string - you'll need it for backend deployment!**

---

## 🔙 Step 2: Deploy Backend (Render)

### 2.1 Push Code to GitHub
```powershell
# Initialize git in project root (if not already done)
cd c:\Users\ikhus\Documents\project
git init
git add .
git commit -m "Initial commit - MattersUrSkill project"

# Create GitHub repository and push
# Go to github.com and create a new repository named "matterurskill"
git remote add origin https://github.com/YOUR_USERNAME/matterurskill.git
git branch -M main
git push -u origin main
```

### 2.2 Create Render Account
1. Go to [https://render.com](https://render.com)
2. Sign up using your GitHub account

### 2.3 Deploy Backend
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Select **"matterurskill"** repository

### 2.4 Configure Web Service
Fill in the following:

**Basic Settings:**
- **Name**: `matterurskill-backend`
- **Region**: Choose closest to you
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`

**Plan:**
- Select **Free** ($0/month)

**Environment Variables:**
Click **"Advanced"** → **"Add Environment Variable"** and add:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `MONGODB_URI` | `your_mongodb_atlas_connection_string_from_step_1.5` |
| `JWT_SECRET` | `generate_a_random_secret_key_here` |
| `JWT_EXPIRE` | `30d` |

**To generate JWT_SECRET**, run in PowerShell:
```powershell
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

4. Click **"Create Web Service"**
5. Wait 5-10 minutes for deployment
6. **Copy your backend URL** (e.g., `https://matterurskill-backend.onrender.com`)

---

## 🎨 Step 3: Deploy Frontend (Vercel)

### 3.1 Create Vercel Account
1. Go to [https://vercel.com/signup](https://vercel.com/signup)
2. Sign up using your GitHub account

### 3.2 Import Project
1. Click **"Add New..."** → **"Project"**
2. Import your **"matterurskill"** GitHub repository
3. Click **"Import"**

### 3.3 Configure Project
**Framework Preset:** Vercel will auto-detect React

**Root Directory:** Click **"Edit"** → Select `frontend`

**Build Settings:**
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`

**Environment Variables:**
Click **"Environment Variables"** and add:

| Key | Value |
|-----|-------|
| `REACT_APP_API_URL` | `https://matterurskill-backend.onrender.com` |

### 3.4 Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes for deployment
3. **Copy your frontend URL** (e.g., `https://matterurskill.vercel.app`)

---

## 🔧 Step 4: Update Code for Production

### 4.1 Update Frontend API Configuration

The frontend needs to use the environment variable for API calls. The `proxy` in package.json only works in development.

**No changes needed** - Axios will use the full backend URL automatically when deployed.

### 4.2 Update Backend CORS

Your backend is already configured to accept requests from any origin with `cors()`. This is fine for development but in production, you should restrict it.

---

## ✅ Step 5: Test Your Deployment

1. **Visit Frontend URL**: `https://your-app.vercel.app`
2. **Register** a new account
3. **Login** and test features:
   - Post a job (as provider)
   - Browse jobs
   - Apply for jobs (as worker)
   - View profiles

---

## 🐛 Troubleshooting

### Backend Issues

**"Application failed to respond"**
- Check Render logs: Dashboard → Your Service → Logs
- Verify MongoDB connection string is correct
- Ensure all environment variables are set

**"MongoNetworkError"**
- Check MongoDB Atlas Network Access allows 0.0.0.0/0
- Verify connection string format is correct

### Frontend Issues

**"Failed to fetch" or CORS errors**
- Verify `REACT_APP_API_URL` is set correctly in Vercel
- Check backend is running on Render
- Redeploy frontend after adding environment variable

**"Cannot read property" errors**
- Check browser console for errors
- Verify API responses are correct

### Database Issues

**"Authentication failed"**
- Verify username/password in connection string
- Check Database Access user exists

---

## 📝 Important Notes

### Free Tier Limitations

**Render (Backend):**
- Spins down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds (cold start)
- 750 hours/month free (enough for one service)

**Vercel (Frontend):**
- Unlimited personal projects
- 100 GB bandwidth/month
- Automatic HTTPS

**MongoDB Atlas:**
- 512 MB storage
- Shared RAM
- Perfect for development/small projects

### Cold Starts
- Render free tier sleeps after inactivity
- First user may experience slow initial load
- Subsequent requests are fast

### Custom Domains (Optional)
- **Vercel**: Add custom domain in Project Settings
- **Render**: Upgrade to paid plan for custom domains

---

## 🔄 Update Deployment

### Update Backend
```powershell
# Make changes to backend code
git add .
git commit -m "Update backend"
git push

# Render auto-deploys from GitHub
```

### Update Frontend
```powershell
# Make changes to frontend code
git add .
git commit -m "Update frontend"
git push

# Vercel auto-deploys from GitHub
```

---

## 🔒 Security Recommendations for Production

1. **Update CORS in backend** to only allow your frontend domain:
   ```javascript
   app.use(cors({
     origin: 'https://your-app.vercel.app'
   }));
   ```

2. **Add rate limiting** to prevent abuse

3. **Use strong JWT secret** (64+ characters)

4. **Enable MongoDB IP whitelist** for better security

5. **Add input validation** on all endpoints

---

## 📊 Monitoring

### Render Dashboard
- View logs: Real-time server logs
- Monitor metrics: CPU, Memory usage
- Check deployment status

### Vercel Dashboard
- View deployments: All deployment history
- Check analytics: Visitor stats
- Monitor performance

### MongoDB Atlas
- Database metrics: Storage, connections
- Performance insights: Slow queries
- Alerts: Set up monitoring alerts

---

## 💰 Cost Estimate

- **Development**: $0/month (100% free)
- **Production (Small scale)**: $0/month
- **Scaling Required**: 
  - Render: $7/month (basic)
  - Vercel: Free tier is generous
  - MongoDB: $9/month (M2 cluster)

---

## 🎉 Your Deployed URLs

After completing all steps, you'll have:

- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://matterurskill-backend.onrender.com`
- **Database**: Managed by MongoDB Atlas

**Share your frontend URL** - that's your live application!

---

## 📱 Next Steps

1. Test all features thoroughly
2. Share with users for feedback
3. Monitor logs for errors
4. Consider adding:
   - Email verification (SendGrid free tier)
   - Image uploads (Cloudinary free tier)
   - Analytics (Google Analytics)
   - Error tracking (Sentry free tier)

**Congratulations! Your MattersUrSkill platform is now live! 🚀**
