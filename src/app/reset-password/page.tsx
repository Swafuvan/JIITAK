import { ResetPasswordPage } from "@/assets";
import { Loader } from "lucide-react";
import { Suspense } from "react";

export default function ResetPassword() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center">
          <Loader />
        </div>
      }
    >
      <ResetPasswordPage />
    </Suspense>
  );
}
