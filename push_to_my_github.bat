@echo off
echo ============================================================
echo   Pushing ZenVex Guard to https://github.com/Abhisheklalith01/ZenVex-Guard.git
echo ============================================================
echo.
cd /d "%~dp0"
git remote set-url origin https://github.com/Abhisheklalith01/ZenVex-Guard.git
git branch -M main

echo Attempting push to main branch...
git push -u origin main

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ------------------------------------------------------------
    echo Normal push rejected because GitHub already had initial files.
    echo Force-pushing your complete ZenVex Guard project...
    echo ------------------------------------------------------------
    git push -u origin main --force
)

echo.
if %ERRORLEVEL% EQU 0 (
    echo ============================================================
    echo   SUCCESS! Pushed to https://github.com/Abhisheklalith01/ZenVex-Guard.git
    echo ============================================================
) else (
    echo.
    echo Push failed. Please verify you are logged into GitHub in your browser.
    echo.
)
pause
