import express from 'express';

const router = express.Router();

router.post('/success', (req, res) => res.status(501).json({ message: 'Not implemented yet' }));
router.post('/fail', (req, res) => res.status(501).json({ message: 'Not implemented yet' }));
router.post('/cancel', (req, res) => res.status(501).json({ message: 'Not implemented yet' }));
router.post('/ipn', (req, res) => {
  res.status(200).send('OK');
});

export default router;
