import jwt from 'jsonwebtoken';
import rsaKeys from './rsa_keys.js';

/**TODO
 * Use public-private key instead of string for secret in future
 */

const issueToken = (id, email, roles) => {
	const signOptions = {
		issuer: 'snghvineet',
		subject: `${id}`,
		expiresIn: '1h',
		algorithm: 'RS256',
	};
	const token = jwt.sign(
		{ e: email, a: roles },
		rsaKeys.privateKey,
		signOptions
	);
	return token;
};

export { issueToken };
