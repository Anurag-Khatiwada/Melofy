import mongoose,{Document, Schema} from "mongoose";

export interface IUser extends Document{
    name: String,
    email: String,
    password: String,
    role: String,
    playlist: String[]
}

const schema: Schema<IUser> = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true
    },
    playlist: [
        {
            type: String,
            required: true
        }
    ]
},{timestamps: true});

schema.index({name: 'text'});

export const User = mongoose.model<IUser>("User", schema)