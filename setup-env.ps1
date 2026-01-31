# AgroCrop Environment Setup Script

Write-Host "🌾 AgroCrop Environment Setup" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green

# Find Java
Write-Host "`n1. Checking Java Installation..." -ForegroundColor Yellow
$javaPath = $null

$possiblePaths = @(
    "C:\Program Files\Java\jdk-17",
    "C:\Program Files\Java\jdk-21",
    "C:\Program Files\Java\jdk-11",
    "C:\Program Files\Eclipse Adoptium\jdk-17",
    "C:\Program Files\Eclipse Adoptium\jdk-21",
    "C:\Program Files\Eclipse Adoptium\jdk-11"
)

foreach ($path in $possiblePaths) {
    if (Test-Path $path) {
        $javaPath = $path
        break
    }
}

if ($javaPath) {
    Write-Host "   ✅ Java found at: $javaPath" -ForegroundColor Green
    $env:JAVA_HOME = $javaPath
    $env:PATH = "$javaPath\bin;$env:PATH"
    Write-Host "   ✅ JAVA_HOME set to: $env:JAVA_HOME" -ForegroundColor Green
    
    # Test Java
    try {
        $javaVersion = & java -version 2>&1
        Write-Host "   ✅ Java version: $($javaVersion[0])" -ForegroundColor Green
    } catch {
        Write-Host "   ⚠️  Could not execute java command" -ForegroundColor Yellow
    }
} else {
    Write-Host "   ❌ Java not found. Please install Java 17." -ForegroundColor Red
    Write-Host "   Download from: https://adoptium.net/" -ForegroundColor Cyan
    Write-Host "" -ForegroundColor White
}

# Check MongoDB
Write-Host "`n2. Checking MongoDB..." -ForegroundColor Yellow
try {
    $mongoService = Get-Service -ErrorAction SilentlyContinue | Where-Object {$_.Name -like "*MongoDB*"}
    if ($mongoService) {
        Write-Host "   ✅ MongoDB service found: $($mongoService.Name)" -ForegroundColor Green
        if ($mongoService.Status -eq "Running") {
            Write-Host "   ✅ MongoDB is running" -ForegroundColor Green
        } else {
            Write-Host "   ⚠️  MongoDB is not running. Attempting to start..." -ForegroundColor Yellow
            try {
                Start-Service $mongoService.Name -ErrorAction Stop
                Write-Host "   ✅ MongoDB started successfully" -ForegroundColor Green
            } catch {
                Write-Host "   ❌ Could not start MongoDB. Try running as Administrator" -ForegroundColor Red
            }
        }
    } else {
        Write-Host "   ❌ MongoDB not installed" -ForegroundColor Red
        Write-Host "   Download from: https://www.mongodb.com/try/download/community" -ForegroundColor Cyan
        Write-Host "   OR use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas" -ForegroundColor Cyan
        Write-Host "" -ForegroundColor White
    }
} catch {
    Write-Host "   ⚠️  Could not check MongoDB service" -ForegroundColor Yellow
    Write-Host "   Tip: Run this script as Administrator for full service checks" -ForegroundColor Cyan
}

# Check Node.js
Write-Host "`n3. Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = & node --version 2>&1
    Write-Host "   ✅ Node.js version: $nodeVersion" -ForegroundColor Green
    
    $npmVersion = & npm --version 2>&1
    Write-Host "   ✅ npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Node.js not found" -ForegroundColor Red
    Write-Host "   Download from: https://nodejs.org/" -ForegroundColor Cyan
}

# Summary
Write-Host "`n================================" -ForegroundColor Green
Write-Host "Environment Check Complete!" -ForegroundColor Green
Write-Host "`n📋 Next Steps:" -ForegroundColor Yellow
Write-Host "" -ForegroundColor White

if ($javaPath) {
    Write-Host "Backend (Spring Boot):" -ForegroundColor Cyan
    Write-Host "  cd 'E:\D drive content\AgroCrop\java-service'" -ForegroundColor White
    Write-Host "  .\mvnw.cmd spring-boot:run" -ForegroundColor White
    Write-Host "" -ForegroundColor White
}

Write-Host "Frontend (React):" -ForegroundColor Cyan
Write-Host "  cd 'E:\D drive content\AgroCrop\frontend'" -ForegroundColor White
Write-Host "  npm run dev" -ForegroundColor White
Write-Host "" -ForegroundColor White

Write-Host "Access Dashboard:" -ForegroundColor Cyan
Write-Host "  http://localhost:5173/market-prices" -ForegroundColor White
Write-Host "" -ForegroundColor White
