FROM node:18.10.0

WORKDIR /usr/src/cryptotalks-posts

RUN npm i -g nest

COPY ../../services/posts/package*.json ./

COPY ../../services/common/models/ /usr/src/cryptotalks-posts/src/models

RUN npm install

COPY ../../services/posts/ .

RUN npm run build
