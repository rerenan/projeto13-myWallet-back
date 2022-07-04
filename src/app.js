import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter.js';
import authRouter from './routes/authRouter.js';
import removeInactives from './removeInactives.js'

dotenv.config();
const FIVE_MINUTES = 60 * 5 * 1000;
const app = express();

setInterval(removeInactives,FIVE_MINUTES)

app.use(express.json());
app.use(cors());

app.use(authRouter);

app.use(userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor at port ${PORT}`));