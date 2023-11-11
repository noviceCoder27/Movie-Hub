import express from 'express'
import { requireAuth } from '../middleware/requireAuth'
import { getAllThreads, getUserThreads } from '../controllers/threadsControllers';


const router = express.Router();

router.get('/getAllThreads', getAllThreads);
router.get('/getUserThreads',requireAuth,getUserThreads);

export default router;
