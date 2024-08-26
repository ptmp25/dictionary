FROM mongo:latest

# Expose the default MongoDB port

EXPOSE 27017

# Set default environment variables

ENV MONGO_INITDB_ROOT_USERNAME=admin

ENV MONGO_INITDB_ROOT_PASSWORD=123456

ENV MONGO_INITDB_DATABASE=words
ENV COLLECTION_NAME=users

# Copy the JSON file from your local machine into the Docker image
COPY words.users.json /words.users.json

# Copy the database initialization scrip
COPY mongo-script.js /docker-entrypoint-initdb.d/

# Start MongoDB

CMD ["mongod"]

# The Dockerfile for the MongoDB image is much simpler than the one for the user service.
# It uses the official MongoDB image as the base image and sets the default environment variables for the MongoDB instance.
# The MONGO_INITDB_ROOT_USERNAME and MONGO_INITDB_ROOT_PASSWORD environment variables are used to set the root user credentials for the MongoDB instance.