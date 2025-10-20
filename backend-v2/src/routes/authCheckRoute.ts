import express from 'express';
import * as authCheck from '../modules/Auth/authController.js';

const router = express.Router();

router.get('/auth-check', authCheck.getUserType);

export default router;
