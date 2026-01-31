# Quick Setup Guide

## ❌ Why Live Server Doesn't Work

This is a **MERN Stack Application** (MongoDB, Express, React, Node.js), not a static HTML website.

Live Server only works for simple HTML/CSS/JS files.

---

## ✅ How to Run the Project

### Option 1: Use the Startup Script (Easiest)

**Right-click** `START.bat` and select **"Run as Administrator"**

OR

**Right-click** `START.ps1` and select **"Run with PowerShell"**

### Option 2: Manual Start

**Step 1 - Install Dependencies:**
```powershell
cd backend
npm install

cd ..\frontend
npm install
```

**Step 2 - Setup Environment:**
```powershell
cd backend
Copy-Item .env.example .env
# Edit .env file with your MongoDB connection
```

**Step 3 - Start MongoDB:**
```powershell
# If you have MongoDB installed locally:
net start MongoDB

# OR use MongoDB Atlas (cloud database - free)
# Update MONGODB_URI in backend/.env
```

**Step 4 - Start Backend (Terminal 1):**
```powershell
cd backend
npm run dev
```

**Step 5 - Start Frontend (Terminal 2):**
```powershell
cd frontend
npm start
```

**Step 6 - Open Browser:**
Visit: http://localhost:3000

---

## 🎯 What You'll See

- **Backend API**: http://localhost:5000
- **Frontend App**: http://localhost:3000
- **Health Check**: http://localhost:5000/api/health

---

## 🗄️ MongoDB Options

### Option A: Local MongoDB (If installed)
```powershell
mongod
```

### Option B: MongoDB Atlas (Recommended - Free Cloud)
1. Go to mongodb.com/cloud/atlas
2. Create free account
3. Create cluster (M0 Free)
4. Get connection string
5. Update backend/.env:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/matterurskill
```

---

## 🐛 Troubleshooting

### "npm is not recognized"
Install Node.js from: https://nodejs.org/

### "Cannot find module"
```powershell
cd backend
npm install

cd ..\frontend
npm install
```

### "Port 3000 already in use"
```powershell
npx kill-port 3000
npx kill-port 5000
```

### "MongoDB connection failed"
- Start MongoDB: `net start MongoDB`
- OR use MongoDB Atlas connection string

---

## 📁 Important Files

- `backend/` - Server code (API)
- `frontend/` - React app (UI)
- `START.bat` - Quick startup script
- `HOW_TO_RUN.md` - Detailed instructions

**Ignore**: `index.html`, `script.js`, `style.css` in root (they're empty)

---

## ✨ Features to Test

1. **Register** - Create account (Worker or Provider)
2. **Login** - Sign in
3. **Browse Jobs** - See available jobs
4. **Post Job** - Create job listing (Provider)
5. **Apply** - Apply for jobs (Worker)
6. **Dashboard** - Manage your jobs
7. **Profile** - View/edit profile

---

Need help? Read `HOW_TO_RUN.md` for detailed instructions!
