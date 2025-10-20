import express from 'express';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/add-to-list', auth, (req, res) => res.status(501).json({ message: 'Not implemented yet' }));
router.post('/create-list', auth, (req, res) => res.status(501).json({ message: 'Not implemented yet' }));
router.get('/get-all-lists', auth, (req, res) => res.status(501).json({ message: 'Not implemented yet' }));
router.get('/get-all', auth, (req, res) => res.status(501).json({ message: 'Not implemented yet' }));
router.delete('/delete-wishlist-item/:id', auth, (req, res) => res.status(501).json({ message: 'Not implemented yet' }));

export default router;
