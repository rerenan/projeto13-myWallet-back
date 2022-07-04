import {Router} from 'express'
import { GetWallet, PostWallet, SendStatus } from '../controllers/userController.js';
import validateUser from '../middlewares/validateUser.js';

const router = Router()

router.get('/mywallet', validateUser ,GetWallet);
router.post('/account', validateUser ,PostWallet)
router.post('/status', validateUser ,SendStatus);

export default router;