@echo off
echo Starting MCLEGENDS.GG Panel...

if not exist .env (
    echo .env file not found. Creating from example...
    copy .env.example .env
    echo Please edit .env with your configuration before continuing.
    pause
    exit /b 1
)

echo Pulling Docker images...
docker-compose pull

echo Starting services...
docker-compose up -d

echo Waiting for services to be ready...
timeout /t 10 /nobreak > nul

echo Service Status:
docker-compose ps

echo.
echo MCLEGENDS.GG is now running!
echo.
echo Access URLs:
echo    Frontend: http://localhost:3000
echo    API: http://localhost:4000
echo    MinIO Console: http://localhost:9001
echo.
echo Default Credentials:
echo    Email: admin@mclegends.gg
echo    Password: Admin123!
echo.
echo View logs: docker-compose logs -f
echo Stop services: docker-compose down
pause
