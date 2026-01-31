# AgrowCrop - Start Both Backend & Frontend (PowerShell Script)
# Usage: .\start-dev.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  AgrowCrop - Starting Services" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

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
Write-Host "Starting Backend Server (Port 5000)..." -ForegroundColor Green
Write-Host "Starting Frontend Server (Port 3000)..." -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop both servers" -ForegroundColor Yellow
Write-Host ""

# Start both services
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; Write-Host 'Backend Server (Port 5000)' -ForegroundColor Green; npm run dev"
Start-Sleep -Seconds 2
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\frontend'; Write-Host 'Frontend Server (Port 3000)' -ForegroundColor Cyan; npm run dev"

Write-Host "Both servers are starting in separate windows..." -ForegroundColor Green
Write-Host ""
Write-Host "Backend: http://localhost:5000" -ForegroundColor Green
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan


