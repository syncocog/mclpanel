#!/bin/bash

# MCLegends Panel - VPS Deployment Script
# Run this script on your VPS after cloning the repository

set -e

echo "🚀 MCLegends Panel VPS Deployment"
echo "=================================="

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo "⚠️  Please run as root or with sudo"
    exit 1
fi

# Install Docker if not present
if ! command -v docker &> /dev/null; then
    echo "📦 Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
    usermod -aG docker $SUDO_USER
fi

# Install Docker Compose if not present
if ! command -v docker-compose &> /dev/null; then
    echo "📦 Installing Docker Compose..."
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
fi

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚙️  Creating .env file..."
    cp .env.example .env
    
    # Generate random passwords
    DB_PASSWORD=$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-25)
    JWT_SECRET=$(openssl rand -base64 32)
    
    # Update .env file
    sed -i "s/POSTGRES_PASSWORD=.*/POSTGRES_PASSWORD=$DB_PASSWORD/" .env
    sed -i "s|DATABASE_URL=.*|DATABASE_URL=postgresql://mcpanel:$DB_PASSWORD@postgres:5432/mcpanel|" .env
    sed -i "s/JWT_SECRET=.*/JWT_SECRET=$JWT_SECRET/" .env
    
    echo "✅ Environment file created with secure passwords"
    echo "⚠️  Please edit .env and update NEXT_PUBLIC_API_URL with your domain/IP"
fi

# Setup firewall
echo "🔒 Configuring firewall..."
ufw --force enable
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 3000/tcp
ufw allow 3001/tcp
ufw allow 25565:25600/tcp

# Build and start services
echo "🏗️  Building and starting services..."
docker-compose down -v 2>/dev/null || true
docker-compose up -d --build

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Check service status
echo ""
echo "📊 Service Status:"
docker-compose ps

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📝 Next steps:"
echo "1. Edit .env and update NEXT_PUBLIC_API_URL"
echo "2. Restart services: docker-compose restart"
echo "3. Access panel at http://your-server-ip:3000"
echo "4. Create your admin account via registration"
echo ""
echo "📖 For SSL setup and domain configuration, see VPS_DEPLOYMENT.md"
echo ""
echo "🔍 View logs: docker-compose logs -f"
