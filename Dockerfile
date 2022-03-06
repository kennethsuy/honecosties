FROM alpine:3.14

ENV NODE_VERSION 16.14.0

RUN apk update && apk upgrade
RUN apk add npm
RUN apk add git
RUN npm install -g yarn

WORKDIR /usr/src/app

COPY . ./
RUN yarn

EXPOSE 8080

ENV HOST=0.0.0.0
ENV PORT=8080

RUN yarn build

CMD [ "yarn", "start" ]