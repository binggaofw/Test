# base image
FROM node:14

# set working directory
RUN mkdir /usr/src/app

WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH
# install app dependencies

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@4.0.3 -g --silent
RUN npm install -g concurrently

COPY . .

EXPOSE 3000
# start app
CMD ["concurrently","node server.js", "npm start"]