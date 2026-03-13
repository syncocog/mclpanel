# MCLEGENDS.GG Daemon

Lightweight Go-based daemon for Docker container management.

## Features

- Docker container lifecycle management
- Real-time console streaming via WebSocket
- Resource monitoring and statistics
- Secure API with bearer token authentication
- Cross-platform support

## Setup

```bash
# Install dependencies
go mod download

# Build
go build -o daemon main.go

# Run
./daemon
```

## Environment Variables

- `DAEMON_PORT` - Port to listen on (default: 8080)
- `DAEMON_SECRET` - Secret key for authentication
- `API_URL` - Backend API URL

## API Endpoints

### Server Management
- POST `/servers` - Create server container
- POST `/servers/:id/start` - Start server
- POST `/servers/:id/stop` - Stop server
- DELETE `/servers/:id` - Delete server
- POST `/servers/:id/command` - Send command to server

### Monitoring
- GET `/servers/:id/stats` - Get server statistics
- GET `/servers/:id/logs` - Get server logs
- GET `/servers/:id/console` - WebSocket console stream

## Docker Integration

The daemon communicates with Docker via the Docker socket:
- Creates containers from specified images
- Manages container lifecycle
- Monitors resource usage
- Streams logs in real-time

## Security

- Bearer token authentication required for all endpoints
- Docker socket access restricted
- Container isolation enforced
- Resource limits applied per server
