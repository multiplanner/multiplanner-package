const { generateKeyPair } = require('crypto');

export default () => new Promise((resolve, reject) => generateKeyPair('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc'
    }
}, (err, publicKey, privateKey) => resolve([err, publicKey, privateKey])));