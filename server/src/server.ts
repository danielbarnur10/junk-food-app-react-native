import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/routes'
import connectDB from './db/connect';
import errorHandler from './utils/errorHandler';

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
connectDB();

app.use('/api', routes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
    console.log(`Health check on http://localhost:${PORT}/api/health-check`);
})