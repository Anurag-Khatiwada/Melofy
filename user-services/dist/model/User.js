import mongoose, { Schema } from "mongoose";
const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true
    },
    playlist: [
        {
            type: String,
            required: true
        }
    ]
}, { timestamps: true });
schema.index({ name: 'text' });
export const User = mongoose.model("User", schema);
