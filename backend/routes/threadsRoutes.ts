import express from 'express'
import { requireAuth } from '../middleware/requireAuth'
import { getThread, getThreads, getUserThreads } from '../controllers/threadsControllers';


const router = express.Router();

router.get('/getThreads', getThreads);
router.get('/getUserThreads',requireAuth,getUserThreads);
router.get('/getThread',requireAuth,getThread);

export default router;
