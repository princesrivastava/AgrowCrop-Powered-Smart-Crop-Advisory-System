$ErrorActionPreference = "Stop"
$phone = "7225863407"

Write-Host ""
Write-Host "AgroCrop OTP Retriever (DEV MODE)" -ForegroundColor Cyan
Write-Host "Phone Number: $phone" -ForegroundColor White
Write-Host ""

try {
    # --------------------------------------------------------
    # STEP 1: Send OTP
    # --------------------------------------------------------
    Write-Host "Sending OTP request..." -ForegroundColor Yellow
    
    $headers = @{ "Content-Type" = "application/json" }
    $body = @{ phone = $phone } | ConvertTo-Json

    $sendParams = @{
        Uri             = "http://localhost:8080/api/auth/send-otp"
        Method          = "POST"
        Headers         = $headers
        Body            = $body
        UseBasicParsing = $true
    }
    
    Invoke-WebRequest @sendParams | Out-Null
    Write-Host "OTP sent successfully!" -ForegroundColor Green

    Start-Sleep -Seconds 1

    # --------------------------------------------------------
    # STEP 2: Retrieve OTP (DEV ONLY)
    # --------------------------------------------------------
    Write-Host "Retrieving OTP from backend..." -ForegroundColor Yellow

    $getParams = @{
        Uri             = "http://localhost:8080/api/dev/otp/$phone"
        Method          = "GET"
        UseBasicParsing = $true
    }

    $otpResponse = Invoke-WebRequest @getParams
    $otpData = $otpResponse.Content | ConvertFrom-Json

    # --------------------------------------------------------
    # STEP 3: Display OTP
    # --------------------------------------------------------
    Write-Host ""
    Write-Host "YOUR OTP CODE IS: $($otpData.otp)" -ForegroundColor Yellow -BackgroundColor DarkGreen
    Write-Host "Valid Until: $($otpData.expiresAt)" -ForegroundColor Gray
    Write-Host ""
}
catch {
    Write-Host ""
    Write-Host "❌ ERROR: Operation Failed" -ForegroundColor Red
    
    if ($_.Exception.Response) {
        $statusCode = $_.Exception.Response.StatusCode.value__
        $statusDesc = $_.Exception.Response.StatusDescription
        Write-Host "HTTP Status: $statusCode $statusDesc" -ForegroundColor Red}
    else {
        Write-Host $_.Exception.Message -ForegroundColor Red
}
    
    Write-Host ""
    Write-Host "Troubleshooting:" -ForegroundColor Yellow
    Write-Host "1. Ensure Backend is running on port 8080"
    Write-Host "2. If 404, the OTP wasn't generated or saved."
    Write-Host ""
}
