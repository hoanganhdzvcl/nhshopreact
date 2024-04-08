import express from 'express';
import { signin, signup } from '../controllers/auth';
const router = express.Router();


router.post('/auth/signup', signup);
router.post('/auth/signin', signin);
// router.get('/auth/getAll', getAll);
export default router;