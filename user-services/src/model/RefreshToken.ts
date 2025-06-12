import mongoose,{Document, Schema} from "mongoose";

interface IRefreshToken extends Document{
    token: String,
    user: mongoose.Schema.Types.ObjectId,
    expiresAt: Date
}

const schema: Schema<IRefreshToken> = new Schema({
    token:{
        type: String,
        required: true,
        unique: true

    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    expiresAt:{
        type: Date,
        required: true
    }
},{timestamps: true});

schema.index({expiresAt: 1}, {expireAfterSeconds: 0});

export const RefreshToken = mongoose.model<IRefreshToken>("RefreshToken", schema)