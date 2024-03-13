import {Router} from 'express';
import * as authCtrl from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/signup',authCtrl.signUp);
authRouter.post('/login',authCtrl.login);
authRouter.get('/loggedin',authCtrl.loggedIn);

export default authRouter;