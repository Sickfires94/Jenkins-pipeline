
# Use the latest node image as a base image
FROM node:latest

# Set the working directory 
WORKDIR /app

# Copying the package.json file into the working directory
COPY package*.json ./

# Installing all the npm dependencies
RUN npm install

# Copy the source files from the host machine to the container
COPY . .

# Expose the 3000 port of the container
EXPOSE 3000

# Starting the application
CMD ["npm", "start"]
