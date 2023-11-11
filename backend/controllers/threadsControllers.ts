import { Request,Response } from "express"
import Threads from './../models/threads'
import User from './../models/user'
import { IUser } from "./../models/user";
import { getUserID } from './userControllers';




export const getAllThreads = async (req:Request,res:Response) => {
    try {
        const threads = await Threads.find({});
        res.status(201).json(threads);
    } catch(err) {
        res.status(400).json({msg: "Error getting threads"});
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