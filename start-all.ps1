# AgrowCrop - Start All Services (Backend + Frontend in one terminal)
# Usage: .\start-all.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  AgrowCrop - Starting All Services" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if concurrently is installed
if (-not (Test-Path "node_modules\concurrently")) {
    Write-Host "Installing concurrently..." -ForegroundColor Yellow
    npm install concurrently --save-dev
}

# Check if node_modules exist
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    npm install
}

if (-not (Test-Path "frontend\node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    cd frontend
    npm install
    cd ..
}

Write-Host ""
Write-Host "Starting both servers in this terminal..." -ForegroundColor Green
Write-Host "Backend: http://localhost:5000" -ForegroundColor Green
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop both servers" -ForegroundColor Yellow
Write-Host ""

# Start both using concurrently
npm run dev:all


