FROM node:16

WORKDIR /usr/src/omz

COPY package.json package.json

RUN npm install

COPY . .

RUN ["npm", "start"]