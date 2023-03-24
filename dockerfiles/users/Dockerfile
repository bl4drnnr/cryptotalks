FROM node:18.10.0

WORKDIR /usr/src/cryptotalks-users

RUN npm i -g nest
RUN npm i -g @nestjs/cli

COPY ../../services/users/package*.json ./

COPY ../../services/common/models/ /usr/src/cryptotalks-users/src/models
COPY ../../services/common/dto/ /usr/src/cryptotalks-users/src/dto
COPY ../../services/common/events/ /usr/src/cryptotalks-users/src/events

RUN npm install

COPY ../../services/users/ .

RUN npm run build
