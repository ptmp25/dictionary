# Step 1: Use a Node.js base image
FROM node:16

# Step 2: Set the working directory
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Expose the port your app runs on
EXPOSE 3000

# Step 7: Command to run the application
CMD ["npm", "start"]
