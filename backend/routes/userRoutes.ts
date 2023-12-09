import express from 'express'
import { requireAuth } from './../middleware/requireAuth';
import {   
    register,
    login,
    addThread,
    addAnswer,
    addComment,
    likeAnswer, 
    dislikeAnswer,
    likeComment, 
    getUserInfo,
    dislikeComment, 
    updateUserCredentials,
    disableNotify} from '../controllers/userControllers';


const router = express.Router();



router.post('/register',register);
router.post('/login',login);
router.get('/getUserInfo',requireAuth,getUserInfo);
router.post('/addThread',requireAuth,addThread);
router.post('/addAnswer',requireAuth,addAnswer);
router.post('/addComment',requireAuth,addComment);
router.put('/likeAnswer',requireAuth,likeAnswer);
router.put('/dislikeAnswer',requireAuth,dislikeAnswer);
router.put('/likeComment',requireAuth,likeComment);
router.put('/dislikeComment',requireAuth,dislikeComment);
router.put('/updateUserCredentials',requireAuth,updateUserCredentials);
router.put('/disableNotification',requireAuth,disableNotify);

export default router