FROM node:18.10.0

RUN mkdir -p /home/app/ && chown -R node:node /home/app
WORKDIR /home/app
COPY --chown=node:node . .

USER node

RUN npm install
RUN npm run build

CMD [ "npm", "start" ]
