FROM node:alpine

RUN apk update && apk add --no-cache \
    certbot

EXPOSE 80

VOLUME /etc/letsencrypt

COPY ./index.js .

CMD node index.js
