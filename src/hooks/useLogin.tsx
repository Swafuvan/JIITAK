import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

export function useLogin() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("正しいメールアドレスを入力してください")
      .required("メールアドレスは必須です"),
    password: Yup.string()
      .min(6, "パスワードは6文字以上である必要があります")
      .required("パスワードは必須です"),
  });

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      setIsSubmitting(true);
      setLoading(true);
      console.log("Login attempt with:", values);
      const response = await axios.post("/api/login", values);

      if (response.status === 401 || response.status === 403) {
        toast.error("メールアドレスかパスワードに誤りがあります");
      } else if (response.status === 429) {
        toast.error(
          "お使いのアカウントは現在アクセスできません。ログインするには担当の管理者までお知らせください。"
        );
      } else if (response.status === 200 && response.data.userData) {
        router.push("/");
      } else {
        toast.error("ログインに失敗しました。もう一度お試しください。");
      }
    } catch (err: any) {
      toast.error(err.response.data.message+'jijjijij');
      
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };
  return {
    isSubmitting,
    handleSubmit,
    mounted,
    validationSchema,
    togglePassword,
    router,
    showPassword,
    loading
  };
}
