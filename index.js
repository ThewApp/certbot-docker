const { promisify } = require("util");
const fs = require("fs");
const exec = promisify(require("child_process").exec);

const config = JSON.parse(
  process.env.config || fs.readFileSync("certbot.json", { encoding: "utf-8" })
);

const email = config.email;
const email_arg = email ? `-m ${email}` : "--register-unsafely-without-email";
const staging_arg = config.staging ? "--staging" : "";

const RSAKeySize = config.rsakeysize || 4096;

const certificate_domains = config.domains.map((domain) => domain.join(","));

function renew() {
  exec("certbot renew").then(({ stdout, stderr }) => {
    console.log(stdout);
    console.warn(stderr);
  });
}

async function generate_cert() {
  // Process requested certificates
  for (certificate_domain of certificate_domains) {
    await exec(
      `certbot certonly --standalone -n --rsa-key-size ${RSAKeySize} --agree-tos ${email_arg} ${staging_arg} -d ${certificate_domain}`
    ).then(({ stdout, stderr }) => {
      console.log(stdout);
      console.warn(stderr);
    });
  }

  // Renew existing certificate
  renew();
}

generate_cert();

// Renew existing certificate every 12 hours
setInterval(() => {
  renew();
}, 12 * 60 * 60 * 1000);
