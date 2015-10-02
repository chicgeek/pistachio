var fs = require('fs');
var crypto = require('crypto');

module.exports = function checksum(path, algorithm) {
    var data = fs.readFileSync(path, 'utf8');
    return crypto.createHash(algorithm)
                     .update(data, 'utf8')
                     .digest('base64');
}
