FROM node:18.10.0

WORKDIR /usr/src/cryptotalks-crypto-rates

RUN npm i -g nest
RUN npm i -g @nestjs/cli

COPY ../../services/crypto-rates/package*.json ./

COPY ../../services/common/models/ /usr/src/cryptotalks-crypto-rates/src/models
COPY ../../services/common/dto/ /usr/src/cryptotalks-crypto-rates/src/dto
COPY ../../services/common/events/ /usr/src/cryptotalks-crypto-rates/src/events
COPY ../../services/common/exceptions/ /usr/src/cryptotalks-crypto-rates/src/exceptions
COPY ../../services/common/mongo-schemas/ /usr/src/cryptotalks-crypto-rates/src/mongo-schemas

RUN npm install

COPY ../../services/crypto-rates/ .

RUN npm run build
