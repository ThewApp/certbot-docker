FROM ubuntu

RUN apt-get update && apt-get install -y \
    certbot cron \
    && rm -rf /var/lib/apt/lists/*

ENV RSAKeySize=4096 WebRoot=/var/www/example

VOLUME /etc/letsencrypt/live /var/www/letsencrypt

ADD init.sh ./

RUN ["chmod", "+x", "init.sh"]

CMD ./init.sh
