import express from 'express'
import { requireAuth } from '../middleware/requireAuth'
import { getThreads, getUserThreads } from '../controllers/threadsControllers';


const router = express.Router();

router.get('/getThreads', getThreads);
router.get('/getUserThreads',requireAuth,getUserThreads);

export default router;
