import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    DOB:String
},{timestamps:true});

export const User = mongoose.models.users || mongoose.model('users',userSchema);
