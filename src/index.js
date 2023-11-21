import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { AuthMiddleware } from './middlewares/auth_middleware.js';
import authRouter from './routes/auth_route.js';
import { adminRouter } from './routes/admin_route.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// defining an array to work as the database (temporary solution)
const ads = [{ title: 'Hello, world (again)!' }];

app.get('/', (req, res) => {
	res.send(ads);
});

app.use('/auth', authRouter);

app.use(AuthMiddleware.authentication());

app.get('/secured', (req, res) => {
	res.send({ msg: 'Secure route accessed!', ...req.user });
});

app.use('/admin', adminRouter);

app.use((err, req, res, next) => {
	// console.error(err.stack);

	/**TODO: Send a generic error message for production */
	res.status(err.statusCode || 500).send({
		name: err.name,
		message: err.message,
	});
});

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
	console.log(`Listening to port ${port}...`);
});
