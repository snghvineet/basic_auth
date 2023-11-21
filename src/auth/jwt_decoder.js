import jwt from 'jsonwebtoken';
import rsaKeys from './rsa_keys.js';

const decode = (token) => {
	/**@type {import('jsonwebtoken').VerifyOptions} */
	const verifyOptions = { algorithms: 'RS256' };
	return jwt.verify(token, rsaKeys.publicKey, verifyOptions);
};

export const JwtDecoder = { decode };
