const { exec } = require("child_process");
const fs = require("fs");

const config = JSON.parse(process.env.config);

const email = config.email;
const email_arg = email ? "--register-unsafely-without-email" : `-m ${email}`;
const staging_arg = config.staging ? "--staging" : "";

const RSAKeySize = config.rsakeysize || 4096;

const domain_args = config.domains
  .map((domain) => "-d " + domain.join(","))
  .join(" ");

exec(
  `certbot certonly --standalone -n --rsa-key-size ${RSAKeySize} --agree-tos ${email_arg} ${staging_arg} ${domain_args}`,
  (error, stdout, stderr) => {
      console.error(error)
      console.log(stdout)
      console.warn(stderr)
  }
);

setInterval(() => {
  exec("certbot renew");
}, 24 * 60 * 60 * 1000);
