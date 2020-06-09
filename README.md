# certbot-docker

## Usage

```
docker run -d -e Domain=example.com,example1.com/example2.com -e Staging=True -p 80:80 -v certs:/etc/letsencrypt/live --name certbot-docker docker.pkg.github.com/thewapp/certbot-docker/certbot-docker
```

## Volumes

- `/etc/letsencrypt/live`

## Environment Variables

`Domain` - Comma-separated list of domains to obtain a certificate for. Multiple certificates are seperated by `/` ex. `example.com,example1.com/example2.com`

`Email` - Email used for registration and recovery contact. _(optional)_

`WebRoot` - public_html / webroot path. _(default: /var/www/letsencrypt)_

`RSAKeySize` - Size of the RSA key. _(default: 4096)_ 

`Staging` - Use the staging server to obtain (invalid) certificates _(default: False)_

## Nginx

You can proxy http-01 challenge through your running Nginx.

```
    upstream letsencrypt {
        server certbot-docker;
    }

    server {
        listen 80;

        location /.well-known/acme-challenge {
            proxy_pass http://letsencrypt;
        }
    }
```
