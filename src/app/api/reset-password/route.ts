import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/model/userModel";
import { connect } from "@/dbConfig/dbConfig";

export async function POST(req: NextRequest) {
    try {
        await connect();
        const { token, password } = await req.json();
        if (!token || !password) {
            return NextResponse.json({ message: "トークンとパスワードが必要です。" }, { status: 400 });
        }

        const user = await User.findOne({ resetToken: token });
        if (!user) {
            return NextResponse.json({ message: "無効なまたは期限切れのトークンです。" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.resetToken = null;
        await user.save();

        return NextResponse.json({ message: "パスワードが正常にリセットされました。" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "サーバーエラーが発生しました。" }, { status: 500 });
    }
}
