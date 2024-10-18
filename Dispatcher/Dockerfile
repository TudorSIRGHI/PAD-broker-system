# Use the official Node.js image as a base image
FROM node:22

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your app runs on (e.g., 3000)
EXPOSE 3001

# Start the Node.js app
CMD ["npm", "start"]