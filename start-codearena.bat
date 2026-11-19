@echo off
cd /d "%~dp0"
if not exist package.json (
  echo ERROR: package.json was not found. Open this script from the codearena-frontend project folder.
  pause
  exit /b 1
)
if not exist node_modules (
  echo Installing CodeArena dependencies for the first run...
  call npm.cmd install
  if errorlevel 1 goto :error
)
call npm.cmd run dev
if errorlevel 1 goto :error
exit /b 0
:error
echo.
echo CodeArena did not start. Review the error above.
pause
