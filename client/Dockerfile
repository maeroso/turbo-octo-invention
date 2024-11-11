# Stage 1: Build the Vite app
FROM node:lts-slim AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app source code
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve the Vite app using a lightweight web server
FROM nginx:stable-alpine

# Copy build files from the first stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx configuration file, if needed
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
