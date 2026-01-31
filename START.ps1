# MattersUrSkill - Start Application
# Run this script to start both backend and frontend

Write-Host "🚀 Starting MattersUrSkill Platform..." -ForegroundColor Cyan
Write-Host ""

# Check if backend dependencies are installed
if (!(Test-Path "$PSScriptRoot\backend\node_modules")) {
    Write-Host "📦 Installing backend dependencies..." -ForegroundColor Yellow
    Set-Location "$PSScriptRoot\backend"
    npm install
    Write-Host "✅ Backend dependencies installed!" -ForegroundColor Green
    Write-Host ""
}

# Check if frontend dependencies are installed
if (!(Test-Path "$PSScriptRoot\frontend\node_modules")) {
    Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Yellow
    Set-Location "$PSScriptRoot\frontend"
    npm install
    Write-Host "✅ Frontend dependencies installed!" -ForegroundColor Green
    Write-Host ""
}

# Create .env file if it doesn't exist
if (!(Test-Path "$PSScriptRoot\backend\.env")) {
    Write-Host "📝 Creating backend .env file..." -ForegroundColor Yellow
    Copy-Item "$PSScriptRoot\backend\.env.example" "$PSScriptRoot\backend\.env"
    Write-Host "⚠️  Please edit backend\.env with your MongoDB connection string!" -ForegroundColor Red
    Write-Host ""
}

Write-Host "================================" -ForegroundColor Cyan
Write-Host "  MattersUrSkill is starting!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📍 Backend will run on: http://localhost:5000" -ForegroundColor Yellow
Write-Host "📍 Frontend will run on: http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  Make sure MongoDB is running!" -ForegroundColor Red
Write-Host ""
Write-Host "Opening two terminals..." -ForegroundColor Cyan
Write-Host "Press Ctrl+C in each terminal to stop the servers" -ForegroundColor Gray
Write-Host ""

# Start backend in new terminal
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; Write-Host '🔙 Starting Backend Server...' -ForegroundColor Green; npm run dev"

# Wait a moment for backend to start
Start-Sleep -Seconds 3

# Start frontend in new terminal
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; Write-Host '🎨 Starting Frontend Server...' -ForegroundColor Blue; npm start"

Write-Host "✅ Both servers are starting!" -ForegroundColor Green
Write-Host "🌐 Visit http://localhost:3000 to see your app" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
