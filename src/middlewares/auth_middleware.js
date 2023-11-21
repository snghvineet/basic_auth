import { STATUS_CODES } from 'http';
import { JwtDecoder } from '../auth/jwt_decoder.js';

/** @type {import('express').RequestHandler} */
const authMiddleware = (req, res, next) => {
	const bearerToken = req.headers.authorization;
	if (bearerToken) {
		const token = bearerToken.substring(7);
		try {
			const decodedToken = JwtDecoder.decode(token);
			req.user = { email: decodedToken.e, roles: decodedToken.a };
		} catch (err) {
			err.statusCode = 500;
			if (err.name === 'TokenExpiredError') err.statusCode = 401;
			next(err);
		}
		next();
	} else {
		res.status(401).send();
	}
};

/** @type {import('express').RequestHandler} */
const authorizationMiddleware = (allowedRoles) => {
	return (req, res, next) => {
		let flag = false;
		for (const role of req.user.roles) {
			if (allowedRoles.includes(role)) {
				console.log(role, allowedRoles);
				flag = true;
				break;
			}
		}
		if (flag) next();
		else next({ message: 'Forbidden access', statusCode: 403 });
	};
};

export const AuthMiddleware = {
	authentication: () => authMiddleware,
	authorization: authorizationMiddleware,
};
