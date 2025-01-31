"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/ui/Navbar";
import { useResetpassword } from "@/hooks";

export function ResetPasswordPage() {
  const {
    formik,
    handleConfirmPassword,
    handleShowPassword,
    showConfirmPassword,
    showPassword,
    token,
    router
  } = useResetpassword();

  if(!token){
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-2 left-2">
        <Navbar />
      </div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-2xl font-semibold text-center">パスワード設定</h1>
          <p className="text-center">
            パスワードを入力後 [設定ボタン] を押してサービスの <br />
            利用を開始してください。
          </p>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="relative">
              <label className="text-sm font-semibold">パスワード</label>
              <Input
                type={showPassword ? "text" : "password"}
                {...formik.getFieldProps("password")}
                className="pr-16"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 top-5 flex items-center text-black text-sm"
                onClick={handleShowPassword}
              >
                {showPassword ? "非表示" : "表示"}
              </button>
              {formik.touched.password && formik.errors.password && (
                <p className="text-start text-xs text-red-600">
                  {formik.errors.password}
                </p>
              )}
            </div>

            <div className="relative">
              <label className="text-sm font-semibold">パスワード確認用</label>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                {...formik.getFieldProps("confirmPassword")}
                className="pr-16"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 top-5 flex items-center text-black text-sm"
                onClick={handleConfirmPassword}
              >
                {showConfirmPassword ? "非表示" : "表示"}
              </button>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-start text-xs text-red-600">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>

            {formik.status && (
              <p className="text-center text-green-600">{formik.status}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-orange-300 hover:bg-orange-400 rounded-full text-white"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "更新中..." : "パスワードを更新"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
