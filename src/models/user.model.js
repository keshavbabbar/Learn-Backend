import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: ture,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    watchHistory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'videos'
    },
    email: {
        type: String,
        require: ture,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName: {
        type: String,
        require: ture,
        trim: true,
        index: true
    },
    avatar: {
        type: String,
        require: ture
    },
    coverImage: {
        type: String,
    },
    password: {
        type: String,
        require: [true, 'Password is required']
    },
    refreshToken: {
        type: String,
    },

}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next()
    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model('User', userSchema)