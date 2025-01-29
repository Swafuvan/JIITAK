"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Link, Loader2 } from "lucide-react";

import Navbar from "@/ui/Navbar"
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    try {
      // Handle password reset logic here
      // For now, just simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setMessage("Password reset link has been sent to your email")
    } catch (error) {
      setMessage("Failed to send reset link. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Logo */}
      <div className="fixed top-2 left-2">
        <Navbar/>
      </div>

      {/* Reset Form */}
      <div className="flex flex-col items-center justify-center min-h-screen max-w-md mx-auto px-4">
        <div className="w-full space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold">パスワード再設定</h1>
            <p className="text-sm font-medium text-gray-600">
                現在使っているメールアドレスを入力してください。<br />
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
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>

            {message && (
              <p className={`text-sm text-center ${message.includes("Failed") ? "text-red-600" : "text-green-600"}`}>
                {message}
              </p>
            )}

            <Button
              type="submit"
              className="w-full bg-orange-300 font-semibold rounded-full hover:bg-orange-400 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : "パスワード再設定用URLを送信する"}
            </Button>
          </form>

          <div className="text-center">
            <Link href="/login" className="text-sm text-gray-600 font-semibold hover:text-gray-800">
                ログイン画面にもどる
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

