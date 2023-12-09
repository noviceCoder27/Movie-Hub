import { Request,Response } from "express";
import User from './../models/user';
import { IUser } from "./../models/user";
import Threads from './../models/threads';
import  { IThreads } from "./../models/threads";
import jwt, { Secret } from 'jsonwebtoken';
import { createActivity } from "./activityControllers";



export const getUserID = (req:Request) => {
    const userStr = req.headers["user"];
    if(typeof userStr === "string") {
        const user: IUser = JSON.parse(userStr);
        return user._id;
    } 
    return null;
}


export const register = async(req: Request,res: Response) => {
    const {userName,email,password} = req.body;
    const user = await (User as unknown as IUser).register(userName,email,password);
    if(user) {
        try {
            const createdUser = await User.create({...user,notify:false});
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
                const {userName,email,notify,profilePicture} = user;
                const userDetails = {userName,email,notify,profilePicture}
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

export const updateUserCredentials = async (req: Request, res: Response) => {
    const _id = getUserID(req);
    const { userName, email, profilePicture } = req.body;

    if (_id) {
        try {
            const user: IUser | null = await User.findOne({ _id });
            if (user) {
                try {
                    await User.findByIdAndUpdate(_id,{userName,email,profilePicture},{new: true});
                    res.status(200).json({ msg: 'User credentials updated successfully' });
                } catch(err) {
                    res.status(400).json({ msg: 'No user found' });
                }
            } else {
                res.status(400).json({ msg: 'No user found' });
            }
        } catch (err) {
            res.status(400).json({ msg: 'Error updating user credentials' });
        }
    } else {
        res.status(400).json({ msg: 'Invalid User' });
    }
};

export const disableNotify = async (req: Request, res: Response) => {
    const _id = getUserID(req);
    if (_id) {
        try {
            const user: IUser | null = await User.findOne({ _id });
            if (user) {
                try {
                    await User.findByIdAndUpdate(_id,{notify: false},{new: true});
                    res.status(200).json({ msg: 'Notify turned false' });
                } catch(err) {
                    res.status(400).json({ msg: 'No user found' });
                }
            } else {
                res.status(400).json({ msg: 'No user found' });
            }
        } catch (err) {
            res.status(400).json({ msg: 'Error occured' });
        }
    } else {
        res.status(400).json({ msg: 'Invalid User' });
    }
};

 const enableNotify = async (req: Request, res: Response, _id: string | undefined) => {
    if (_id) {
        try {
            const user: IUser | null = await User.findOne({ _id });
            if (user) {
                try {
                    await User.findByIdAndUpdate(_id,{notify: true},{new: true});
                } catch(err) {
                    console.log(err);
                }
            }
        } catch (err) {
            console.log(err);
        }
    } else {
        res.status(400).json({ msg: 'Invalid User' });
    }
};


export const addThread = async (req: Request,res: Response) => {
    const {title,description,movie_id} = req.body;
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
            const thread = await Threads.create({title,description,creator_id: _id,creator_name: creatorExists.userName,movie_id,discussion_box});
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
    const creatorExists: IUser| null = await User.findOne({_id:user_id}); 
    const thread: IThreads| null = await Threads.findOne({_id}); 
    if(!thread) {
        res.status(400).json({msg: "Thread doesn't exist "});
    } else if(content && user_id) {
        const {discussion_box} = thread;
        const {answers} = discussion_box;
        if(answers.length !== 0) {
            answer_id = answers[answers.length -1].answer_id + 1;
        }
        if(creatorExists) {
            const time = new Date();
            const answer = {content,comments: [],likes,dislikes,user_id,answer_id,user_name: creatorExists.userName,createdAt: time};
            answers.push(answer);
        }
        try {
            const thread = await Threads.findByIdAndUpdate(_id,{discussion_box: {answers}},{new: true});
            if(thread) {
                const creator_id = thread.creator_id;
                await User.findByIdAndUpdate(creator_id,{notify: true},{new:true});
                const actvity = await createActivity(req,res,thread_id,answer_id, "Someone added an answer");
                if(actvity) {
                    enableNotify(req,res,thread?.creator_id);
                    res.status(201).json(thread); 
                } else {
                    res.status(400).json({msg: "Error in notifications"});
                }
            } 
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
        const creatorExists: IUser| null = await User.findOne({_id:user_id}); 
        const answer = answers.find(answer => answer.answer_id === Number(answer_id));
        if(answer && creatorExists) {
            const {comments} = answer;
            if(comments.length !== 0) {
                comment_id = comments[comments.length -1].comment_id + 1;
            }
            const time = new Date();
            const comment = {content,likes,dislikes,comment_id,user_id,user_name: creatorExists.userName,createdAt: time};
            comments.push(comment);
            answers[answer_id].comments = comments;
            try {
                const thread = await Threads.findByIdAndUpdate(_id,{discussion_box: {answers}},{new: true});
                const {user_id} = answer;
                await User.findOneAndUpdate({_id: user_id},{notify: true});
                const actvity = await createActivity(req,res,thread_id,answer_id,"You got a reply");
                if(actvity) {
                    enableNotify(req,res,thread?.creator_id);
                    res.status(201).json(thread); 
                } else {
                    res.status(400).json({msg: "Error in notifications"});
                }
            } catch(err) {
                res.status(400).json({msg: "Thread doesn't exist"});
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
    if(!thread_id) {
        res.status(400).json({msg: "Invalid request"});
    } else {
        const thread: IThreads| null = await Threads.findOne({_id}); 
        if(thread) {
            const {discussion_box} = thread;
            const {answers} = discussion_box;
            const answer = answers.find(answer => answer.answer_id === Number(answer_id));
            answers[answer_id].likes++;
            try {
                const thread = await Threads.findByIdAndUpdate(_id,{discussion_box: {answers}},{new: true});
                if(answer) {
                    const {user_id} = answer;
                    await User.findOneAndUpdate({_id: user_id},{notify: true});
                }
                const actvity = await createActivity(req,res,thread_id,answer_id,"Your answer got a like");
                if(actvity) {
                    enableNotify(req,res,thread?.creator_id);
                    res.status(201).json(thread); 
                } else {
                    res.status(400).json({msg: "Error in notifications"});
                }
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
    if(!thread_id) {
        res.status(400).json({msg: "Invalid request"});
    } else {
        const thread: IThreads| null = await Threads.findOne({_id}); 
        if(thread) {
            const {discussion_box} = thread;
            const {answers} = discussion_box;
            const answer = answers.find(answer => answer.answer_id === Number(answer_id));
            answers[answer_id].likes--;
            try {
                const thread = await Threads.findByIdAndUpdate(_id,{discussion_box: {answers}},{new: true});
                if(answer) {
                    const {user_id} = answer;
                    await User.findOneAndUpdate({_id: user_id},{notify: true});
                }
                const actvity = await createActivity(req,res,thread_id,answer_id,"Your answer got a dislike");
                if(actvity) {
                    enableNotify(req,res,thread?.creator_id);
                    res.status(201).json(thread); 
                } else {
                    res.status(400).json({msg: "Error in notifications"});
                }
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
    if(!thread_id) {
        res.status(400).json({msg: "Invalid request"});
    } else {
        const thread: IThreads| null = await Threads.findOne({_id}); 
        if(thread) {
            const {discussion_box} = thread;
            const {answers} = discussion_box;
            const {comments} = answers[answer_id];
            const comment = comments.find(comment => comment.comment_id === Number(comment_id));
            comments[comment_id].likes++;
            try {
                const thread = await Threads.findByIdAndUpdate(_id,{discussion_box: {answers}},{new: true});
                if(comment) {
                    const {user_id} = comment;
                    await User.findOneAndUpdate({_id: user_id},{notify: true});
                }
                const actvity = await createActivity(req,res,thread_id,answer_id,"Your comment got a like");
                if(actvity) {
                    enableNotify(req,res,thread?.creator_id);
                    res.status(201).json(thread); 
                } else {
                    res.status(400).json({msg: "Error in notifications"});
                }
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
    if(!thread_id) {
        res.status(400).json({msg: "Invalid request"});
    } else {
        const thread: IThreads| null = await Threads.findOne({_id}); 
        if(thread) {
            const {discussion_box} = thread;
            const {answers} = discussion_box;
            const {comments} = answers[answer_id];
            const comment = comments.find(comment => comment.comment_id === Number(comment_id));
            comments[comment_id].likes--;
            try {
                const thread = await Threads.findByIdAndUpdate(_id,{discussion_box: {answers}},{new: true});
                if(comment) {
                    const {user_id} = comment;
                    await User.findOneAndUpdate({_id: user_id},{notify: true});
                }
                const actvity = await createActivity(req,res,thread_id,answer_id,"Your comment got a dislike");
                if(actvity) {
                    enableNotify(req,res,thread?.creator_id);
                    res.status(201).json(thread); 
                } else {
                    res.status(400).json({msg: "Error in notifications"});
                }
            } catch(err) {
                res.status(400).json({msg: "Error updating thread "});
            }
        } else {
            res.status(400).json({msg: "Thread doesn't exist "});
        }
    }
}