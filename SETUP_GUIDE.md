# MongoDB & Java Setup Guide

## 📦 1. MongoDB Installation

### Option A: MongoDB Community Server (Recommended)

1. **Download MongoDB:**
   - Visit: https://www.mongodb.com/try/download/community
   - Select: Windows, Version 7.0 (or latest), MSI installer
   - Click "Download"

2. **Install MongoDB:**
   ```
   - Run the downloaded .msi file
   - Choose "Complete" installation
   - Install MongoDB as a Service (check the box)
   - Install MongoDB Compass (optional GUI tool)
   ```

3. **Verify Installation:**
   ```powershell
   # Check if MongoDB service is running
   net start | findstr MongoDB
   
   # Or check manually
   Get-Service | Where-Object {$_.Name -like "*MongoDB*"}
   ```

4. **Test Connection:**
   ```powershell
   # Using MongoDB Shell (if installed)
   mongosh
   
   # You should see: "Connected to: mongodb://localhost:27017"
   ```

### Option B: MongoDB Atlas (Cloud - FREE, No Installation)

1. **Sign Up:**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Create free account

2. **Create Cluster:**
   - Choose FREE M0 tier
   - Select your region (closest to you)
   - Click "Create Cluster"

3. **Get Connection String:**
   - Click "Connect" → "Drivers"
   - Copy connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

4. **Update AgroCrop Configuration:**
   - Edit: `E:\D drive content\AgroCrop\java-service\src\main\resources\application.properties`
   - Replace MongoDB URI:
     ```properties
     spring.data.mongodb.uri=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/agrowcrop
     ```

---

## ☕ 2. JAVA_HOME Configuration

### Check Current Java Installation

```powershell
# Run this first to see if Java is installed
java -version
```

### If Java is Installed:

**Step 1: Find Java Installation Path**

Common locations:
- `C:\Program Files\Java\jdk-17`
- `C:\Program Files\Java\jdk-21`
- `C:\Program Files\Eclipse Adoptium\jdk-17`

**Step 2: Set JAVA_HOME (Temporary - Current Session)**

```powershell
# Replace with your actual Java path
$env:JAVA_HOME="C:\Program Files\Java\jdk-17"
$env:PATH="$env:JAVA_HOME\bin;$env:PATH"

# Verify
echo $env:JAVA_HOME
java -version
```

**Step 3: Set JAVA_HOME (Permanent - System Wide)**

```powershell
# Run PowerShell as Administrator, then:
[System.Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Program Files\Java\jdk-17", [System.EnvironmentVariableTarget]::Machine)

# Restart your terminal after this
```

### If Java is NOT Installed:

1. **Download Java 17:**
   - Option 1: Oracle JDK - https://www.oracle.com/java/technologies/downloads/#java17
   - Option 2: Eclipse Temurin - https://adoptium.net/ (Recommended, Open Source)

2. **Install:**
   - Run the installer
   - Note the installation path
   - Follow Step 2 & 3 above to set JAVA_HOME

3. **Verify:**
   ```powershell
   java -version
   # Should show: java version "17.x.x"
   ```

---

## 🎯 Quick Setup Script (Run This!)

Save as `setup-env.ps1`:

```powershell
# AgroCrop Environment Setup Script

Write-Host "🌾 AgroCrop Environment Setup" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green

# Find Java
Write-Host "`n1. Checking Java Installation..." -ForegroundColor Yellow
$javaPath = $null

$possiblePaths = @(
    "C:\Program Files\Java\jdk-17",
    "C:\Program Files\Java\jdk-21",
    "C:\Program Files\Eclipse Adoptium\jdk-17",
    "C:\Program Files\Eclipse Adoptium\jdk-21"
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
} else {
    Write-Host "   ❌ Java not found. Please install Java 17." -ForegroundColor Red
    Write-Host "   Download from: https://adoptium.net/" -ForegroundColor Cyan
}

# Check MongoDB
Write-Host "`n2. Checking MongoDB..." -ForegroundColor Yellow
try {
    $mongoService = Get-Service | Where-Object {$_.Name -like "*MongoDB*"}
    if ($mongoService) {
        Write-Host "   ✅ MongoDB service found: $($mongoService.Name)" -ForegroundColor Green
        if ($mongoService.Status -eq "Running") {
            Write-Host "   ✅ MongoDB is running" -ForegroundColor Green
        } else {
            Write-Host "   ⚠️  MongoDB is not running. Starting..." -ForegroundColor Yellow
            Start-Service $mongoService.Name
            Write-Host "   ✅ MongoDB started" -ForegroundColor Green
        }
    } else {
        Write-Host "   ❌ MongoDB not installed" -ForegroundColor Red
        Write-Host "   Download from: https://www.mongodb.com/try/download/community" -ForegroundColor Cyan
        Write-Host "   OR use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas" -ForegroundColor Cyan
    }
} catch {
    Write-Host "   ⚠️  Could not check MongoDB service" -ForegroundColor Yellow
}

# Summary
Write-Host "`n================================" -ForegroundColor Green
Write-Host "Environment Check Complete!" -ForegroundColor Green
Write-Host "`nNext Steps:" -ForegroundColor Yellow
Write-Host "1. If Java or MongoDB are missing, install them" -ForegroundColor White
Write-Host "2. Run: cd 'E:\D drive content\AgroCrop\java-service'" -ForegroundColor White
Write-Host "3. Run: .\mvnw.cmd spring-boot:run" -ForegroundColor White
Write-Host "4. In new terminal: cd 'E:\D drive content\AgroCrop\frontend'" -ForegroundColor White
Write-Host "5. Run: npm run dev" -ForegroundColor White
```

**To Use:**
```powershell
cd "E:\D drive content\AgroCrop"
.\setup-env.ps1
```

---

## 🔧 Troubleshooting

### MongoDB Connection Issues

**Error:** `MongoTimeoutException`

**Solutions:**
1. Check if MongoDB is running: `net start | findstr MongoDB`
2. Start MongoDB: `net start MongoDB`
3. Check firewall settings (allow port 27017)
4. Try MongoDB Atlas instead (no local installation needed)

### JAVA_HOME Issues

**Error:** `JAVA_HOME is not defined`

**Solutions:**
1. Set JAVA_HOME in current session (see Step 2 above)
2. Restart your terminal/IDE after setting system variables
3. Use `mvnw.cmd` instead of `mvn` (it includes Maven wrapper)

### Port Already in Use

**Error:** `Port 8080 already in use`

**Solutions:**
```powershell
# Find what's using port 8080
netstat -ano | findstr :8080

# Kill that process (replace PID with actual process ID)
taskkill /PID <PID> /F
```
