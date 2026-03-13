# MCLEGENDS.GG Architecture

## System Overview

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Frontend  │─────▶│   Nginx     │─────▶│   Backend   │
│  (Next.js)  │      │   Proxy     │      │  (NestJS)   │
└─────────────┘      └─────────────┘      └──────┬──────┘
                                                  │
                     ┌────────────────────────────┼────────────┐
                     │                            │            │
              ┌──────▼──────┐            ┌───────▼──────┐ ┌──▼────┐
              │  PostgreSQL │            │    Redis     │ │ MinIO │
              │  Database   │            │    Cache     │ │  S3   │
              └─────────────┘            └──────────────┘ └───────┘
                                                  │
                                         ┌────────▼────────┐
                                         │     Daemon      │
                                         │      (Go)       │
                                         └────────┬────────┘
                                                  │
                                         ┌────────▼────────┐
                                         │  Docker Engine  │
                                         │   (Containers)  │
                                         └─────────────────┘
```

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Graphics**: Three.js, React Three Fiber
- **Charts**: Recharts
- **State**: Zustand
- **HTTP**: Axios
- **WebSocket**: Socket.IO Client

### Backend
- **Framework**: NestJS (Node.js)
- **Database**: PostgreSQL 15 + TypeORM
- **Cache**: Redis 7
- **Authentication**: JWT + Passport
- **WebSocket**: Socket.IO
- **Storage**: MinIO (S3-compatible)
- **Scheduling**: @nestjs/schedule
- **Rate Limiting**: @nestjs/throttler

### Daemon
- **Language**: Go 1.21
- **Framework**: Gin
- **Docker**: Docker SDK
- **WebSocket**: Gorilla WebSocket

### Infrastructure
- **Containerization**: Docker
- **Orchestration**: Docker Compose / Kubernetes
- **Reverse Proxy**: Nginx
- **SSL**: Let's Encrypt
- **CI/CD**: GitHub Actions

## Data Flow

### Server Creation
1. User submits server creation form (Frontend)
2. Frontend sends POST to `/api/servers` (Backend)
3. Backend creates database record
4. Backend calls Daemon API to create Docker container
5. Daemon creates and configures container
6. Backend updates server status
7. WebSocket notifies frontend of status change

### Real-time Console
1. Frontend connects to WebSocket
2. Frontend subscribes to server channel
3. Daemon streams container logs
4. Backend forwards to WebSocket
5. Frontend displays in terminal component

### Metrics Collection
1. Daemon monitors container stats
2. Backend polls daemon every 30 seconds
3. Stats stored in Redis with TTL
4. Frontend requests metrics via API
5. Charts updated in real-time

## Security Architecture

### Authentication Flow
1. User logs in with email/password
2. Backend validates credentials
3. If 2FA enabled, verify TOTP code
4. Generate JWT token (24h expiry)
5. Frontend stores token in localStorage
6. Token sent in Authorization header

### Authorization
- Role-based access control (RBAC)
- Admin: Full access
- User: Own servers only
- JWT payload contains user ID and role

### API Security
- Rate limiting: 100 requests/minute
- CORS configured for frontend domain
- Helmet.js security headers
- Input validation with class-validator
- SQL injection prevention via TypeORM

### Daemon Security
- Bearer token authentication
- Docker socket access restricted
- Container resource limits enforced
- Network isolation per server

## Database Schema

### Users
- id, email, username, password
- role, twoFactorEnabled, twoFactorSecret
- isActive, createdAt, updatedAt

### Servers
- id, name, identifier, type, status
- resources (JSON), ports (JSON)
- dockerImage, daemonId
- minecraftConfig (JSON)
- ownerId (FK to Users)
- createdAt, updatedAt

## Deployment Architecture

### Docker Compose (Development/Small Scale)
- Single host deployment
- All services in one compose file
- Shared network
- Volume persistence

### Kubernetes (Production/Large Scale)
- Multi-node cluster
- Horizontal pod autoscaling
- Load balancing
- Persistent volume claims
- Secrets management
- Rolling updates

## Scalability

### Horizontal Scaling
- Backend: Multiple replicas behind load balancer
- Frontend: CDN + multiple instances
- Database: Read replicas
- Redis: Cluster mode
- Daemon: One per node

### Vertical Scaling
- Increase container resources
- Database connection pooling
- Redis memory optimization
- Nginx worker processes

## Monitoring & Logging

### Application Logs
- Winston logger in backend
- Structured JSON logs
- Log levels: error, warn, info, debug

### Metrics
- Server resource usage
- API response times
- Database query performance
- WebSocket connections

### Health Checks
- Backend: `/api/health`
- Database: Connection test
- Redis: Ping command
- Daemon: HTTP endpoint
