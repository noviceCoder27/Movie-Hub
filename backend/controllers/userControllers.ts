import { Request,Response } from "express"
import User from './../models/user'
import { IUser } from "./../models/user";
import Threads from './../models/threads'
import  { IThreads } from "./../models/threads";
import jwt, { Secret } from 'jsonwebtoken'



export const getUserID = (req:Request) => {
    const userStr = req.headers["user"];
    if(typeof userStr === "string") {
        const user: IUser = JSON.parse(userStr);
        return user._id;
    }
}


export const register = async(req: Request,res: Response) => {
    const {userName,email,password} = req.body;
    const user = await (User as unknown as IUser).register(userName,email,password);
    if(user) {
        try {
            const createdUser = await User.create(user);
            const secret = process.env.SECRET as Secret
            const token = jwt.sign({_id: createdUser._id},secret, {expiresIn: "2h"});
            res.status(201).json({msg: "User created sucessfully",token});
        } catch(err) {
            res.status(400).json({msg: "Failed to register"});
        }
    } else {
        res.status(400).json({msg: "Failed to register"});
    }
}

export const login = async(req: Request,res: Response) => {
    const {userName,email,password} = req.body;
    try {
        const user = await (User as unknown as IUser).login(userName,email,password);
        if(user) {
            const secret = process.env.SECRET as Secret
            const token = jwt.sign({_id: user._id},secret, {expiresIn: "2h"});
            res.status(201).json({msg: "User logged in successfully",token});
        } else {
            res.status(400).json({msg: "Failed to login"});
        }
        
    } catch(err) {
        res.status(400).json({msg: "User not found"});
    }
}

export const getUserInfo = async(req: Request,res: Response) => {
    const _id = getUserID(req);
    if(_id) {
        try {
            const user: IUser | null = await User.findOne({_id});
            if(user) {
                const {userName,email,profilePic} = user;
                const userDetails = {userName,email,profilePic}
                res.status(201).json(userDetails);
            } else {
                res.status(400).json({msg: "No user"});
            }
        } catch(err) {
            res.status(400).json({msg: "Error finding user"})
        }
    } else {
        res.status(400).json({msg: "Invalid user id"})
    }
}

export const addThread = async (req: Request,res: Response) => {
    const {title,description} = req.body;
    const _id = getUserID(req);
    const threadExists = await Threads.findOne({title,description});
    const creatorExists: IUser| null = await User.findOne({_id}); 
    if(threadExists) {
        res.status(400).json({msg: "Duplicate thread"});
    } else if(!creatorExists) {
        res.status(400).json({msg: "Invalid User"});
    } else if(title && description && _id) {
        const discussion_box = {answers: []};
        try {
            const thread = await Threads.create({title,description,creator_id: _id,discussion_box});
            const {threads} = creatorExists
            if(threads) {
                await User.findByIdAndUpdate(_id,{threads: [...threads,thread._id]},{new: true});
                res.status(201).json(thread);
            } else {
                res.status(400).json({msg: "Error updating threads in user"});
            }
            
        } catch(err) {
            res.status(400).json({msg: "Failed to create thread"});
        }
    } else {
        res.status(400).json({msg: "Invalid input received"});
    }
}

export const addAnswer = async (req: Request,res: Response) => {
    const {thread_id,content} = req.body;
    const likes =0; 
    const dislikes = 0
    let answer_id = 0;
    const _id = thread_id;
    const user_id = getUserID(req);
    const thread: IThreads| null = await Threads.findOne({_id}); 
    if(!thread) {
        res.status(400).json({msg: "Thread doesn't exist "});
    } else if(content && user_id) {
        const {discussion_box} = thread;
        const {answers} = discussion_box;
        if(answers.length !== 0) {
            answer_id = answers[answers.length -1].answer_id + 1;
        }
        const answer = {content,comments: [],likes,dislikes,user_id,answer_id};
        answers.push(answer);
        try {
            const thread = await Threads.findByIdAndUpdate(_id,{discussion_box: {answers}},{new: true});
            res.status(201).json(thread); 
        } catch(err) {
            res.status(400).json({msg: "Thread doesn't exist "});
        }
    } else {
        res.status(400).json({msg: "Invalid input received"});
    }
}

