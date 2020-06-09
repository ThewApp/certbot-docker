FROM ubuntu

RUN apt-get update && apt-get install -y \
    certbot cron \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 80

ENV RSAKeySize=4096

VOLUME /etc/letsencrypt

COPY entrypoint.sh .

RUN ["chmod", "+x", "entrypoint.sh"]

ENTRYPOINT ["entrypoint.sh"]

CMD ["certbot"]
