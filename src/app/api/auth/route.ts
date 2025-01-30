import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { BadRequestError, NotFoundError } from "@/helper/customError";
import { User } from "@/model/userModel";
import { TokenPayload } from "@/types";


export async function GET(request:NextRequest) {
    try {
        await connect()
        const token = request.headers.get('Authorization')
        if(!token){
            throw new BadRequestError('Invalid Request')
        }
        const verify = jwt.verify(token,process.env.JWT_SECRET!) as TokenPayload
        const user = await User.findById(verify?.userId)
        if(!user) throw new NotFoundError('No User Found');
        return NextResponse.json({user},{status:200})
    } catch (error:any) {
        if(!error.statusCode) return NextResponse.json({error:'Invalid Token'},{status:403})
        return NextResponse.json({error:error.message},{status:error.status})
    }
}