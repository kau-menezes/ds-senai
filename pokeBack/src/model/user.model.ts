import mongoose, { Schema, Document} from "mongoose"

export interface IUser extends Document
{
    name : string,
    password : string
}

const UserSchema: Schema<IUser> = new Schema({
    id: {type: String},
    name: {type: String, required: true},
    password : {type: String, required: true}
});

const Task = mongoose.model<IUser>('User', UserSchema);

export default Task