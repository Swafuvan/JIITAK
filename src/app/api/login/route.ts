import { connect } from "@/dbConfig/dbConfig";
import { User } from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    await connect();
    const reqBody = await request.json();
    const { email, password } = reqBody;

    console.log(reqBody);
    const userData = await User.findOne({ email });
    console.log(userData);
    if (!userData) {
      return NextResponse.json({
        status: 403,
        message: "メールアドレスかパスワードに誤りがあります",
      });
    }

    if (userData.failedAttempts >= 3) {
      return NextResponse.json({
        status: 429,
        message: "Too many login attempts, account locked",
      });
    }

    const checked = await bcryptjs.compare(password, userData.password);

    if (!checked) {
      await User.updateOne({ email }, { $inc: { failedAttempts: 1 } });

      return NextResponse.json({
        status: 401,
        message: "メールアドレスかパスワードに誤りがあります",
      });
    }
    console.log("password correct");
    await User.updateOne({ email }, { failedAttempts: 0 });

    const JWTToken = jwt.sign(
      { userId: userData._id },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    const response = NextResponse.json({ status: 200, userData });
    response.cookies.set("token", JWTToken, { httpOnly: true });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
