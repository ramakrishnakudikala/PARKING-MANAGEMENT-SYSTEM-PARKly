@echo off
echo PARKly Backend Setup
echo ====================

echo.
echo Checking if Node.js is installed...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please download and install Node.js from: https://nodejs.org/
    echo After installation, run this script again.
    pause
    exit /b 1
)

echo Node.js is installed!
node --version

echo.
echo Checking if npm is available...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: npm is not available!
    echo Please reinstall Node.js from: https://nodejs.org/
    pause
    exit /b 1
)

echo npm is available!
npm --version

echo.
echo Installing dependencies...
npm install

if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies!
    echo Please check your internet connection and try again.
    pause
    exit /b 1
)

echo.
echo Dependencies installed successfully!
echo.
echo To start the server, run:
echo   npm start
echo.
echo Or for development mode with auto-restart:
echo   npm run dev
echo.
echo The server will be available at: http://localhost:3000
echo Admin dashboard will be at: http://localhost:3000/admin.html
echo.
pause