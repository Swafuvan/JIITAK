"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import Navbar from "@/ui/Navbar"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault()
      console.log("Login attempt with:", formData);
      const response = await axios.post('/api/login',formData);
      if(response.status === 401){
        toast.error('メールアドレスかパスワードに誤りがあります')
      }else if(response.status === 402){
        toast.error('お使いのアカウントは現在アクセスできません。ログインするには担当の管理者までお知らせください。')
      }else if(response.status === 200 && response.data.userData){
        router.push('/')
      }
    } catch (err:any) {
      toast.error('ログインに失敗しました。もう一度お試しください。',err)
    }finally{

    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Logo */}
      <div className="fixed top-2 left-2">
        <Navbar />
      </div>

      {/* Login Form */}
      <div className="flex flex-col items-center justify-center min-h-screen max-w-md mx-auto px-4">
        <div className="w-full space-y-6">
          <h1 className="text-2xl font-semibold text-center mb-8">ログイン</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold">
                メールアドレス
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <span></span>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-semibold">
                パスワード
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "password" : "text"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <span></span>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full bg-orange-300 rounded-full hover:bg-orange-400 text-white">
              ログイン
            </Button>
          </form>

          <div className="text-center">
            <Link href="/forgot-password" className="text-sm font-semibold text-gray-600 hover:text-gray-800">
              パスワードをお忘れの場合
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

