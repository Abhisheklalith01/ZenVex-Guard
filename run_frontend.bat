@echo off
echo ============================================================
echo   Starting ZenVex Guard Frontend Dev Server (Vite)
echo   Tagline: Detect. Analyse. Protect.
echo ============================================================
cd /d "%~dp0frontend"
set PATH=%LOCALAPPDATA%\Programs\NodeJS\node-v20.18.1-win-x64;%PATH%
call npm run dev
pause
