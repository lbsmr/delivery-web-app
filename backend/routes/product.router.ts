import {Router} from 'express';
import * as productCtrl from '../controllers/product.controller';
import {auth,getAccountId} from '../middleware/auth.middleware';

const productRouter = Router();

productRouter.post('/create-product',auth("RESTAURANT"),productCtrl.createProduct);
productRouter.patch('/update-product/:id',auth("RESTAURANT"),productCtrl.updateProduct);
productRouter.delete('/delete-product/:id',auth("RESTAURANT"),productCtrl.deleteProduct);
productRouter.get('/products',getAccountId,productCtrl.getProducts);
productRouter.get('/product/:id',getAccountId,productCtrl.getProduct);

export default productRouter;