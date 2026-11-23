@echo off
echo ============================================================
echo   Starting ZenVex Guard API Server (FastAPI + Uvicorn)
echo   Tagline: Detect. Analyse. Protect.
echo ============================================================
cd /d "%~dp0backend"
set PYTHONPATH=%~dp0backend
"%LOCALAPPDATA%\Programs\Python\Python312\python.exe" -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
pause
