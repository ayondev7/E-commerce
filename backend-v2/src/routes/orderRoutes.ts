import express from 'express';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/add-order', auth, (req, res) => res.status(501).json({ message: 'Not implemented yet' }));
router.get('/get-all', auth, (req, res) => res.status(501).json({ message: 'Not implemented yet' }));
router.get('/get-seller-orders', auth, (req, res) => res.status(501).json({ message: 'Not implemented yet' }));
router.get('/get-seller-order/:id', auth, (req, res) => res.status(501).json({ message: 'Not implemented yet' }));
router.get('/get-payments', auth, (req, res) => res.status(501).json({ message: 'Not implemented yet' }));
router.patch('/update-status/:orderId', auth, (req, res) => res.status(501).json({ message: 'Not implemented yet' }));
router.get('/get-order-status-counts', auth, (req, res) => res.status(501).json({ message: 'Not implemented yet' }));

export default router;
