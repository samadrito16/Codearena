@echo off
echo Starting PrismCode...
cd /d "%~dp0"
if not exist "package.json" (
  echo ERROR: package.json was not found. Open this script from the prismcode-frontend project folder.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo Installing PrismCode dependencies for the first run...
  call npm install
  if errorlevel 1 (
    echo Failed to install dependencies.
    pause
    exit /b 1
  )
)

call npm run dev
if errorlevel 1 (
  echo PrismCode did not start. Review the error above.
  pause
)
