import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    DOB: String,
    failedAttempts: { type: Number, default: 0 },
    lockoutTime: { type: Date, default: null },
}, { timestamps: true });


export const User = mongoose.models.users || mongoose.model('users', userSchema);
