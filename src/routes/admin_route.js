import express from 'express';
import { AuthMiddleware } from '../middlewares/auth_middleware.js';
const router = express.Router();

const allowedRoles = ['ADMIN'];

router.use(AuthMiddleware.authorization(allowedRoles));

router.get('/', (req, res) => {
	res.send('You are an admin!');
});

export const adminRouter = router;
