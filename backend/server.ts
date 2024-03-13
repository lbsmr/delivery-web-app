import express, {Express} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import './database';
import config from './config'
import authRouter from './routes/auth.router';
import productRouter from './routes/product.router';
import clientRouter from './routes/client.router';
import orderRouter from './routes/order.router';

dotenv.config();

const app: Express = express();
const port = config.PORT;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.use(cors({
  origin:[config.FRONTEND_ORIGIN],
  credentials:true,
}));
app.use(express.json());

app.use(authRouter);
app.use(productRouter);
app.use(clientRouter);
app.use(orderRouter);