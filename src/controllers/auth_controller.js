import bcrypt from 'bcrypt';
import { issueToken } from '../auth/jwt_toke_generator.js';

const TEST_USER = {
	id: 1,
	email: 'test@test.com',
	password: '$2a$12$wdI2DWY4qpfLywivdpn2tufd8BrskygPXu3rG7BMfsT09TRyITibu',
};

const loginWithEmailAndPassword = async (email, password) => {
	if (email === TEST_USER.email) {
		const flag = await bcrypt.compare(password, TEST_USER.password);
		if (flag) return issueToken(TEST_USER.id, TEST_USER.email, ['ADMIN']);
	}
	return null;
};

export const AuthController = { loginWithEmailAndPassword };
