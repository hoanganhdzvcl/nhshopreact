import express from 'express';
import { create, delteProductById, getAll, getProductById, related, updateProductById } from '../controllers/product';
import { checkAuth } from '../middleware/checkAuth';
const router = express.Router();
router.get('/products', getAll);
router.get('/products/:id', getProductById);
//fe
router.post('/products/:id', delteProductById);
//be
router.delete('/products/:id', delteProductById);
router.get('/products/:categoryId/related/:productId', related);
router.patch('/products/:id', updateProductById);
router.post('/products', create);
export default router;