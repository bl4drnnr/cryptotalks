FROM node:18.10.0

WORKDIR /usr/src/cryptotalks-api

RUN npm i -g nest
RUN npm i -g @nestjs/cli

COPY ../../services/api/package*.json ./

COPY ../../services/common/models/ /usr/src/cryptotalks-api/src/models
COPY ../../services/common/dto/ /usr/src/cryptotalks-api/src/dto
COPY ../../services/common/events/ /usr/src/cryptotalks-api/src/events
COPY ../../services/common/exceptions/ /usr/src/cryptotalks-api/src/exceptions

RUN npm install

COPY ../../services/api/ .

RUN npm run build
