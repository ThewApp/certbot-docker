FROM ubuntu

RUN apt-get update && apt-get install -y \
    certbot cron \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 80

ENV RSAKeySize=4096

VOLUME /etc/letsencrypt

ADD init.sh ./

RUN ["chmod", "+x", "init.sh"]

CMD ./init.sh
