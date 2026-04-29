@echo off
echo.
echo ========================================
echo Quran Live Learn - Backend Deployment
echo ========================================
echo.

echo Step 1: Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Error: npm install failed
    pause
    exit /b 1
)

echo Step 2: Building backend...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo Error: backend npm install failed
    cd ..
    pause
    exit /b 1
)
cd ..

echo Step 3: Verifying configuration...
if exist "backend\.env" (
    echo ✓ .env file found
) else (
    echo ✗ .env file NOT found! Please create it first.
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✓ Backend is ready for deployment!
echo ========================================
echo.
echo Next steps:
echo 1. Push to GitHub: git push origin main
echo 2. Deploy to Vercel (see DEPLOYMENT.md)
echo 3. Update frontend REACT_APP_API_URL
echo 4. Deploy frontend to Vercel
echo.
pause
