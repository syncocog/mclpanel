# MCLEGENDS.GG API Documentation

Base URL: `http://localhost:4000/api`

## Authentication

All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "username",
  "password": "password123"
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "twoFactorCode": "123456" // Optional
}
```

Response:
```json
{
  "access_token": "jwt_token_here",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "username",
    "role": "user"
  }
}
```

## Servers

### List Servers
```http
GET /servers
Authorization: Bearer <token>
```

### Create Server
```http
POST /servers
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "My Server",
  "type": "minecraft",
  "resources": {
    "memory": 4096,
    "cpu": 200,
    "disk": 10240
  },
  "ports": {
    "game": 25565,
    "query": 25575
  },
  "minecraftConfig": {
    "version": "1.20.4",
    "serverType": "PAPER"
  }
}
```

### Server Actions
```http
POST /servers/:id/start
POST /servers/:id/stop
POST /servers/:id/restart
Authorization: Bearer <token>
```

### Send Command
```http
POST /servers/:id/command
Authorization: Bearer <token>
Content-Type: application/json

{
  "command": "say Hello World"
}
```

## Minecraft Features

### Whitelist Management
```http
POST /minecraft/:serverId/whitelist
{
  "playerName": "Steve"
}

DELETE /minecraft/:serverId/whitelist/:playerName
```

### Ban Management
```http
POST /minecraft/:serverId/ban
{
  "playerName": "Griefer",
  "reason": "Griefing"
}

DELETE /minecraft/:serverId/ban/:playerName
```

### Get Server Stats
```http
GET /minecraft/:serverId/tps
GET /minecraft/:serverId/players
```

## Backups

### Create Backup
```http
POST /backups/server/:serverId
Authorization: Bearer <token>
```

### List Backups
```http
GET /backups/server/:serverId
Authorization: Bearer <token>
```

### Restore Backup
```http
POST /backups/restore/:serverId/:backupId
Authorization: Bearer <token>
```

## Analytics

### Get Server Metrics
```http
GET /analytics/server/:serverId/metrics?identifier=srv_xxx
Authorization: Bearer <token>
```

Response:
```json
{
  "cpu": 25.5,
  "memory": 2048,
  "disk": 5120,
  "network": {
    "rx": 1024000,
    "tx": 512000
  },
  "uptime": 3600,
  "players": 5,
  "tps": 20.0
}
```

## WebSocket Events

Connect to: `ws://localhost:4000`

### Subscribe to Server
```javascript
socket.emit('subscribe-server', serverId)
```

### Events
- `server-status` - Server status changes
- `console-output` - Real-time console output
- `server-metrics` - Real-time metrics
- `notification` - User notifications
