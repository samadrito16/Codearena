@echo off
setlocal
cd /d "%~dp0"
set MSG=%~1
if "%MSG%"=="" set MSG=chore: automated backup checkpoint %DATE% %TIME%

echo [CodeArena] Staging changes...
git add -A

echo [CodeArena] Creating checkpoint commit...
git commit -m "%MSG%"

echo [CodeArena] Pushing to GitHub...
git push origin main

echo.
echo [CodeArena] Backup finished successfully!
pause
