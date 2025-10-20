import express from 'express';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/add-to-cart', auth, (req, res) => res.status(501).json({ message: 'Not implemented yet' }));
router.post('/add-product', auth, (req, res) => res.status(501).json({ message: 'Not implemented yet' }));
router.get('/get-all', auth, (req, res) => res.status(501).json({ message: 'Not implemented yet' }));
router.delete('/delete-cart-item', auth, (req, res) => res.status(501).json({ message: 'Not implemented yet' }));
router.patch('/update-quantity', auth, (req, res) => res.status(501).json({ message: 'Not implemented yet' }));

export default router;
