@echo off
echo.
echo ========================================
echo Quran Live Learn - Frontend Deployment
echo ========================================
echo.

echo Step 1: Installing frontend dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo Error: npm install failed
    cd ..
    pause
    exit /b 1
)

echo Step 2: Building frontend...
call npm run build
if %errorlevel% neq 0 (
    echo Error: npm run build failed
    cd ..
    pause
    exit /b 1
)

echo Step 3: Verifying build output...
if exist "build\index.html" (
    echo ✓ Build output found
) else (
    echo ✗ Build output NOT found
    cd ..
    pause
    exit /b 1
)

cd ..

echo.
echo ========================================
echo ✓ Frontend is ready for deployment!
echo ========================================
echo.
echo Next steps:
echo 1. Push to GitHub: git push origin main
echo 2. Deploy to Vercel (see DEPLOYMENT.md)
echo 3. Add environment variables in Vercel
echo.
pause
