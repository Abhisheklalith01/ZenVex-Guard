@echo off
echo ============================================================
echo   ZENVEX GUARD - Digital Threat Intelligence Platform
echo   Tagline: Detect. Analyse. Protect.
echo ============================================================
echo.
echo Launching ZenVex Guard Server on http://127.0.0.1:8000 ...
echo (Serving both FastAPI Threat APIs and React Production Dashboard)
echo.
cd /d "%~dp0backend"
set PYTHONPATH=%~dp0backend
"%LOCALAPPDATA%\Programs\Python\Python312\python.exe" -m uvicorn app.main:app --host 127.0.0.1 --port 8000
pause
