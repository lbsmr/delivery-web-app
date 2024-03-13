import {Router} from 'express';
import * as orderCtrl from '../controllers/order.controller';
import { auth,getAccountId } from '../middleware/auth.middleware';

const orderRouter = Router();

orderRouter.post('/create-order',auth("CLIENT"),orderCtrl.createOrder);
orderRouter.get('/orders',getAccountId,orderCtrl.getOrders);
orderRouter.get('/order/:id',getAccountId,orderCtrl.getOrder)

export default orderRouter;