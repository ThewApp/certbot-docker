FROM ubuntu

RUN apt-get update && apt-get install -y \
    certbot cron \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 80

ENV RSAKeySize=4096 WebRoot=/var/www/letsencrypt

VOLUME /etc/letsencrypt/live /var/www/letsencrypt

ADD init.sh ./

RUN ["chmod", "+x", "init.sh"]

CMD ./init.sh
