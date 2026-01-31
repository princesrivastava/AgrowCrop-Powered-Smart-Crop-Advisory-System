@echo off
REM AgrowCrop - Start Java Spring Boot Backend
REM This script sets JAVA_HOME and starts the Java backend service

echo ========================================
echo   AgrowCrop - Starting Java Backend
echo ========================================
echo.

REM Set JAVA_HOME
SET "JAVA_HOME=C:\Program Files\Java\jdk-25"
echo JAVA_HOME set to: %JAVA_HOME%
echo.

REM Navigate to java-service directory
cd java-service

echo Starting Spring Boot application on port 8080...
echo Please wait, this may take a minute...
echo.

REM Run Maven wrapper
call mvnw.cmd spring-boot:run -DskipTests
