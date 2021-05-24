var fs = require('fs');

// Script is used by the build server to inject a credentials file

let credentials = {
    "login": process.argv[2],
    "password": process.argv[3],
    "otp_secret": process.argv[4],
    "cloudflare_id": process.argv[5],
    "cloudflare_secret": process.argv[6],
}

fs.writeFile('credentials.json', JSON.stringify(credentials), function (err) {
    if (err) throw err;
    console.log('Saved credentials');
});