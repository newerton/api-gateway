FROM node:14-alpine

WORKDIR /app
EXPOSE 8000

COPY package* ./
RUN apk update && apk add --no-cache --virtual .build-deps make gcc g++ python \
 && npm ci \
 && apk del .build-deps
COPY . .

ENV NODE_ENV=development
CMD ["npm", "run", "start:dev"]
