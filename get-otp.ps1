# Get OTP Code Helper
$phone = "7225863407"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Getting OTP for $phone" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

try {
    # Call local dev OTP endpoint
    $response = Invoke-RestMethod -Uri "http://localhost:5000/dev-otp/generate?phone=$phone" -Method GET
    $otp = $response.otp
    
    Write-Host "SUCCESS!" -ForegroundColor Green
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  DEV MODE OTP: $otp" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "This OTP will also appear in your browser console!" -ForegroundColor Yellow
    Write-Host "Use this code at http://localhost:3000" -ForegroundColor Cyan
    Write-Host ""
    
} catch {
    Write-Host ""
    Write-Host "Error: Could not connect to dev server on port 5000" -ForegroundColor Red
    Write-Host "Make sure 'npm run dev:all' is running!" -ForegroundColor Yellow
    Write-Host ""
}
