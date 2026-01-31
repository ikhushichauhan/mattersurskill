@echo off
echo ========================================
echo   MattersUrSkill - Quick Start
echo ========================================
echo.
echo This will start both backend and frontend
echo.
echo Make sure MongoDB is running!
echo.
pause

cd backend
start "MattersUrSkill - Backend" cmd /k "npm run dev"

timeout /t 3 /nobreak > nul

cd ..\frontend
start "MattersUrSkill - Frontend" cmd /k "npm start"

echo.
echo ========================================
echo   Servers are starting!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Visit http://localhost:3000 in your browser
echo.
pause
