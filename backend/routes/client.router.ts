import {Router} from 'express';
import * as clientCtrl from '../controllers/client.controller';
import { auth } from '../middleware/auth.middleware';

const clientRouter = Router();

clientRouter.post('/addtocart',auth("CLIENT"),clientCtrl.addToCart);
clientRouter.get('/cart',auth("CLIENT"),clientCtrl.getCart);
clientRouter.post('/reducecart/:id',auth("CLIENT"),clientCtrl.reduceCart);
clientRouter.post('/removecart/:id',auth("CLIENT"),clientCtrl.removeFromCart);
clientRouter.post('/clearcart',auth("CLIENT"),clientCtrl.clearCart);

export default clientRouter;