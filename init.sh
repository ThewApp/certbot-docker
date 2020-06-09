#!bin/bash
certbot certonly -n \
  --webroot -w $WebRoot \
  --rsa-key-size $RSAKeySize \
  --agree-tos -m $EMAIL \
  -d $DOMAIN

cron -f
