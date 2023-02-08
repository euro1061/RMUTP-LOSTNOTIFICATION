# Use an official Node.js runtime as the base image
FROM node:18-slim

RUN npm install -g pnpm

# Set the working directory in the container
WORKDIR /app

# We don't need the standalone Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Install Google Chrome Stable and fonts
# Note: this installs the necessary libs to make the browser work with Puppeteer.
RUN apt-get update && apt-get install gnupg wget -y && \
  wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
  sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
  apt-get update && \
  apt-get install google-chrome-stable -y --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the application's dependencies in the container
RUN pnpm install

# Copy the application's source code to the container
COPY . .

RUN pnpm prisma generate

# Build the application in the container
RUN pnpm run build

# Set the command to run the built application
CMD ["pnpm" ,"start"]