#!/bin/bash

# Setup script for Quran Live Learn application

echo ""
echo "================================"
echo "Quran Live Learn - Setup Script"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✓ Node.js found: $NODE_VERSION"
echo ""

# Setup Backend
echo "Setting up Backend..."
cd backend

if [ -d "node_modules" ]; then
    echo "✓ Backend dependencies already installed"
else
    echo "Installing backend dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "Error: Failed to install backend dependencies"
        exit 1
    fi
fi

# Check for .env file
if [ ! -f ".env" ]; then
    echo "Creating .env from template..."
    cp .env.example .env
    echo "!!! Please update .env file with your Gemini API Key !!!"
fi

echo "✓ Backend setup complete"
cd ..
echo ""

# Setup Frontend
echo "Setting up Frontend..."
cd frontend

if [ -d "node_modules" ]; then
    echo "✓ Frontend dependencies already installed"
else
    echo "Installing frontend dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "Error: Failed to install frontend dependencies"
        exit 1
    fi
fi

# Check for .env file
if [ ! -f ".env" ]; then
    echo "Creating .env from template..."
    cp .env.example .env
fi

echo "✓ Frontend setup complete"
cd ..
echo ""

echo "================================"
echo "Setup Complete!"
echo "================================"
echo ""
echo "To start the application:"
echo ""
echo "1. Terminal 1 (Backend):"
echo "   cd backend"
echo "   npm start"
echo ""
echo "2. Terminal 2 (Frontend):"
echo "   cd frontend"
echo "   npm start"
echo ""
echo "Frontend will be available at: http://localhost:3000"
echo "Backend API at: http://localhost:5000"
echo ""
echo "Don't forget to:"
echo "- Update backend/.env with your Gemini API Key"
echo "- Start both backend and frontend servers"
echo ""
