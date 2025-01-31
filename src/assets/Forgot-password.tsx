"use client";

import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import Navbar from "@/ui/Navbar";
import { Button } from "@/components/ui/button";
import { useForgotPassword } from "@/hooks";

export function ForgotPasswordPage() {
  const { email, handleSubmit, isSubmitting, message, handleEmail } =
    useForgotPassword();

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-2 left-2">
        <Navbar />
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen max-w-md mx-auto px-4">
        <div className="w-full space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold">パスワード再設定</h1>
            <p className="text-sm font-medium text-gray-600">
              現在使っているメールアドレスを入力してください。
              <br />
              パスワード再設定用のURLをメールで送信いたします。
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold">
                メールアドレス
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={handleEmail}
                required
                disabled={isSubmitting}
              />
            </div>

            {message && (
              <p
                className={`text-sm text-center ${
                  message.includes("Failed") ? "text-red-600" : "text-green-600"
                }`}
              >
                {message}
              </p>
            )}

            <Button
              type="submit"
              className="w-full bg-orange-300 font-semibold rounded-full hover:bg-orange-400 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                "パスワード再設定用URLを送信する"
              )}
            </Button>
          </form>

          <div className="text-center">
            <Link
              href="/login"
              className="text-sm text-gray-600 font-semibold hover:text-gray-800"
            >
              ログイン画面にもどる
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
