FROM node:18.10.0

WORKDIR /usr/src/cryptotalks-users

RUN npm i -g nest
RUN npm i -g @nestjs/cli

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
