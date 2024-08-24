# Use a suitable Node.js base image
FROM node:lts-alpine as build 

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install -g ionic
RUN npm install

# Copy the rest of your application code
COPY . .

# Build your Ionic React app for production
RUN npm run-script build --prod

# Use a lightweight web server as the base image
FROM nginx:alpine

# Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy the built web app files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html
COPY Nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose the port that Nginx listens on
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
