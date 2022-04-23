# base image
FROM node:14

# set working directory
RUN mkdir /usr/src/app

WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH


COPY package*.json ./
RUN npm install
COPY . .


# start app
CMD ["npm", "start"]