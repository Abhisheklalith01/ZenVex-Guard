@echo off
echo ============================================================
echo   Pushing ZenVex Guard to https://github.com/Anand649/ZenVex.git
echo ============================================================
echo.
cd /d "%~dp0"
git remote add anand https://github.com/Anand649/ZenVex.git 2>nul
git remote set-url anand https://github.com/Anand649/ZenVex.git

echo Pushing to Anand's ZenVex repository (main branch)...
git push anand main

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ------------------------------------------------------------
    echo Normal push rejected because GitHub already had initial files.
    echo Force-pushing your complete ZenVex Guard project...
    echo ------------------------------------------------------------
    git push anand main --force
)

echo.
if %ERRORLEVEL% EQU 0 (
    echo ============================================================
    echo   SUCCESS! Pushed to https://github.com/Anand649/ZenVex.git
    echo ============================================================
) else (
    echo.
    echo Push failed. Please verify you have collaborator access or valid GitHub credentials.
    echo.
)
pause
