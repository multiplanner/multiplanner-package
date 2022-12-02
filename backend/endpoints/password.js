import crypto from 'crypto';

export default () => crypto.randomBytes(64).toString('base64');

