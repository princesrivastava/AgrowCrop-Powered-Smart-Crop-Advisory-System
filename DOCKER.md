# 🚀 Docker Quick Start

## Development Mode (Fast & Easy)

```bash
docker-compose up --build
```

**Access:**
- Frontend: http://localhost:3000
- Backend: http://localhost:8080  
- MongoDB: localhost:27017

**Hot reload enabled** - changes reflect immediately!

---

## Production Mode (Optimized)

```bash
# Set environment variables first
export MONGO_USER=admin
export MONGO_PASSWORD=your_secure_password

# Start production stack
docker-compose -f docker-compose.prod.yml up -d
```

**Access:**
- Frontend: http://localhost (port 80)
- Backend: http://localhost:8080
- MongoDB: localhost:27017 (with auth)

**Features:**
- ✅ Nginx serving (compressed, cached)
- ✅ MongoDB authentication
- ✅ Optimized builds
- ✅ Health checks with start periods

---

## Stop Services

```bash
# Development
docker-compose down

# Production
docker-compose -f docker-compose.prod.yml down

# Remove volumes (delete data)
docker-compose down -v
```

---

## View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongo
```

---

## Rebuild After Code Changes

```bash
# Development
docker-compose up --build

# Production
docker-compose -f docker-compose.prod.yml up --build -d
```

---

## Troubleshooting

### Port Already in Use

```bash
# Find process
netstat -ano | findstr :3000
netstat -ano | findstr :8080

# Kill process (replace PID)
taskkill /PID <PID> /F
```

### MongoDB Connection Issues

```bash
# Check mongo logs
docker-compose logs mongo

# Connect to mongo shell
docker exec -it agrocrop-mongo mongosh
```

### Backend Not Starting

```bash
# Check backend logs
docker-compose logs backend

# Enter container
docker exec -it agrocrop-backend sh
```

---

## Environment Variables

Create `.env` file in root:

```env
# MongoDB
MONGO_USER=admin
MONGO_PASSWORD=secure_password_123

# Backend
AGMARKNET_API_KEY=your_api_key_here

# Frontend
VITE_API_BASE_URL=http://localhost:8080
```

---

## Health Checks

```bash
# MongoDB
curl http://localhost:27017

# Backend
curl http://localhost:8080/api/market-prices/health

# Frontend
curl http://localhost:3000
```

---

## Production Deployment Checklist

- [ ] Set strong MongoDB password
- [ ] Configure Agmarknet API key
- [ ] Set CORS allowed origins
- [ ] Enable HTTPS (use reverse proxy like Traefik/Nginx)
- [ ] Set up monitoring (Prometheus/Grafana)
- [ ] Configure backup strategy for MongoDB
- [ ] Set resource limits in docker-compose

---

**🎯 One command. Full stack. Production ready.**
