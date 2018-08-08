FROM node:9.6.1
LABEL author="praagya.joshi@gmail.com"

# Create the main working directory, and set it as the
# base directory for all future commands
RUN mkdir -p /app
WORKDIR /app

# Add `app/node_modules/.bin` to $PATH
ENV NODE_PATH=./node_modules
ENV PATH=./node_modules/.bin:$PATH

# Install and cache app dependencies
COPY package.json package-lock.json ./
RUN npm install
