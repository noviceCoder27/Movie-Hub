import mongoose, {Document} from 'mongoose'

const Schema = mongoose.Schema

export interface IActivity extends Document {
    thread_id: string,
    answer_id: number,
    user_id: string,
    content: string,
    movie_id: string
}


const ActivitesSchema = new Schema({
    thread_id: {type: String, required: true},
    answer_id: {type: Number,required: true},
    user_id: {type: String, required: true},
    content: {type: String, required: true},
    movie_id: {type: String, required: true},
},{timestamps: true})

export default mongoose.model<IActivity>("Activities", ActivitesSchema);