#!/bin/bash

echo "🚀 Starting MCLEGENDS.GG Panel..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from example..."
    cp .env.example .env
    echo "✅ Please edit .env with your configuration before continuing."
    exit 1
fi

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Pull latest images
echo "📦 Pulling Docker images..."
docker-compose pull

# Start services
echo "🔧 Starting services..."
docker-compose up -d

# Wait for services to be healthy
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check service status
echo "📊 Service Status:"
docker-compose ps

echo ""
echo "✅ MCLEGENDS.GG is now running!"
echo ""
echo "🌐 Access URLs:"
echo "   Frontend: http://localhost:3000"
echo "   API: http://localhost:4000"
echo "   MinIO Console: http://localhost:9001"
echo ""
echo "🔑 Default Credentials:"
echo "   Email: admin@mclegends.gg"
echo "   Password: Admin123!"
echo ""
echo "📝 View logs: docker-compose logs -f"
echo "🛑 Stop services: docker-compose down"
