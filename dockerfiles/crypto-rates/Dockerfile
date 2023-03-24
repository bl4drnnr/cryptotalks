FROM node:18.10.0

WORKDIR /usr/src/cryptotalks-crypto-rates

RUN npm i -g nest

COPY ../../services/crypto-rates/package*.json ./

COPY ../../services/common/models/ /usr/src/cryptotalks-crypto-rates/src/models
COPY ../../services/common/dto/ /usr/src/cryptotalks-crypto-rates/src/dto
COPY ../../services/common/events/ /usr/src/cryptotalks-crypto-rates/src/events

RUN npm install

COPY ../../services/crypto-rates/ .

RUN npm run build
