import { connect } from "@/dbConfig/dbConfig";
import { User } from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {email,password} = reqBody
        console.log(reqBody)
        const userData = await User.findOne({email})
        if(userData){
            const checked = await bcryptjs.compare(password,userData.password)
            if(checked){
                return NextResponse.json({status:200,userData})
            }else if(!checked){
                return NextResponse.json({status:401,message:"password not matched"})
            }
        }
        return NextResponse.json({status:401,messaage:"there is no User Found"})
    } catch (error) {
        console.log(error);
    } 
}