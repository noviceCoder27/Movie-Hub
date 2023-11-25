import { Request,Response } from "express"
import Threads from './../models/threads'
import User from './../models/user'
import { IUser } from "./../models/user";
import { getUserID } from './userControllers';




export const getThreads = async (req:Request,res:Response) => {
    const {movie_id} = req.headers;
    if(movie_id) {
        try {
            const threads = await Threads.find({movie_id});
            res.status(201).json(threads);
        } catch(err) {
            res.status(400).json({msg: "Error getting threads"});
        }
    } else {
        res.status(400).json({msg: "Enter valid movie"});
    }
}

export const getUserThreads = async (req:Request,res:Response) => {
    const _id = getUserID(req);
    if(_id) {
        try {
            const user: IUser | null = await User.findOne({_id});
            if(user) {
                const {threads: threadIDs} = user;
                if(threadIDs) {
                    for(const threadID of threadIDs) {
                        const threads = await Threads.find({_id: threadID});
                        res.status(201).json(threads);
                    } 
                } else {
                    res.status(201).json({msg: []});
                }
            } else {
                res.status(400).json({msg: "No user"});
            }
        } catch(err) {
            res.status(400).json({msg: "Error getting threads"});
        }
    } else {
        res.status(400).json({msg: "Invalid User"});
    }
}

export const getThread = async (req:Request,res:Response) => {
    const {thread_id} = req.headers;
    if(thread_id) {
        const _id = thread_id;
        try {
            const thread = await Threads.findOne({_id});
            res.status(201).json(thread);
        } catch(err) {
            res.status(400).json({msg: "Error getting thread"});
        }
    } else {
        res.status(400).json({msg: "Inavlid thread"});
    }
}