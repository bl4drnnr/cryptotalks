FROM node:18.10.0

WORKDIR /usr/src/cryptotalks-api

RUN npm i -g nest

COPY ../../services/api/package*.json ./

COPY ../../services/common/models/ /usr/src/cryptotalks-api/src/models

RUN npm install

COPY ../../services/api/ .

RUN npm run build
