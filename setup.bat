@echo off
REM Setup script for Quran Live Learn application

echo.
echo ================================
echo Quran Live Learn - Setup Script
echo ================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js found: %PATH%
echo.

REM Setup Backend
echo Setting up Backend...
cd backend
if exist node_modules (
    echo ✓ Backend dependencies already installed
) else (
    echo Installing backend dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo Error: Failed to install backend dependencies
        pause
        exit /b 1
    )
)

REM Check for .env file
if not exist .env (
    echo Creating .env from template...
    copy .env.example .env
    echo !!! Please update .env file with your Gemini API Key !!!
)

echo ✓ Backend setup complete
cd ..
echo.

REM Setup Frontend
echo Setting up Frontend...
cd frontend
if exist node_modules (
    echo ✓ Frontend dependencies already installed
) else (
    echo Installing frontend dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo Error: Failed to install frontend dependencies
        pause
        exit /b 1
    )
)

REM Check for .env file
if not exist .env (
    echo Creating .env from template...
    copy .env.example .env
)

echo ✓ Frontend setup complete
cd ..
echo.

echo ================================
echo Setup Complete!
echo ================================
echo.
echo To start the application:
echo.
echo 1. Terminal 1 (Backend):
echo    cd backend
echo    npm start
echo.
echo 2. Terminal 2 (Frontend):
echo    cd frontend
echo    npm start
echo.
echo Frontend will be available at: http://localhost:3000
echo Backend API at: http://localhost:5000
echo.
echo Don't forget to:
echo - Update backend/.env with your Gemini API Key
echo - Start both backend and frontend servers
echo.
pause
