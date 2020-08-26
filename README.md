# certbot-docker

## Usage

```
docker run -d -e config=$CONFIG_JSON \
-p 80:80  -v certs:/etc/letsencrypt/live --name certbot-docker \
docker.pkg.github.com/thewapp/certbot-docker/certbot-docker
```

Configuration can be pass as `config` environment variable or mount as a `/config.json` file.

## Volumes

- `/etc/letsencrypt`

## Configuration

Example configuration and default value.

```js
{
    "domains": [ // Array of certificates, required
        ["example.com", "example2.com"], // first certificate contains 2 domains
        ["example3.com"] // second certificate contains 1 domain
    ],
    "email": "", // Email address for important account notifications, optional
    "staging": false, // Obtain a test certificate from a staging server, optional,
    "rsakeysize": 4096 // Size of the RSA key, optional
}
```

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
