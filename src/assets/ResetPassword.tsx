"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/ui/Navbar";
import axios from "axios";

export function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!token) {
      formik.setFieldError("token", "無効なリセットトークンです。");
    }
  }, [token]);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "パスワードは6文字以上である必要があります。")
        .required("パスワードは必須です"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "パスワードが一致しません。")
        .required("確認パスワードは必須です"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      if (!token) {
        setErrors({ password: "無効なリセットトークンです。" });
        return;
      }

      setSubmitting(true);
      try {
        const response = await axios.post('/api/reset-password',{ token, password: values.password })

        if (response.status === 401) throw new Error(response?.data?.message);

        formik.setStatus("パスワードが正常にリセットされました。");
      } catch (error: any) {
        formik.setStatus(error.message || "エラーが発生しました");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Logo */}
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
            {/* Password Input */}
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
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "非表示" : "表示"}
              </button>
              {formik.touched.password && formik.errors.password && (
                <p className="text-start text-xs text-red-600">{formik.errors.password}</p>
              )}
            </div>

            {/* Confirm Password Input */}
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
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "非表示" : "表示"}
              </button>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className="text-start text-xs text-red-600">{formik.errors.confirmPassword}</p>
              )}
            </div>

            {formik.status && <p className="text-center text-green-600">{formik.status}</p>}

            <Button type="submit" className="w-full bg-orange-300 hover:bg-orange-400 rounded-full text-white" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? "更新中..." : "パスワードを更新"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
