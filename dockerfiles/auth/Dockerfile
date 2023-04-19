FROM node:18.10.0

WORKDIR /usr/src/cryptotalks-auth

RUN npm i -g nest
RUN npm i -g @nestjs/cli

COPY ../../services/auth/package*.json ./

COPY ../../services/common/models/ /usr/src/cryptotalks-auth/src/models
COPY ../../services/common/dto/ /usr/src/cryptotalks-auth/src/dto
COPY ../../services/common/events/ /usr/src/cryptotalks-auth/src/events
COPY ../../services/common/exceptions/ /usr/src/cryptotalks-auth/src/exceptions
COPY ../../services/common/mongo-schemas/ /usr/src/cryptotalks-auth/src/mongo-schemas

RUN npm install

COPY ../../services/auth/ .

RUN npm run build
