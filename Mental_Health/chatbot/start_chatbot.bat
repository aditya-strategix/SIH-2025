@echo off
echo Starting Mental Health Chatbot Server...
echo.

echo Checking Python installation...
python --version
if errorlevel 1 (
    echo Python is not installed or not in PATH
    pause
    exit /b 1
)

echo.
echo Installing required packages...
pip install flask flask-cors tensorflow nltk numpy pickle-mixin

echo.
echo Downloading NLTK data...
python -c "import nltk; nltk.download('punkt'); nltk.download('wordnet')"

echo.
echo Starting chatbot server on http://localhost:5001
echo Press Ctrl+C to stop the server
echo.

python app.py

pause