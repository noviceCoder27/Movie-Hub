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
    dislikeComment } from '../controllers/userControllers';


const router = express.Router();



router.post('/register',register);
router.post('/login',login);
router.get('/getUserInfo',requireAuth,getUserInfo);
router.post('/addThread',requireAuth,addThread);
router.post('/addAnswer',requireAuth,addAnswer);
router.post('/addComment',requireAuth,addComment);
router.post('/likeAnswer',requireAuth,likeAnswer);
router.post('/dislikeAnswer',requireAuth,dislikeAnswer);
router.post('/likeComment',requireAuth,likeComment);
router.post('/dislikeComment',requireAuth,dislikeComment);

export default router