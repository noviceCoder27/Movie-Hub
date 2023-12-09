import { Request,Response } from "express";
import { getUserID } from "./userControllers";
import Activity from './../models/activities';
import User, { IUser } from './../models/user';
import Threads from './../models/threads'


export const getUserActivities = async(req: Request,res:Response) => {
    const _id = getUserID(req);
    if(_id) {
        try {
            const activities = await Activity.find({user_id: _id});
            res.status(200).json(activities);
        } catch(err) {
            res.status(404).json({msg: "No activities"});
        }
    } else {
        res.status(400).json({msg: "Unauthorized access"});
    }
}

export const createActivity = async(req: Request,res: Response,thread_id:string,answer_id: number, content: string) => {
    const _id = getUserID(req);
    const thread = await Threads.findOne({_id: thread_id});
    if(thread_id && (answer_id !== undefined || null) && _id && thread) {
        const {movie_id} = thread;
        try {
            const activity = await Activity.create({thread_id,answer_id,user_id: _id,content,movie_id});
            try {
                const user = await User.findOne({_id}) as unknown as IUser;
                const {activities} = user;
                let updatedActivities = activities;
                if(activities) {
                    if(!activities.length) {
                        updatedActivities = [String(activity._id)];
                    } else {
                        updatedActivities = [...activities,String(activity._id)];
                    }
                }
                try {
                    await User.findByIdAndUpdate(_id, {activities: updatedActivities},{new: true});
                    return true;
                } catch(err) {
                    return false;
                }
            } catch(err) {
                return false;
            }
        } catch(err) {
            return false;
        }
    } else {
        return false;
    }
}

