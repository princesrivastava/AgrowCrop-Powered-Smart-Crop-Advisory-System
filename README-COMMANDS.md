# AgrowCrop - Quick Start Commands

## 🚀 Run Both Backend & Frontend Together

### Option 1: Using npm script (Recommended - Single Terminal)
```bash
# Install concurrently first (one time only)
npm install

# Run both services in one terminal
npm run dev:all
```

### Option 2: Using PowerShell Script (Separate Windows)
```powershell
# Double-click or run:
.\start-dev.ps1
```

### Option 3: Using Batch File (Separate Windows)
```cmd
# Double-click or run:
start-dev.bat
```

### Option 4: Using PowerShell (Single Terminal)
```powershell
# Run:
.\start-all.ps1
```

---

## 📋 Individual Commands

### Backend Only
```bash
npm start          # Production mode
npm run dev        # Development mode (with auto-reload)
```

### Frontend Only
```bash
cd frontend
npm run dev        # Development server
```

---

## 🎯 Quick Reference

| Command | Description |
|---------|-------------|
| `npm run dev:all` | Start both in one terminal (recommended) |
| `npm run start:all` | Start both in production mode |
| `.\start-dev.ps1` | Start both in separate windows (PowerShell) |
| `start-dev.bat` | Start both in separate windows (Batch) |
| `.\start-all.ps1` | Start both in one terminal (PowerShell) |

---

## 📝 Notes

- **Backend** runs on: `http://localhost:5000`
- **Frontend** runs on: `http://localhost:3000`
- Make sure MongoDB is running for backend to work
- First time setup: Run `node backend/scripts/seedData.js` to populate database

---

## 🔧 Troubleshooting

If `concurrently` is not found:
```bash
npm install concurrently --save-dev
```

If ports are already in use:
- Change `PORT` in `.env` file for backend
- Change port in `frontend/vite.config.js` for frontend


