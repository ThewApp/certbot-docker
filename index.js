const { promisify } = require("util");
const fs = require("fs");
const exec = promisify(require("child_process").exec);

const config = JSON.parse(
  process.env.config || fs.readFileSync("certbot.json", { encoding: "utf-8" })
);

const email = config.email;
const email_arg = email ? `-m ${email}` : "--register-unsafely-without-email";
const staging_arg = config.staging ? "--staging" : "";
const dryrun_arg = config.dryrun ? "--dry-run": "";
const expand_arg = config.expand ? "--expand": "";
const allowsubsetofnames_arg = config.allowsubsetofnames ? "--allow-subset-of-names": "";

const RSAKeySize = config.rsakeysize || 4096;

const certificate_domains = config.domains.map((domain) => domain.join(","));

function renew() {
  exec(`certbot renew ${dryrun_arg}`).then(({ stdout, stderr }) => {
    console.log(stdout);
    console.warn(stderr);
  });
}

async function generate_cert() {
  // Process requested certificates
  for (certificate_domain of certificate_domains) {
    await exec(
      `certbot certonly --standalone -n --rsa-key-size ${RSAKeySize} --agree-tos \
       ${email_arg} ${staging_arg} ${dryrun_arg} ${expand_arg} ${allowsubsetofnames_arg} \
       -d ${certificate_domain}`
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
