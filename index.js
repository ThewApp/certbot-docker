const { exec, execSync } = require("child_process");
const fs = require("fs");

const config = JSON.parse(
  process.env.config || fs.readFileSync("certbot.json", { encoding: "utf-8" })
);

const email = config.email;
const email_arg = email ? `-m ${email}` : "--register-unsafely-without-email";
const staging_arg = config.staging ? "--staging" : "";

const RSAKeySize = config.rsakeysize || 4096;

const certificate_domains = config.domains.map((domain) => domain.join(","));

function callback(error, stdout, stderr) {
  console.error(error);
  console.log(stdout);
  console.warn(stderr);

  if (stderr) {
    return;
  }
}

function renew() {
  exec("certbot renew", callback);
}

certificate_domains.map((certificate_domain) => {
  execSync(
    `certbot certonly --standalone -n --rsa-key-size ${RSAKeySize} --agree-tos ${email_arg} ${staging_arg} -d ${certificate_domain}`,
    callback(error, stdout, stderr)
  );
});

renew();

setInterval(() => {
  renew();
}, 12 * 60 * 60 * 1000);
