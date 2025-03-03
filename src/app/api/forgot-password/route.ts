import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { User } from "@/model/userModel"; 
import { connect } from "@/dbConfig/dbConfig";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    await connect();
    const { email } = await req.json();

    
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const JWTToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
    const resetToken = JWTToken
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000;
    const after = await user.save();
    if (after) {
     
      const transporter = nodemailer.createTransport({
        service: "Gmail", 
        auth: {
          user: process.env.EMAIL_USER, 
          pass: process.env.EMAIL_PASS, 
        },
      });

      const resetUrl = `${process.env.BASE_URL}/reset-password?token=${resetToken}`;
      console.log(resetUrl);
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "パスワードリセットのリクエスト",
        text: `パスワードリセットのリクエストを受け付けました。\n\n以下のリンクをクリックして新しいパスワードを設定してください:\n${resetUrl}\n\nこのリンクは1時間で無効になります。`,
        html: `<p>パスワードリセットのリクエストを受け付けました。</p>
               <p>以下のリンクをクリックして新しいパスワードを設定してください:</p>
               <a href="${resetUrl}" style="color: blue; font-weight: bold;">パスワードをリセット</a>
               <p>このリンクは1時間で無効になります。</p>`,
      };

      await transporter.sendMail(mailOptions);

      return NextResponse.json(
        { message: "パスワードリセットリンクがメールに送信されました" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "エラーが発生しました" },
      { status: 500 }
    );
  }
}
