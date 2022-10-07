import dotenv from 'dotenv';
import express from 'express';
import authRoutes from './src/routes/auth.js';
import errorHandler from './src/middleware/errorHandler.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(authRoutes);

app.use(errorHandler);

app.listen(3000, () => {});
