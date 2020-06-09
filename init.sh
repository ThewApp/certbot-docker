#!bin/bash

if [[ -z "${Email}" ]]
then
  EMAIL_ARG="--register-unsafely-without-email"
else
  EMAIL_ARG="-m ${EMAIL}"
fi

certbot certonly --standalone -n \
  --rsa-key-size $RSAKeySize \
  --agree-tos $EMAIL_ARG \
  -d $Domain

cron -f
