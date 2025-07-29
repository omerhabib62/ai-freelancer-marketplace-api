FROM node:18 AS development

WORKDIR /usr/src/app

# Add git for potential npm dependencies from git
RUN apk add --no-cache git

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
FROM node:18-slim AS production

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm config set registry https://registry.npmjs.org/
RUN npm install --production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]