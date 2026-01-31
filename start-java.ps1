# AgrowCrop - Start Java Spring Boot Backend
# This script sets JAVA_HOME and starts the Java backend service

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  AgrowCrop - Starting Java Backend" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Find Java installation
Write-Host "Detecting Java installation..." -ForegroundColor Yellow
$javaPath = $null

$possiblePaths = @(
    "C:\Program Files\Java\jdk-25",
    "C:\Program Files\Java\jdk-21",
    "C:\Program Files\Java\jdk-20",
    "C:\Program Files\Java\jdk-17",
    "C:\Program Files\Java\jdk-11",
    "C:\Program Files\Eclipse Adoptium\jdk-21",
    "C:\Program Files\Eclipse Adoptium\jdk-17",
    "C:\Program Files\Eclipse Adoptium\jdk-11"
)

foreach ($path in $possiblePaths) {
    if (Test-Path $path) {
        $javaPath = $path
        Write-Host "✅ Found Java at: $javaPath" -ForegroundColor Green
        break
    }
}

if (-not $javaPath) {
    Write-Host "❌ Java not found! Please install Java 17 or higher." -ForegroundColor Red
    Write-Host "Download from: https://adoptium.net/" -ForegroundColor Cyan
    pause
    exit 1
}

# Set JAVA_HOME
$env:JAVA_HOME = $javaPath
$env:PATH = "$javaPath\bin;$env:PATH"
Write-Host "JAVA_HOME set to: $env:JAVA_HOME" -ForegroundColor Green
Write-Host ""

# Navigate to java-service directory
Set-Location -Path "java-service"

Write-Host "Starting Spring Boot application on port 8080..." -ForegroundColor Yellow
Write-Host "Please wait, this may take a minute..." -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
Write-Host ""

# Run Maven wrapper with JAVA_HOME explicitly set
& cmd /c "set JAVA_HOME=$javaPath&& mvnw.cmd spring-boot:run"
