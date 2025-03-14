import mongoose, { Schema, Document} from "mongoose"

export interface ITask extends Document
{
    description : string,
    status : number
}

const UserSchema: Schema<ITask> = new Schema({
    id: {type: String},
    description: {type: String, required: true},
    status : {type: Number, required: true}
});

const Task = mongoose.model<ITask>('Task', UserSchema);

export default Task