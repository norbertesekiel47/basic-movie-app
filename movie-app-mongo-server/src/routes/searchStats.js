import { Router } from 'express';
import { increment, trending } from '../controllers/searchStats.js';

const router = Router();

router.post('/', increment);
router.get('/trending', trending);

export default router;
