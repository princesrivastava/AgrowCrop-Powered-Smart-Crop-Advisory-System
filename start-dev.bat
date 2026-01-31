@echo off
REM AgrowCrop - Start Both Backend & Frontend (Batch Script)
REM Usage: start-dev.bat

echo ========================================
echo   AgrowCrop - Starting Services
echo ========================================
echo.

REM Check if node_modules exist
if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
)

if not exist "frontend\node_modules" (
    echo Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
)

echo.
echo Starting Backend Server (Port 5000)...
echo Starting Frontend Server (Port 3000)...
echo.
echo Press Ctrl+C to stop both servers
echo.

REM Start backend in new window
start "AgrowCrop Backend" cmd /k "npm run dev"

REM Wait a moment
timeout /t 2 /nobreak >nul

REM Start frontend in new window
start "AgrowCrop Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Both servers are starting in separate windows...
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
pause


