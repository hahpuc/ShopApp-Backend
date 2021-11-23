const crypto = require('crypto');

const generateUid = () => {
    var uid = crypto.randomBytes(8).toString('hex');
    return uid;
}

module.exports = generateUid;