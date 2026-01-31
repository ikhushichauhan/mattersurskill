# 🚀 How to Run MattersUrSkill Locally

## ⚠️ Important: Don't Use Live Server!

This is a **MERN stack application**, not a static website. Live Server won't work.

---

## 📋 Quick Start Guide

### Step 1: Install Dependencies

Open PowerShell in VS Code and run:

```powershell
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ..\frontend
npm install
```

### Step 2: Setup Environment Variables

```powershell
# Create backend .env file
cd ..\backend
Copy-Item .env.example .env

# Edit the .env file with your MongoDB connection
# You can use local MongoDB or MongoDB Atlas
```

Edit `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/matterurskill
JWT_SECRET=your_secret_key_here_change_in_production
JWT_EXPIRE=30d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Step 3: Start MongoDB

**Option A - Local MongoDB:**
```powershell
# Start MongoDB service (if installed locally)
net start MongoDB

# Or start mongod manually
mongod
```

**Option B - MongoDB Atlas (Recommended):**
- Use MongoDB Atlas connection string in `.env`
- No local MongoDB installation needed

### Step 4: Run the Application

**You need TWO terminals:**

**Terminal 1 - Backend:**
```powershell
cd backend
npm run dev
```
Backend runs on: http://localhost:5000

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm start
```
Frontend runs on: http://localhost:3000

---

## ✅ Verification

1. Backend health check: http://localhost:5000/api/health
2. Frontend app: http://localhost:3000
3. You should see the MattersUrSkill landing page

---

## 🐛 Common Issues

### "Cannot find module"
```powershell
# Reinstall dependencies
cd backend
rm -r node_modules
npm install

cd ..\frontend
rm -r node_modules
npm install
```

### "MongoDB connection failed"
- Make sure MongoDB is running
- Check connection string in `.env`
- Or use MongoDB Atlas (free cloud database)

### Port already in use
```powershell
# Kill processes on ports
npx kill-port 5000
npx kill-port 3000
```

---

## 📁 Project Structure

```
project/
├── backend/          ← Node.js/Express API
│   ├── server.js
│   └── package.json
├── frontend/         ← React application
│   ├── src/
│   └── package.json
└── index.html        ← OLD FILE (ignore this)
```

**Don't use the root `index.html` - it's empty!**

---

## 🎯 Next Steps

1. Open http://localhost:3000
2. Register a new account
3. Test the features:
   - Login/Register
   - Browse Jobs
   - Post Job (as provider)
   - Apply for Job (as worker)
   - View Profile

Enjoy your MattersUrSkill platform! 🚀
