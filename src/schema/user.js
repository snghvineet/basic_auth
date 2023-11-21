import { Schema, model } from 'mongoose';

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	roles: [String],
});

export const User = model('User', userSchema);
