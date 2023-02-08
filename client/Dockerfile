# Use node base image
FROM node:18-alpine
RUN npm install -g pnpm serve

# Set the working directory
WORKDIR /app

# Copy the package.json and pnpm-lock.yaml files
COPY package.json ./

# Install dependencies with pnpm
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the application in the container
RUN pnpm run build

# Specify the command to run the app
CMD ["pnpm", "serve", "-l", "3001"]