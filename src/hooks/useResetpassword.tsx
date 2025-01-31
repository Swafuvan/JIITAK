import axios from "axios";
import { useFormik } from "formik";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as Yup from "yup";

export function useResetpassword() {
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
        const response = await axios.post("/api/reset-password", {
          token,
          password: values.password,
        });

        if (response.status === 401) throw new Error(response?.data?.message);

        formik.setStatus("パスワードが正常にリセットされました。");
      } catch (error: any) {
        formik.setStatus(error.message || "エラーが発生しました");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  return {
    formik,
    token,
    showPassword,
    showConfirmPassword,
    handleConfirmPassword,
    handleShowPassword,
  };
}
