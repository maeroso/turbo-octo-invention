# turbo-octo-invention

This project consists of a Vite React frontend and a Swift Hummingbird backend server.

## 🚀 Quick Start with Docker

The easiest way to run the entire stack is using Docker Compose:

```bash
# Clone the repository
git clone https://github.com/maeroso/turbo-octo-invention.git
cd turbo-octo-invention

# Start all services
docker compose up --build
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080

To stop the services:
```bash
docker compose down
```

## 💻 Local Development

### Frontend (Vite React)
```bash
# Navigate to the client directory
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend (Swift Hummingbird)
```bash
# Navigate to the server directory
cd server

# Resolve dependencies
swift package resolve

# Run the server
swift run
```

## 🔧 Troubleshooting

1. **Docker Issues**
   - Make sure Docker and Docker Compose are installed and running
   - If containers don't start, check logs: `docker compose logs`
   - To rebuild containers: `docker compose up --build`

2. **Frontend Issues**
   - Check if port 3000 is available
   - Clear browser cache if you see stale content

3. **Backend Issues**
   - Check if port 8080 is available
   - View server logs: `docker compose logs server`