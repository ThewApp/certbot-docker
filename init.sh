#!bin/bash

if [[ -z "${Email}" ]]
then
  EMAIL_ARG="--register-unsafely-without-email"
else
  EMAIL_ARG="-m ${EMAIL}"
fi

if [[ -n "${Staging}" ]]
then
  STAGING_ARG="--staging"
fi

$DOMAIN_ARG="-d ${Domain//// -d }"

certbot certonly --standalone -n \
  --rsa-key-size $RSAKeySize \
  --agree-tos $EMAIL_ARG \
  $STAGING_ARG \
  $DOMAIN_ARG

cron -f
