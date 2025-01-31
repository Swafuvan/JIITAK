"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import Navbar from "@/ui/Navbar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useLogin } from "@/hooks";
import { LoadingPage } from "@/ui/Loading";
import { useEffect } from "react";


export function LoginPage() {
  const {
    mounted,
    handleSubmit,
    showPassword,
    validationSchema,
    togglePassword,
    isSubmitting,
    loading,
    isLoading,
    setIsLoading
  } = useLogin();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 2000);
    return () => clearTimeout(timer); 
  }, []);

  if (!mounted || isLoading) return <LoadingPage/>; 

  return (
    <div>
      <div className="min-h-screen bg-white">
        <div className="fixed top-2 left-2">
          <Navbar />
        </div>

        <div className="flex flex-col items-center justify-center min-h-screen max-w-md mx-auto px-4">
          <div className="w-full space-y-6">
            <h1 className="text-2xl font-semibold text-center mb-8">
              ログイン
            </h1>

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold">
                      メールアドレス
                    </label>
                    <Field as={Input} id="email" name="email" type="email" />
                    <ErrorMessage
                      name="email"
                      component="span"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-semibold">
                      パスワード
                    </label>
                    <div className="relative">
                      <Field
                        as={Input}
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                      />
                      <button
                        type="button"
                        onClick={togglePassword}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <Eye className="h-5 w-5" />
                        ) : (
                          <EyeOff className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    <ErrorMessage
                      name="password"
                      component="span"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-orange-300 rounded-full hover:bg-orange-400 text-white flex justify-center items-center"
                    disabled={loading || isSubmitting}
                  >
                    {loading || isSubmitting ? (
                      <Loader2 className="animate-spin h-5 w-5" />
                    ) : (
                      "ログイン"
                    )}
                  </Button>
                </Form>
              )}
            </Formik>

            <div className="text-center">
              <Link
                href="/forgot-password"
                className="text-sm font-semibold text-gray-600 hover:text-gray-800"
              >
                パスワードをお忘れの場合
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
