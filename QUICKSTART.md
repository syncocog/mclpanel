# MCLEGENDS.GG Quick Start

## 🚀 5-Minute Setup

### Prerequisites
- Docker & Docker Compose installed
- 4GB+ RAM available
- Ports 3000, 4000, 8080 available

### Installation

**Windows:**
```cmd
git clone https://github.com/yourusername/mclegends-gg.git
cd mclegends-gg
copy .env.example .env
start.bat
```

**Linux/Mac:**
```bash
git clone https://github.com/yourusername/mclegends-gg.git
cd mclegends-gg
cp .env.example .env
chmod +x start.sh
./start.sh
```

### Access

- **Frontend**: http://localhost:3000
- **API**: http://localhost:4000
- **MinIO**: http://localhost:9001

### Default Login

```
Email: admin@mclegends.gg
Password: Admin123!
```

## 📋 First Steps

1. **Login** with default credentials
2. **Create Server** - Click "Create Server" button
3. **Configure** - Set name, resources, port
4. **Start** - Click start button on server card
5. **Manage** - View console, send commands, check metrics

## 🎮 Create Minecraft Server

```
Name: My Survival Server
Type: Minecraft
Memory: 4096 MB
CPU: 200%
Port: 25565
Version: 1.20.4
Server Type: PAPER
```

## 🔧 Common Commands

```bash
# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Stop all
docker-compose down

# Update images
docker-compose pull
docker-compose up -d
```

## 📚 Documentation

- [Full Setup Guide](SETUP.md)
- [API Documentation](API.md)
- [Architecture](ARCHITECTURE.md)
- [Features List](FEATURES.md)
- [Testing Guide](TESTING.md)

## 🆘 Troubleshooting

**Services won't start:**
```bash
docker-compose down -v
docker-compose up -d
```

**Can't login:**
- Check backend logs: `docker-compose logs backend`
- Verify database is running: `docker-compose ps`

**Port conflicts:**
- Edit `docker-compose.yml` to change ports
- Restart: `docker-compose up -d`

## 🎯 Next Steps

1. Change default passwords in `.env`
2. Configure SSL for production
3. Set up automated backups
4. Enable 2FA for admin account
5. Create additional users
6. Deploy your first game server

## 💡 Tips

- Use strong passwords in production
- Enable 2FA for security
- Regular backups recommended
- Monitor resource usage
- Check logs for issues
- Join Discord for support

## 🌟 Features to Explore

- Real-time console
- Server metrics dashboard
- Whitelist/ban management
- Automated backups
- Player analytics
- Plugin management
- Server templates

---

**Need Help?** Check [SETUP.md](SETUP.md) or open an issue on GitHub.
