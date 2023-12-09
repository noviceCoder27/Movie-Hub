import express from 'express'
import { requireAuth } from '../middleware/requireAuth';
import { getUserActivities } from '../controllers/activityControllers';


const router = express.Router();

router.get('/userActivities',requireAuth,getUserActivities)


export default router;
