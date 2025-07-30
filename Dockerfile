FROM node:18-bullseye AS development

WORKDIR /usr/src/app

# Install dependencies and build tools
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Install dependencies
COPY package*.json ./
RUN npm config set registry https://registry.npmjs.org/
RUN npm install

# Copy application code
COPY . .

# Expose ports
EXPOSE 3000 9229

# Start the application in development mode
CMD ["npm", "run", "start:debug"]

# Production build
FROM node:18-bullseye-slim AS production

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm config set registry https://registry.npmjs.org/
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]