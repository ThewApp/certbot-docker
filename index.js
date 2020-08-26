const { exec } = require("child_process");
const fs = require("fs");

const config = JSON.parse(
  process.env.config || fs.readFileSync("certbot.json", { encoding: "utf-8" })
);

const email = config.email;
const email_arg = email ? `-m ${email}` : "--register-unsafely-without-email";
const staging_arg = config.staging ? "--staging" : "";

const RSAKeySize = config.rsakeysize || 4096;

const domain_args = config.domains
  .map((domain) => "-d " + domain.join(","))
  .join(" ");

function callback(error, stdout, stderr) {
  console.error(error);
  console.log(stdout);
  console.warn(stderr);
}

exec(
  `certbot certonly --standalone -n --rsa-key-size ${RSAKeySize} --agree-tos ${email_arg} ${staging_arg} ${domain_args}`,
  (error, stdout, stderr) => {
    callback(error, stdout, stderr);

    exec("certbot renew", callback);
  }
);

setInterval(() => {
  exec("certbot renew", callback);
}, 24 * 60 * 60 * 1000);
