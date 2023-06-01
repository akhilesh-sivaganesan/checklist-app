FROM lmregistry.us.lmco.com/ext.hub.docker.com/library/node:18-alpine

# set working directory
WORKDIR /app
RUN mkdir -p app

# Install app dependencies
COPY ./package*.json ./
RUN npm install

# Copy the rest of the app's files
COPY ./ ./

# add app
# COPY ./client ./
EXPOSE 3000

# start app
CMD ["npm", "start"]