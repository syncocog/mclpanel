# MCLEGENDS.GG 🎮

**Next-Generation Game Server Management Panel**

A fully self-hosted, open-source game server management platform with Minecraft-specific enhancements and a futuristic UI.

## 🚀 Features

- **Full Pterodactyl Parity**: Server creation, Docker-based control, user/admin permissions
- **Minecraft Enhancements**: Modpack/plugin management, whitelist/ban GUI, automatic backups
- **Advanced Analytics**: TPS monitoring, player tracking, network latency, resource usage
- **Futuristic UI**: Neon theme, 3D graphs, smooth animations, responsive design
- **Real-time Updates**: WebSocket-powered console, metrics, and notifications

## 🛠️ Tech Stack

- **Backend**: NestJS (Node.js) + PostgreSQL + Redis
- **Daemon**: Go-based lightweight server controller
- **Frontend**: Next.js + React + Tailwind CSS + Framer Motion + Three.js
- **Real-time**: Socket.IO for live updates
- **Storage**: MinIO-compatible S3 storage
- **Security**: JWT + OAuth2 + 2FA support

## 📦 Quick Start

```bash
# Clone repository
git clone https://github.com/yourusername/mclegends-gg.git
cd mclegends-gg

# Start all services with Docker Compose
docker-compose up -d

# Access the panel
# Frontend: http://localhost:3000
# API: http://localhost:4000
# Default admin: admin@mclegends.gg / Admin123!
```

## 🏗️ Architecture

```
mclegends-gg/
├── backend/          # NestJS API server
├── frontend/         # Next.js web interface
├── daemon/           # Go server controller
├── docker/           # Docker configurations
└── deploy/           # Kubernetes & CI/CD configs
```

## 📚 Documentation

See individual service READMEs:
- [Backend API](./backend/README.md)
- [Frontend](./frontend/README.md)
- [Daemon](./daemon/README.md)

## 🔒 Security

- JWT authentication with refresh tokens
- Role-based access control (RBAC)
- Rate limiting and DDoS protection
- Docker container isolation
- Audit logging for security events

## 📄 License

MIT License - See LICENSE file for details
