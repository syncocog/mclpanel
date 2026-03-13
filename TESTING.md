# Testing Guide

## Quick Test

After starting the services, test the complete flow:

### 1. Access Frontend
```
http://localhost:3000
```

### 2. Register Account
- Click "Register"
- Email: test@example.com
- Username: testuser
- Password: Test123!

### 3. Login
- Use credentials from registration
- Should redirect to dashboard

### 4. Create Server
- Click "Create Server"
- Name: Test Server
- Type: Minecraft
- Memory: 2048 MB
- CPU: 100%
- Port: 25565

### 5. Manage Server
- Start server
- View console output
- Send commands
- Check metrics

### 6. Test Minecraft Features
- Add player to whitelist
- Ban/unban player
- View TPS
- Check player list

## API Testing

### Using cURL

```bash
# Register
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","username":"test","password":"Test123!"}'

# Login
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}'

# List servers (replace TOKEN)
curl http://localhost:4000/api/servers \
  -H "Authorization: Bearer TOKEN"
```

## WebSocket Testing

```javascript
const io = require('socket.io-client');
const socket = io('http://localhost:4000');

socket.on('connect', () => {
  console.log('Connected');
  socket.emit('subscribe-server', 1);
});

socket.on('server-status', (data) => {
  console.log('Status:', data);
});

socket.on('console-output', (data) => {
  console.log('Console:', data);
});
```

## Load Testing

```bash
# Install Apache Bench
apt-get install apache2-utils

# Test API endpoint
ab -n 1000 -c 10 http://localhost:4000/api/servers
```

## Automated Tests

### Backend
```bash
cd backend
npm test
```

### Frontend
```bash
cd frontend
npm test
```

## Troubleshooting Tests

### Database Connection
```bash
docker exec -it mclegends-postgres psql -U mclegends -d mclegends
```

### Redis Connection
```bash
docker exec -it mclegends-redis redis-cli
AUTH redis_secure_pass
PING
```

### MinIO Access
```bash
# Access MinIO console
http://localhost:9001
# Login: mclegends / mclegends_minio_pass
```

### Check Logs
```bash
docker-compose logs backend
docker-compose logs frontend
docker-compose logs daemon
```