export const addComment = async (req: Request,res: Response) => {
    const {thread_id,answer_id,content} = req.body;
    const likes = 0; 
    const dislikes = 0
    let comment_id = 0;
    const _id = thread_id;
    const user_id = getUserID(req);
    const thread: IThreads| null = await Threads.findOne({_id}); 
    if(!thread) {
        res.status(400).json({msg: "Thread doesn't exist "});
    } else if(content && user_id) {
        const {discussion_box} = thread;
        const {answers} = discussion_box;
        const answer = answers.find(answer => answer.answer_id === Number(answer_id));
        if(answer) {
            const {comments} = answer;
            if(comments.length !== 0) {
                comment_id = comments[comments.length -1].comment_id + 1;
            }
            const comment = {content,likes,dislikes,comment_id,user_id};
            comments.push(comment);
            answers[answer_id].comments = comments;
            try {
                const thread = await Threads.findByIdAndUpdate(_id,{discussion_box: {answers}},{new: true});
                res.status(201).json(thread); 
            } catch(err) {
                res.status(400).json({msg: "Thread doesn't exist "});
            }
        } else {
            res.status(400).json({msg: "Answer not found"});
        }
       
    } else {
        res.status(400).json({msg: "Invalid input received"});
    }
}

export const likeAnswer = async(req:Request,res:Response) => {
    const {thread_id,answer_id} = req.body;
    const _id = thread_id;
    if(!thread_id || !answer_id) {
        res.send(400).json({msg: "Invalid request"});
    } else {
        const thread: IThreads| null = await Threads.findOne({_id}); 
        if(thread) {
            const {discussion_box} = thread;
            const {answers} = discussion_box;
            answers[answer_id].likes++;
            try {
                const thread = await Threads.findByIdAndUpdate(_id,{discussion_box: {answers}},{new: true});
                res.status(201).json(thread); 
            } catch(err) {
                res.status(400).json({msg: "Error updating thread "});
            }
        } else {
            res.status(400).json({msg: "Thread doesn't exist "});
        }
    }
    
}

export const dislikeAnswer = async(req:Request,res:Response) => {
    const {thread_id,answer_id} = req.body;
    const _id = thread_id;
    if(!thread_id || !answer_id) {
        res.send(400).json({msg: "Invalid request"});
    } else {
        const thread: IThreads| null = await Threads.findOne({_id}); 
        if(thread) {
            const {discussion_box} = thread;
            const {answers} = discussion_box;
            answers[answer_id].likes--;
            try {
                const thread = await Threads.findByIdAndUpdate(_id,{discussion_box: {answers}},{new: true});
                res.status(201).json(thread); 
            } catch(err) {
                res.status(400).json({msg: "Error updating thread "});
            }
        } else {
            res.status(400).json({msg: "Thread doesn't exist "});
        }
    }
    
}

export const likeComment = async(req:Request,res:Response) => {
    const {thread_id,answer_id,comment_id} = req.body;
    const _id = thread_id;
    if(!thread_id || !answer_id || !comment_id) {
        res.send(400).json({msg: "Invalid request"});
    } else {
        const thread: IThreads| null = await Threads.findOne({_id}); 
        if(thread) {
            const {discussion_box} = thread;
            const {answers} = discussion_box;
            const {comments} = answers[answer_id];
            comments[comment_id].likes++;
            try {
                const thread = await Threads.findByIdAndUpdate(_id,{discussion_box: {answers}},{new: true});
                res.status(201).json(thread); 
            } catch(err) {
                res.status(400).json({msg: "Error updating thread "});
            }
        } else {
            res.status(400).json({msg: "Thread doesn't exist "});
        }
    }
}

export const dislikeComment = async(req:Request,res:Response) => {
    const {thread_id,answer_id,comment_id} = req.body;
    const _id = thread_id;
    if(!thread_id || !answer_id || !comment_id) {
        res.send(400).json({msg: "Invalid request"});
    } else {
        const thread: IThreads| null = await Threads.findOne({_id}); 
        if(thread) {
            const {discussion_box} = thread;
            const {answers} = discussion_box;
            const {comments} = answers[answer_id];
            comments[comment_id].likes--;
            try {
                const thread = await Threads.findByIdAndUpdate(_id,{discussion_box: {answers}},{new: true});
                res.status(201).json(thread); 
            } catch(err) {
                res.status(400).json({msg: "Error updating thread "});
            }
        } else {
            res.status(400).json({msg: "Thread doesn't exist "});
        }
    }
}