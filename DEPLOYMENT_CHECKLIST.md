# MCLEGENDS.GG Deployment Checklist

## Pre-Deployment

### Environment Configuration
- [ ] Copy `.env.example` to `.env`
- [ ] Set strong `DB_PASSWORD`
- [ ] Set strong `REDIS_PASSWORD`
- [ ] Set strong `MINIO_PASSWORD`
- [ ] Generate secure `JWT_SECRET` (32+ characters)
- [ ] Generate secure `JWT_REFRESH_SECRET`
- [ ] Set unique `DAEMON_SECRET`
- [ ] Configure `APP_URL` with your domain
- [ ] Configure `API_URL` with your domain

### SSL/TLS Setup
- [ ] Obtain SSL certificate (Let's Encrypt recommended)
- [ ] Place certificates in `docker/nginx/ssl/`
- [ ] Update `docker/nginx/nginx.conf` with SSL config
- [ ] Update domain names in nginx config
- [ ] Test SSL configuration

### Security
- [ ] Change all default passwords
- [ ] Review firewall rules
- [ ] Configure rate limiting
- [ ] Set up fail2ban (optional)
- [ ] Enable audit logging
- [ ] Review CORS settings
- [ ] Disable debug mode in production

## Deployment

### Docker Compose
- [ ] Pull latest images: `docker-compose pull`
- [ ] Start services: `docker-compose up -d`
- [ ] Check service health: `docker-compose ps`
- [ ] View logs: `docker-compose logs -f`
- [ ] Test frontend access
- [ ] Test API access
- [ ] Test WebSocket connection

### Kubernetes
- [ ] Create namespace: `kubectl create namespace mclegends`
- [ ] Create secrets: `kubectl create secret generic mclegends-secrets`
- [ ] Apply deployment: `kubectl apply -f deploy/kubernetes/`
- [ ] Check pods: `kubectl get pods -n mclegends`
- [ ] Check services: `kubectl get svc -n mclegends`
- [ ] Configure ingress
- [ ] Test external access

## Post-Deployment

### Database
- [ ] Run migrations: `npm run migration:run`
- [ ] Seed initial data (optional)
- [ ] Create admin account
- [ ] Test database connection
- [ ] Set up automated backups

### Testing
- [ ] Test user registration
- [ ] Test user login
- [ ] Test 2FA setup
- [ ] Create test server
- [ ] Start/stop test server
- [ ] Test console output
- [ ] Test file management
- [ ] Test backup creation
- [ ] Test backup restoration
- [ ] Test analytics dashboard

### Monitoring
- [ ] Set up log aggregation
- [ ] Configure monitoring alerts
- [ ] Test health check endpoints
- [ ] Monitor resource usage
- [ ] Set up uptime monitoring
- [ ] Configure error tracking

### Backup Strategy
- [ ] Configure automated database backups
- [ ] Test backup restoration
- [ ] Set up off-site backup storage
- [ ] Document backup procedures
- [ ] Schedule regular backup tests

### Documentation
- [ ] Update README with production URLs
- [ ] Document custom configurations
- [ ] Create runbook for common issues
- [ ] Document backup/restore procedures
- [ ] Create user guide

## Maintenance

### Regular Tasks
- [ ] Monitor disk space
- [ ] Review logs weekly
- [ ] Update dependencies monthly
- [ ] Test backups monthly
- [ ] Review security settings
- [ ] Update SSL certificates (if needed)
- [ ] Clean up old backups
- [ ] Monitor performance metrics

### Updates
- [ ] Pull latest code: `git pull`
- [ ] Review CHANGELOG.md
- [ ] Backup database before update
- [ ] Build new images: `docker-compose build`
- [ ] Deploy: `docker-compose up -d`
- [ ] Run migrations if needed
- [ ] Test critical functionality
- [ ] Monitor for errors

## Rollback Plan

### If Deployment Fails
1. Stop new services: `docker-compose down`
2. Restore database from backup
3. Start previous version
4. Investigate logs
5. Fix issues
6. Retry deployment

### Emergency Contacts
- [ ] Document on-call contacts
- [ ] Set up incident response plan
- [ ] Create escalation procedures

## Performance Optimization

### After Initial Deployment
- [ ] Enable Redis caching
- [ ] Configure CDN for static assets
- [ ] Optimize database queries
- [ ] Enable gzip compression
- [ ] Configure connection pooling
- [ ] Set up load balancing (if needed)
- [ ] Monitor and tune resource limits

## Compliance

### Legal & Privacy
- [ ] Add privacy policy
- [ ] Add terms of service
- [ ] Configure GDPR compliance (if applicable)
- [ ] Set up data retention policies
- [ ] Document data handling procedures

## Success Criteria

- [ ] All services running and healthy
- [ ] Frontend accessible via HTTPS
- [ ] API responding correctly
- [ ] WebSocket connections working
- [ ] Users can register and login
- [ ] Servers can be created and managed
- [ ] Backups running automatically
- [ ] Monitoring and alerts active
- [ ] SSL certificate valid
- [ ] Performance acceptable

---

**Deployment Date**: _______________
**Deployed By**: _______________
**Version**: 1.0.0
**Status**: _______________
