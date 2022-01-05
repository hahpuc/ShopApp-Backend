const crypto = require('crypto');

const generateUid = () => {
    var uid = crypto.randomBytes(8).readUInt32LE()
    return uid;
}

module.exports = generateUid;