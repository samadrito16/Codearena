@echo off
setlocal
cd /d "%~dp0"
set MSG=%~1
if "%MSG%"=="" set MSG=chore: automated backup checkpoint %DATE% %TIME%

echo [PrismCode] Staging changes...
git add -A

echo [PrismCode] Creating checkpoint commit...
git commit -m "%MSG%"

echo [PrismCode] Pushing to GitHub...
git push origin main

echo.
echo [PrismCode] Backup finished successfully!
pause
