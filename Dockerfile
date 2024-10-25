FROM node:20-alpine as build

COPY ./package.json /app/package.json
COPY ./src /app/src
COPY ./locales /app/locales
COPY ./.env /app/.env
COPY ./index.js /app/index.js
WORKDIR /app

RUN npm install

FROM node:20-alpine as tg-bot
COPY --from=build /app /app
WORKDIR /app

CMD ["npm", "start"]
