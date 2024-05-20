# Use the official Node.js 14 image as a base
FROM node:14

# Set the working directory to the root
WORKDIR /

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which your Express app runs
EXPOSE 8080

# Command to run your app
CMD ["node", "index.js"]
