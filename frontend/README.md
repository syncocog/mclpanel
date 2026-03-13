# MCLEGENDS.GG Frontend

Next.js 14 frontend with futuristic UI design.

## Features

- Server-side rendering with Next.js 14
- Futuristic neon theme with Tailwind CSS
- Smooth animations with Framer Motion
- 3D visualizations with Three.js
- Real-time updates via WebSocket
- Responsive design for all devices

## Setup

```bash
# Install dependencies
npm install

# Configure environment
echo "NEXT_PUBLIC_API_URL=http://localhost:4000/api" > .env.local
echo "NEXT_PUBLIC_WS_URL=ws://localhost:4000" >> .env.local

# Start development server
npm run dev

# Build for production
npm run build
npm start
```

## Pages

- `/` - Landing page
- `/login` - User login
- `/register` - User registration
- `/dashboard` - Main dashboard
- `/dashboard/servers` - Server management
- `/dashboard/backups` - Backup management
- `/dashboard/analytics` - Analytics dashboard
- `/dashboard/settings` - User settings

## Components

- `DashboardLayout` - Main layout with sidebar
- `ServerCard` - Server status card
- `StatsCard` - Statistics display card
- `ConsoleTerminal` - Real-time console output
- `MetricsChart` - Performance metrics visualization

## Styling

The app uses a futuristic neon theme with:
- Dark background colors
- Neon accent colors (blue, purple, pink, green)
- Glow effects and shadows
- Smooth animations
- Custom scrollbars

## Default Credentials

For testing:
- Email: `admin@mclegends.gg`
- Password: `Admin123!`
