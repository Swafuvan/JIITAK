import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";
import {User} from "@/model/userModel"; // Import your User model if using a database

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Generate a reset token (valid for 1 hour)
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour expiry
    await user.save();

    // Create a transporter (use your SMTP settings)
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or use SMTP settings
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password or app password
      },
    });

    // Email details
    const resetUrl = `${process.env.BASE_URL}/reset-password?token=${resetToken}`;
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

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "パスワードリセットリンクがメールに送信されました" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "エラーが発生しました" }, { status: 500 });
  }
}
