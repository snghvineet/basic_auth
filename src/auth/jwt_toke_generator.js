import jwt from 'jsonwebtoken';

/**TODO
 * Use public-private key instead of string for secret in future
 */

const issueToken = (id, email, roles) => {
	const token = jwt.sign({ e: email, a: roles }, 'secret', {
		expiresIn: '1h',
		subject: `${id}`,
	});
	return token;
};

export { issueToken };
