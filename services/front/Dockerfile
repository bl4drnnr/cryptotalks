FROM node:18.10.0

RUN mkdir -p /usr/src/cryptotalks-front && chown -R node:node /usr/src/cryptotalks-front

WORKDIR /usr/src/cryptotalks-front

COPY --chown=node:node . .

ENV NEXT_TELEMETRY_DISABLED 1

USER node

RUN npm install

RUN npm run build

