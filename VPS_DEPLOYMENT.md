# VPS Deployment Guide for MCLegends Panel

## Prerequisites

1. VPS with Ubuntu 20.04+ or similar Linux distribution
2. Root or sudo access
3. Domain name (optional but recommended)
4. Minimum 4GB RAM, 2 CPU cores, 50GB storage

## Step 1: Initial VPS Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installations
docker --version
docker-compose --version
```

## Step 2: Clone Repository

```bash
# Create directory
mkdir -p /opt/mclpanel
cd /opt/mclpanel

# Clone from GitHub (after you push)
git clone https://github.com/syncocog/mclpanelAll.git .
```

## Step 3: Configure Environment

```bash
# Copy environment template
cp .env.example .env

# Edit environment variables
nano .env
```

Update these critical values in `.env`:

```env
# Database
POSTGRES_PASSWORD=your_secure_password_here
DATABASE_URL=postgresql://mcpanel:your_secure_password_here@postgres:5432/mcpanel

# JWT Secret (generate with: openssl rand -base64 32)
JWT_SECRET=your_jwt_secret_here

# Frontend URL (your domain or VPS IP)
NEXT_PUBLIC_API_URL=http://your-vps-ip:3001

# Production mode
NODE_ENV=production
```

## Step 4: Setup Firewall

```bash
# Allow SSH, HTTP, HTTPS, and Minecraft ports
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 3000/tcp  # Frontend
sudo ufw allow 3001/tcp  # Backend API
sudo ufw allow 25565:25600/tcp  # Minecraft servers
sudo ufw enable
```

## Step 5: Deploy with Docker Compose

```bash
# Build and start services
docker-compose up -d --build

# Check logs
docker-compose logs -f

# Verify all services are running
docker-compose ps
```

## Step 6: Initialize Database

```bash
# The database will auto-initialize on first run
# Check backend logs to confirm
docker-compose logs backend
```

## Step 7: Setup Nginx Reverse Proxy (Optional but Recommended)

```bash
# Install Nginx
sudo apt install nginx -y

# Create config
sudo nano /etc/nginx/sites-available/mclpanel
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # WebSocket
    location /socket.io {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/mclpanel /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Step 8: Setup SSL with Let's Encrypt (Recommended)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal is configured automatically
```

## Step 9: Create First Admin User

Access your panel at `http://your-vps-ip:3000` or `https://your-domain.com`

1. Click "Register"
2. Create your admin account
3. You can promote users to admin via database if needed:

```bash
docker-compose exec postgres psql -U mcpanel -d mcpanel
UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
\q
```

## Maintenance Commands

```bash
# View logs
docker-compose logs -f [service_name]

# Restart services
docker-compose restart

# Stop services
docker-compose down

# Update application
git pull
docker-compose up -d --build

# Backup database
docker-compose exec postgres pg_dump -U mcpanel mcpanel > backup_$(date +%Y%m%d).sql

# Restore database
docker-compose exec -T postgres psql -U mcpanel mcpanel < backup_file.sql
```

## Monitoring

```bash
# Check resource usage
docker stats

# Check disk space
df -h

# Check service status
docker-compose ps
```

## Troubleshooting

### Services won't start
```bash
docker-compose logs
docker-compose down -v
docker-compose up -d --build
```

### Database connection issues
```bash
# Check if postgres is running
docker-compose ps postgres

# Check database logs
docker-compose logs postgres

# Verify DATABASE_URL in .env matches POSTGRES_PASSWORD
```

### Port conflicts
```bash
# Check what's using a port
sudo netstat -tulpn | grep :3000
sudo lsof -i :3000

# Kill process if needed
sudo kill -9 <PID>
```

## Security Recommendations

1. Change all default passwords
2. Use strong JWT_SECRET
3. Enable firewall (ufw)
4. Setup SSL certificates
5. Regular backups
6. Keep Docker images updated
7. Monitor logs for suspicious activity
8. Use non-root database user
9. Implement rate limiting
10. Regular security updates: `sudo apt update && sudo apt upgrade`

## Performance Optimization

1. Allocate sufficient resources to Docker
2. Use SSD storage for database
3. Enable Docker logging limits in docker-compose.yml
4. Monitor resource usage regularly
5. Scale horizontally if needed

## Support

For issues, check:
- Application logs: `docker-compose logs`
- System logs: `journalctl -xe`
- Docker status: `docker ps -a`
- Network: `docker network ls`

---

Your MCLegends Panel is now deployed and ready for production use!
