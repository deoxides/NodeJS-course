const bcryptJs = require('./bcrypt');
const fileUpload = require('./file-upload');
const googleIdentity = require('./google-identity');
const jwt = require('./jwt');

module.exports = {
    ...bcryptJs,
    ...fileUpload,
    ...googleIdentity,
    ...jwt
}