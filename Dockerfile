FROM node

RUN apt-get update && apt-get install -y \
    certbot \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 80

VOLUME /etc/letsencrypt

COPY ./index.js .

CMD node index.js
