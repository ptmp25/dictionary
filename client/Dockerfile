# Step 1: Use a Node.js base image to build the Vue app
FROM node:16 AS build-stage

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the application
RUN npm run build

# Step 7: Use a Nginx base image to serve the Vue app
FROM nginx:alpine AS production-stage

# Step 8: Copy the build files from the previous stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Step 9: Expose the port Nginx runs on
EXPOSE 80

# Step 10: Start Nginx
CMD ["nginx", "-g", "daemon off;"]
