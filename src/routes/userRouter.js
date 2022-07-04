import {Router} from 'express'
import { GetWallet, PostWallet } from '../controllers/userController.js';
const router = Router()

router.get('/mywallet', GetWallet);
router.post('/account', PostWallet)

export default router;