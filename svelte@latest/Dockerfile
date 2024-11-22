# Use the Node.js base image
FROM node

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the SvelteKit app
RUN npm run build

# Expose the app port
EXPOSE 3000

# Start the server
CMD ["node", "build/index.js"]
