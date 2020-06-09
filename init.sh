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

IFS="/"
for DOMAIN_ARG in $Domain
do
  certbot certonly --standalone -n \
    --rsa-key-size $RSAKeySize \
    --agree-tos $EMAIL_ARG \
    $STAGING_ARG \
    -d $DOMAIN_ARG
done

cron -f
