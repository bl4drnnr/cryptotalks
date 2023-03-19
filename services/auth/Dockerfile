FROM node:18.10.0

WORKDIR /usr/src/cryptotalks-auth

RUN npm i -g nest

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
