import express from 'express';
import auth from '../../middleware/auth.js';

const router = express.Router();

router.post('/create', auth, (req, res) => res.status(501).json({ message: 'Not implemented yet' }));
router.get('/get-all', auth, (req, res) => res.status(501).json({ message: 'Not implemented yet' }));
router.get('/shop/get-all', auth, (req, res) => res.status(501).json({ message: 'Not implemented yet' }));
router.get('/shop/get-product/:id', auth, (req, res) => res.status(501).json({ message: 'Not implemented yet' }));
router.post('/get-all-by-id', auth, (req, res) => res.status(501).json({ message: 'Not implemented yet' }));
router.get('/search', auth, (req, res) => res.status(501).json({ message: 'Not implemented yet' }));
router.get('/get-product/:id', auth, (req, res) => res.status(501).json({ message: 'Not implemented yet' }));
router.patch('/update-product', auth, (req, res) => res.status(501).json({ message: 'Not implemented yet' }));
router.delete('/delete/:id', auth, (req, res) => res.status(501).json({ message: 'Not implemented yet' }));

export default router;
