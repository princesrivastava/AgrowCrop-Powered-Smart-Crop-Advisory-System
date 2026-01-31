# Quick Start Guide

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js (v14+) installed
- ✅ MongoDB running (local or connection string)
- ✅ Java 17+ installed
- ✅ Maven installed

## Step-by-Step Setup

### 1. Install Dependencies

**Backend:**
```bash
npm install
```

**Frontend:**
```bash
cd frontend
npm install
cd ..
```

### 2. Configure Environment

Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/agrowcrop
JAVA_SERVICE_URL=http://localhost:8080
NODE_ENV=development
```

### 3. Seed the Database

Run the seed script to populate initial data:
```bash
node backend/scripts/seedData.js
```

This will add:
- 8 Indian states with regional data
- 8 common crops with detailed information

### 4. Start Services

**Terminal 1 - Java Spring Boot Service:**
```bash
cd java-service
mvn spring-boot:run
```
Wait for: "Started AgrowCropApplication"

**Terminal 2 - Node.js Backend:**
```bash
npm start
# or for development with auto-reload:
npm run dev
```
Wait for: "Server is running on port 5000"

**Terminal 3 - React Frontend:**
```bash
cd frontend
npm run dev
```
Wait for: "Local: http://localhost:3000"

### 5. Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api/health
- **Java Service**: http://localhost:8080/api/recommendations/analyze

## Testing the Application

1. Go to http://localhost:3000
2. Click "Get Recommendations"
3. Select:
   - Season: Kharif
   - State: Punjab
4. Click "Get Recommendations"
5. View the crop recommendations with scores, irrigation, and fertilizer guidance
6. Click "View Calendar" on any crop to see the monthly timeline

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod` or check your connection string
- Verify the MONGODB_URI in `.env` file

### Java Service Not Starting
- Check Java version: `java -version` (should be 17+)
- Check Maven: `mvn -version`
- Try: `mvn clean install` then `mvn spring-boot:run`

### Port Already in Use
- Change PORT in `.env` for Node.js
- Change `server.port` in `java-service/src/main/resources/application.properties`
- Change port in `frontend/vite.config.js`

### No Recommendations Showing
- Ensure Java service is running on port 8080
- Check backend logs for errors
- Verify database is seeded (run seed script again)

## Next Steps

- Add more crops and regions in `backend/scripts/seedData.js`
- Customize the recommendation algorithm in Java service
- Add more FAQ entries in `backend/routes/faqRoutes.js`
- Enhance UI components in `frontend/src/components/`


