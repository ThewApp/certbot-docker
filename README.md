# certbot-docker

## Volumes

- `/etc/letsencrypt/live`

## Environment Variables

`Domain` - Comma-separated list of domains to obtain a certificate for

`Email` - Email used for registration and recovery contact. _(optional)_

`WebRoot` - public_html / webroot path. _(default: /var/www/letsencrypt)_

`RSAKeySize` - Size of the RSA key. _(default: 4096)_ 

`Staging` - Use the staging server to obtain (invalid) certificates _(default: False)_

## Nginx

```
    upstream letsencrypt {
        server certbot;
    }

    server {
        listen 80;

        location /.well-known/acme-challenge {
            proxy_pass http://letsencrypt;
        }
    }
```
