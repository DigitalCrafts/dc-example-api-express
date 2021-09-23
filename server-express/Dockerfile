# syntax=docker/dockerfile:1

FROM node:14.15.5

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm i -g npm@7

RUN npm ci --production

COPY . .

CMD ["npm", "start"]