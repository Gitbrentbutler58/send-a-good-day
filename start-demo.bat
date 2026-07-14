@echo off
rem Double-click to demo "Send a Good Day" locally.
rem Leave this window open while demoing; close it to stop.
cd /d "%~dp0"
start "" http://localhost:8099/
python -m http.server 8099
