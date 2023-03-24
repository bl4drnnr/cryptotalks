FROM node:18.10.0

WORKDIR /usr/src/cryptotalks-auth

RUN npm i -g nest

COPY ../../services/auth/package*.json ./

COPY ../../services/common/models/ /usr/src/cryptotalks-auth/src/models
COPY ../../services/common/dto/ /usr/src/cryptotalks-auth/src/dto
COPY ../../services/common/events/ /usr/src/cryptotalks-auth/src/events
COPY ../../services/common/exceptions/ /usr/src/cryptotalks-auth/src/exceptions

RUN npm install

COPY ../../services/auth/ .

RUN npm run build
