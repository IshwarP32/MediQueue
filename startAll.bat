@echo off

REM Open admin
start powershell -NoExit -Command "cd './admin'; npm run dev"

REM Open frontend
start powershell -NoExit -Command "cd './frontend'; npm run dev"

REM Open backend
start powershell -NoExit -Command "cd './backend'; npm run dev"
