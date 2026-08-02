const dns = require("dns");

dns.resolveSrv("_mongodb._tcp.paraluna.hf1jhgf.mongodb.net", (err, addresses) => {
    if (err) {
        console.log("DNS ERROR:", err);
    } else {
        console.log("DNS SUCCESS:", addresses);
    }
});