#!bin/bash

if [[ -z "${Email}" ]]
then
  EMAIL_ARG="--register-unsafely-without-email"
else
  EMAIL_ARG="-m ${EMAIL}"
fi

certbot --standalone -n \
  --webroot -w $WebRoot \
  --rsa-key-size $RSAKeySize \
  --http-01-address $HTTP01Address \
  --agree-tos $EMAIL_ARG \
  -d $Domain

cron -f
