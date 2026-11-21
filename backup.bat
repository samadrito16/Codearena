@echo off
setlocal
cd /d "%~dp0"
set MSG=%~1
if "%MSG%"=="" set MSG=chore: automated backup checkpoint %DATE% %TIME%

echo [PrismCode] Ensuring environment files and local database are untracked...
git reset HEAD .env backend/.env backend/data/db.json >nul 2>&1

echo [PrismCode] Staging changes...
git add -A
git reset HEAD .env backend/.env backend/data/db.json >nul 2>&1

echo [PrismCode] Creating checkpoint commit...
git commit -m "%MSG%"

echo [PrismCode] Pushing to GitHub...
git push origin main

echo.
echo [PrismCode] Backup finished successfully!
pause
