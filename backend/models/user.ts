import mongoose, {Document} from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;


export interface IUser extends Document {
    _id: string,
    userName: string,
    password: string,
    email: string,
    notify: boolean,
    profilePicture?: string,
    threads?: string[],
    activities?: string[],
    register: (userName: string, email: string,password: string) => Promise<IUser> | Promise<null>,
    login: (userName: string, email: string,password: string) => Promise<IUser> | Promise<null>
}

const UserSchema = new Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    notify: {type: Boolean, required: true},
    profilePicture: {type: String},
    threads: {type: Array<String>},
    activities: {type: Array<String>}
},{timestamps: true});

UserSchema.statics.register = async function (userName,email,password) {
    if(!userName || !email || !password) {
        return null;
    }
    if(!validator.isEmail(email)) {
        return null;
    }
    const exists = await this.findOne({email});
    if(exists) {
        return null;
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
    const user = {userName,email,password: hash};
    return user;
}

UserSchema.statics.login = async function (userName,email,password) {
    if(!userName || !email || !password) {
        return null;
    }
    if(!validator.isEmail(email)) {
        return null;
    }
    const user = await this.findOne({email});
    const verified = await bcrypt.compare(password,user.password);
    if(verified) {
        return user;
    } else {
        return null;
    }
}

export default mongoose.model("User",UserSchema)


