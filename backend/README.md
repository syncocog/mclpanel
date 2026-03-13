# MCLEGENDS.GG Backend

NestJS-based REST API for game server management.

## Features

- JWT authentication with 2FA support
- PostgreSQL database with TypeORM
- Redis caching and real-time events
- WebSocket support via Socket.IO
- MinIO S3-compatible storage
- Docker daemon communication
- Minecraft-specific features

## Setup

```bash
# Install dependencies
npm install

# Configure environment
cp ../.env.example .env

# Run migrations
npm run migration:run

# Start development server
npm run start:dev

# Build for production
npm run build
npm run start:prod
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login
- GET `/api/auth/profile` - Get user profile
- POST `/api/auth/2fa/enable` - Enable 2FA
- POST `/api/auth/2fa/verify` - Verify 2FA

### Servers
- GET `/api/servers` - List servers
- POST `/api/servers` - Create server
- GET `/api/servers/:id` - Get server details
- PATCH `/api/servers/:id` - Update server
- DELETE `/api/servers/:id` - Delete server
- POST `/api/servers/:id/start` - Start server
- POST `/api/servers/:id/stop` - Stop server
- POST `/api/servers/:id/restart` - Restart server
- POST `/api/servers/:id/command` - Send command

### Minecraft
- POST `/api/minecraft/:serverId/whitelist` - Add to whitelist
- DELETE `/api/minecraft/:serverId/whitelist/:player` - Remove from whitelist
- POST `/api/minecraft/:serverId/ban` - Ban player
- DELETE `/api/minecraft/:serverId/ban/:player` - Unban player
- GET `/api/minecraft/:serverId/players` - Get online players
- GET `/api/minecraft/:serverId/tps` - Get server TPS

### Backups
- POST `/api/backups/server/:serverId` - Create backup
- GET `/api/backups/server/:serverId` - List backups
- POST `/api/backups/restore/:serverId/:backupId` - Restore backup
- DELETE `/api/backups/:backupId` - Delete backup

### Analytics
- GET `/api/analytics/server/:serverId/metrics` - Get server metrics
- GET `/api/analytics/server/:serverId/history` - Get historical data
- GET `/api/analytics/server/:serverId/players` - Get player activity

## WebSocket Events

- `subscribe-server` - Subscribe to server updates
- `server-status` - Server status changes
- `console-output` - Real-time console output
- `server-metrics` - Real-time metrics
- `notification` - User notifications
