#################
## BUILD STAGE ##
#################
FROM docker.io/library/node:20-alpine AS build

WORKDIR /usr/app

# Copy files from Build
COPY *.json ./

# Copy SRC
COPY ./src ./src

RUN npm ci

# Build
RUN npm run build && npm prune --production

#################
## FINAL STAGE ##
#################
FROM docker.io/library/node:20-alpine

ENV NODE_ENV production

RUN apk add bash

WORKDIR /usr/app

EXPOSE 3000 $PORT

COPY --from=build /usr/app/package*.json /usr/app/
COPY --from=build /usr/app/node_modules/ /usr/app/node_modules/
COPY --from=build /usr/app/dist/ /usr/app/dist/

CMD ["node", "dist/main.js"]
