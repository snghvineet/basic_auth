import jwt from 'jsonwebtoken';

const decode = (token) => {
	return jwt.verify(token, 'secret');
};

export const JwtDecoder = { decode };
