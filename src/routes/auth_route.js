import express from 'express';
import { AuthController } from '../controllers/auth_controller.js';
import asyncHandler from 'express-async-handler';

const authRouter = express.Router();

authRouter.post(
	'/login',
	asyncHandler(async (req, res, next) => {
		const userCredentials = req.body;
		const token = await AuthController.loginWithEmailAndPassword(
			userCredentials.email,
			userCredentials.password
		);
		res.send({ token });
	})
);

export default authRouter;
