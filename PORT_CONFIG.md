# AgroCrop - Port Configuration Guide

## Quick Start

### Default Ports
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8080

### Change Ports

Edit `frontend/.env` file:

```env
# Frontend port
VITE_PORT=3000

# Backend API URL
VITE_API_URL=http://localhost:8080
```

**Example configurations:**

Frontend on 5000, Backend on 8080:
```env
VITE_PORT=5000
VITE_API_URL=http://localhost:8080
```

Frontend on 3000, Backend on 5000:
```env
VITE_PORT=3000
VITE_API_URL=http://localhost:5000
```

### Apply Changes

Restart the dev server after editing `.env`:
```bash
cd frontend
npm run dev
```

## First Time Setup

1. Copy the example file:
   ```bash
   cd frontend
   cp .env.example .env
   ```

2. Edit `.env` with your preferred ports

3. Start the server:
   ```bash
   npm run dev
   ```

## Backend Port Configuration

To change the Java backend port, edit `java-service/src/main/resources/application.properties`:

```properties
server.port=8080
```

Then update `frontend/.env` to match:
```env
VITE_API_URL=http://localhost:8080
```

---

That's it! No code editing required - just configure ports in `.env` files.
