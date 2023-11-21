import express from 'express';
import { AuthController } from '../controllers/auth_controller.js';
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.post(
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

router.post(
	'/signup',
	asyncHandler(async (req, res) => {
		const userCredentials = req.body;
		const token = await AuthController.signUpWithEmailAndPassword(
			userCredentials.email,
			userCredentials.password
		);
		res.send({ token });
	})
);

export default router;
