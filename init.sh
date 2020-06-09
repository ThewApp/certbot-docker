#!bin/bash

if [[ -z "${EMAIL}" ]]
then
  EMAIL_ARG="--register-unsafely-without-email"
else
  EMAIL_ARG="-m ${EMAIL}"
fi

certbot certonly -n \
  --webroot -w $WebRoot \
  --rsa-key-size $RSAKeySize \
  --agree-tos $EMAIL_ARG \
  -d $DOMAIN

cron -f
