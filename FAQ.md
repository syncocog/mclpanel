# MCLEGENDS.GG - Frequently Asked Questions

## General

### What is MCLEGENDS.GG?
MCLEGENDS.GG is a self-hosted game server management panel with full Pterodactyl parity plus Minecraft-specific features and a futuristic UI.

### Is it free?
Yes, MCLEGENDS.GG is open-source under the MIT License. You can use, modify, and distribute it freely.

### What games does it support?
Currently optimized for Minecraft servers, but the architecture supports any Docker-based game server.

### What are the system requirements?
- 4GB+ RAM
- 2+ CPU cores
- 20GB+ disk space
- Docker & Docker Compose
- Linux/Windows/macOS

## Installation

### How do I install it?
```bash
git clone https://github.com/yourusername/mclegends-gg.git
cd mclegends-gg
cp .env.example .env
docker-compose up -d
```
See [QUICKSTART.md](QUICKSTART.md) for details.

### Can I install without Docker?
Yes, but Docker is recommended. See [SETUP.md](SETUP.md) for manual installation.

### What ports does it use?
- 3000: Frontend
- 4000: Backend API
- 8080: Daemon
- 5432: PostgreSQL
- 6379: Redis
- 9000/9001: MinIO

### How do I change the ports?
Edit `docker-compose.yml` and update the port mappings.

## Configuration

### Where do I configure settings?
Edit the `.env` file in the root directory.

### How do I enable SSL?
1. Obtain SSL certificate
2. Place in `docker/nginx/ssl/`
3. Update `docker/nginx/nginx.conf`
4. Restart nginx: `docker-compose restart nginx`

### How do I change the admin password?
Login and go to Settings > Change Password, or update directly in database.

### Can I use external database?
Yes, update `DATABASE_URL` in `.env` to point to your database.

## Usage

### How do I create a server?
1. Login to dashboard
2. Click "Create Server"
3. Fill in details
4. Click "Create"

### How do I start a server?
Click the "Start" button on the server card in the dashboard.

### How do I access the console?
Click on a server to view details, console is displayed in real-time.

### How do I upload files?
Use the file manager in the server details page (feature structure ready).

### How do I create backups?
Backups run automatically daily at 3 AM. Manual backups via API or UI.

## Minecraft Features

### How do I add players to whitelist?
Go to server details > Minecraft > Whitelist > Add Player

### How do I ban a player?
Go to server details > Minecraft > Ban Player

### How do I install plugins?
Upload plugins via file manager to the `plugins/` directory.

### How do I change Minecraft version?
Edit server settings and update the version field, then restart.

### What server types are supported?
- Vanilla
- Spigot
- Paper
- Forge
- Fabric

## Troubleshooting

### Services won't start
```bash
docker-compose down -v
docker-compose up -d
docker-compose logs -f
```

### Can't login
- Check backend logs: `docker-compose logs backend`
- Verify database is running: `docker-compose ps`
- Reset password via database

### Server won't start
- Check daemon logs: `docker-compose logs daemon`
- Verify Docker socket is accessible
- Check server resource limits

### WebSocket not connecting
- Check firewall rules
- Verify nginx configuration
- Check backend WebSocket gateway

### Database connection failed
- Verify PostgreSQL is running
- Check DATABASE_URL in .env
- Check database credentials

### Out of disk space
- Clean up old backups
- Remove unused Docker images: `docker system prune`
- Increase disk allocation

## Performance

### How many servers can I run?
Depends on your hardware. Each server needs resources based on game type.

### How do I optimize performance?
- Enable Redis caching
- Use SSD storage
- Increase RAM allocation
- Use CDN for static assets
- Enable connection pooling

### Can I scale horizontally?
Yes, use Kubernetes deployment for multi-node scaling.

## Security

### Is it secure?
Yes, with proper configuration:
- JWT authentication
- 2FA support
- Rate limiting
- Docker isolation
- Input validation

### How do I enable 2FA?
Login > Settings > Security > Enable 2FA

### How do I backup data?
Automated backups run daily. Manual: `docker exec mclegends-postgres pg_dump`

### How do I update?
```bash
git pull
docker-compose pull
docker-compose up -d
```

## Development

### How do I contribute?
See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### How do I run in development mode?
```bash
cd backend && npm run start:dev
cd frontend && npm run dev
cd daemon && go run main.go
```

### How do I add a new feature?
1. Fork repository
2. Create feature branch
3. Implement feature
4. Add tests
5. Submit pull request

### Where is the API documentation?
See [API.md](API.md) for complete API reference.

## Support

### Where do I get help?
- GitHub Issues
- Discord Community
- Documentation

### How do I report a bug?
Open an issue on GitHub with:
- Description
- Steps to reproduce
- Expected vs actual behavior
- Logs

### Is there commercial support?
Community support is available. For commercial support, contact the maintainers.

## Licensing

### Can I use this commercially?
Yes, MIT License allows commercial use.

### Can I modify the code?
Yes, you can modify and distribute under MIT License.

### Do I need to credit the project?
Not required, but appreciated!

## Roadmap

### What's coming next?
- AI-driven optimization
- Voice commands
- Plugin marketplace
- 3D world visualization
- Advanced analytics
- Multi-language support

### Can I request features?
Yes! Open a feature request on GitHub.

---

**Still have questions?** Open an issue on GitHub or join our Discord!
