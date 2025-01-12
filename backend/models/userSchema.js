import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'recruiter'],
        required: true
    },
    profile: {
        bio: { type: String, default: '' },
        profilePicture: { type: String, default: '' },
        skills: [{ type: String }],
        resume: { type: String, default: '' },       //URL
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company'
        },
    }
}, { timestamps: true })

export const User = mongoose.model('User', userSchema)