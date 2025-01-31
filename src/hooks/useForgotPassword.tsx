import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export function useForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const datas = await axios.post("/api/forgot-password", { email: email });
      if (datas.status === 200) {
        toast.success(
          "パスワード再設定用のURLを送信しました。メールを確認してください。"
        );
      } else if (datas.data.message === "email not-found") {
        toast.error(
          "パスワード再設定用URLの送信に失敗しました。もう一度お試しください。"
        );
      }
      
    } catch (error) {
      toast.error("サーバーエラーが発生しました。もう一度お試しください。");
      setMessage("Failed to send reset link. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleEmail = (e:any) => setEmail(e.target.value)
  return {handleSubmit,message,isSubmitting,email,handleEmail};
}
