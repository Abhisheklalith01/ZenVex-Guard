@echo off
echo ============================================================
echo   Pushing ZenVex Guard to https://github.com/Anand649/CivicLens.git
echo ============================================================
echo.
cd /d "%~dp0"
git remote set-url origin https://github.com/Anand649/CivicLens.git
git branch -M main
echo Pushing to GitHub...
git push -u origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo ============================================================
    echo   SUCCESS! Pushed to https://github.com/Anand649/CivicLens.git
    echo ============================================================
) else (
    echo.
    echo If GitHub rejected because the remote repository already has commits (e.g. README/license),
    echo run this to force-push your fresh project:
    echo     git push -u origin main --force
    echo.
)
pause
