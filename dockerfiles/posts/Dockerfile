FROM node:18.10.0

WORKDIR /usr/src/cryptotalks-posts

RUN npm i -g nest

COPY ../../services/posts/package*.json ./

COPY ../../services/common/models/ /usr/src/cryptotalks-posts/src/models
COPY ../../services/common/dto/ /usr/src/cryptotalks-posts/src/dto
COPY ../../services/common/events/ /usr/src/cryptotalks-posts/src/events
COPY ../../services/common/exceptions/ /usr/src/cryptotalks-posts/src/exceptions

RUN npm install

COPY ../../services/posts/ .

RUN npm run build
