import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'dotenv/config';
import mongoose from 'mongoose';

import { AuthMiddleware } from './middlewares/auth_middleware.js';
import router from './routes/auth_route.js';
import { adminRouter } from './routes/admin_route.js';

const app = express();
// Replace the following with your MongoDB deployment's connection string.

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// defining an array to work as the database (temporary solution)
const ads = [{ title: 'Hello, world (again)!' }];

app.get('/', (req, res) => {
	res.send(ads);
});

app.use('/auth', router);

app.use(AuthMiddleware.authentication());

app.get('/secured', (req, res) => {
	res.send({ msg: 'Secure route accessed!', ...req.user });
});

app.use('/admin', adminRouter);

app.use((err, req, res, next) => {
	// console.error(err.stack);

	/* TODO Send a generic error message for production */
	res.status(err.statusCode || 500).send({
		name: err.name,
		message: err.message,
	});
});

async function main() {
	const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@recipes.rsascng.mongodb.net/?retryWrites=true&w=majority`;
	// console.log(uri);
	await mongoose.connect(uri);

	const port = process.env.PORT ?? 3000;
	app.listen(port, () => {
		console.log(`Listening to port ${port}...`);
	});
}

main().catch((err) => console.log(err));
