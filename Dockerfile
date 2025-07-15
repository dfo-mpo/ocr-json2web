# Use the official Node.js image as the base image  
FROM node:20.19.2 AS build  
  
# Set the working directory in the container  
WORKDIR /app  
  
# Copy and install packages 
COPY package.json ./  
COPY package-lock.json ./  
RUN npm install  
COPY . .  

# Start the application
EXPOSE 3092
RUN npm run build
CMD ["npm", "start"]  