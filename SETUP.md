# MCLEGENDS.GG Setup Guide

Complete setup guide for deploying MCLEGENDS.GG panel.

## Prerequisites

- Docker & Docker Compose
- Node.js 20+ (for local development)
- Go 1.21+ (for daemon development)
- PostgreSQL 15+
- Redis 7+
- MinIO or S3-compatible storage

## Quick Start (Docker)

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mclegends-gg.git
cd mclegends-gg
```

2. Configure environment:
```bash
cp .env.example .env
# Edit .env with your secure passwords and secrets
```

3. Start all services:
```bash
docker-compose up -d
```

4. Access the panel:
- Frontend: http://localhost:3000
- API: http://localhost:4000
- MinIO Console: http://localhost:9001

5. Default admin account:
- Email: admin@mclegends.gg
- Password: Admin123!

## Manual Setup

### Backend

```bash
cd backend
npm install
cp ../.env.example .env
npm run migration:run
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:4000/api" > .env.local
npm run dev
```

### Daemon

```bash
cd daemon
go mod download
go build -o daemon main.go
./daemon
```

## Production Deployment

### Using Docker Compose

1. Update environment variables in `.env`
2. Configure SSL certificates in `docker/nginx/ssl/`
3. Update `docker/nginx/nginx.conf` with your domain
4. Deploy:
```bash
docker-compose -f docker-compose.yml up -d
```

### Using Kubernetes

1. Create secrets:
```bash
kubectl create secret generic mclegends-secrets \
  --from-literal=db-password=YOUR_PASSWORD \
  --from-literal=jwt-secret=YOUR_JWT_SECRET \
  --from-literal=database-url=postgresql://...
```

2. Deploy:
```bash
kubectl apply -f deploy/kubernetes/deployment.yaml
```

## SSL Configuration

### Let's Encrypt (Certbot)

```bash
# Install certbot
apt-get install certbot

# Generate certificate
certbot certonly --standalone -d yourdomain.com

# Copy certificates
cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem docker/nginx/ssl/
cp /etc/letsencrypt/live/yourdomain.com/privkey.pem docker/nginx/ssl/

# Restart nginx
docker-compose restart nginx
```

## Database Migration

```bash
cd backend
npm run migration:generate -- -n MigrationName
npm run migration:run
```

## Backup Configuration

Automatic backups run daily at 3 AM. Configure in:
- `backend/src/backups/backups.service.ts`

Manual backup:
```bash
docker exec mclegends-postgres pg_dump -U mclegends mclegends > backup.sql
```

## Monitoring

### Logs

```bash
# View all logs
docker-compose logs -f

# View specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f daemon
```

### Health Checks

- Backend: http://localhost:4000/api/health
- Frontend: http://localhost:3000
- Daemon: http://localhost:8080/health

## Troubleshooting

### Database connection issues
```bash
docker-compose restart postgres
docker-compose logs postgres
```

### Frontend not loading
```bash
docker-compose restart frontend
docker-compose logs frontend
```

### Daemon not connecting
- Check DAEMON_SECRET matches in backend and daemon
- Verify Docker socket is mounted correctly
- Check daemon logs: `docker-compose logs daemon`

## Security Checklist

- [ ] Change all default passwords in `.env`
- [ ] Generate strong JWT_SECRET
- [ ] Configure SSL certificates
- [ ] Enable firewall rules
- [ ] Set up regular backups
- [ ] Enable 2FA for admin accounts
- [ ] Review and update CORS settings
- [ ] Configure rate limiting
- [ ] Set up monitoring and alerts

## Performance Optimization

1. Enable Redis caching
2. Configure CDN for static assets
3. Optimize database indexes
4. Enable gzip compression in nginx
5. Use connection pooling
6. Scale horizontally with Kubernetes

## Support

- Documentation: https://docs.mclegends.gg
- Issues: https://github.com/yourusername/mclegends-gg/issues
- Discord: https://discord.gg/mclegends
