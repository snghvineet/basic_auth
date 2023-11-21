import bcrypt from 'bcrypt';
import { issueToken } from '../auth/jwt_toke_generator.js';
import { User } from '../schema/user.js';

const TEST_USER = {
	id: 1,
	email: 'test@test.com',
	password: '$2a$12$wdI2DWY4qpfLywivdpn2tufd8BrskygPXu3rG7BMfsT09TRyITibu',
};

const loginWithEmailAndPassword = async (email, password) => {
	const existingUser = await User.findOne({ email: email });
	let areCorrectCredentials = false;
	if (existingUser) {
		areCorrectCredentials = await bcrypt.compare(
			password,
			existingUser.password
		);
	}
	return areCorrectCredentials
		? issueToken(existingUser._id, existingUser.email, existingUser.roles)
		: null;
};

const signUpWithEmailAndPassword = async (email, password) => {
	// Check if this email is already resgistered to an account
	const existingUser = await User.findOne({ email: email });
	if (existingUser)
		throw {
			message: 'This email is already registered with another account.',
			statusCode: 400,
		};
	// Hash the password
	const hashedPassword = await bcrypt.hash(password, 12);
	// Store the user in DB
	const user = { email: email, password: hashedPassword, roles: ['USER'] };
	const userModel = new User(user);
	const savedUser = await userModel.save();
	// Generate JWT if user is saved in DB
	if (savedUser) {
		return issueToken(savedUser._id, savedUser.email, savedUser.roles);
	}
	return null;
};

export const AuthController = {
	loginWithEmailAndPassword,
	signUpWithEmailAndPassword,
};
