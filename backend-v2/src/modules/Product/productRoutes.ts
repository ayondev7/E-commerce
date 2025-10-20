import express from 'express';
import auth from '../../middleware/auth.js';
import multer from 'multer';
import * as productController from './productController.js';

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post('/create', auth, upload.array('productImages', 4), productController.createProduct);
router.get('/get-all', auth, productController.getAllProducts);
router.get('/shop/get-all', auth, productController.getAllProductsForShop);
router.get('/shop/get-product/:id', auth, productController.getProductDetails);
router.post('/get-all-by-id', auth, productController.getAllProductsById);
router.get('/search', auth, productController.searchProducts);
router.get('/get-product/:id', auth, productController.getSingleProduct);
router.patch('/update-product', auth, upload.array('productImages', 4), productController.updateProduct);
router.delete('/delete/:id', auth, productController.deleteProduct);

export default router;
