# Use official Node.js image as build environment
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy all source files
COPY . .

# Build the app
RUN npm run build

# Use lightweight web server image to serve the built app
FROM nginx:stable-alpine

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 3000(or change if needed)
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
