"use client";

import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setLoader } from "@/redux/slices/modalSlice";

import type { ApiResponse } from "@/utils/htttpRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/schemas/resetPasswordSchema";
import { Spinner } from "@/components/ui/spinner";
import { resetPassword } from "@/services/authService";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LandingLayout } from "@/layouts/LandingLayout";

export const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");
  const token = searchParam.get("token");
  const navigate = useNavigate();
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: ResetPasswordFormValues) => {
    dispatch(setLoader({ status: true }));

    try {
      const res = await resetPassword(id!, token!, {
        password: values.password,
      });

      if (res.success) {
        toast.success(res.message);
        navigate("/signin");
        form.reset();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      const err = error as ApiResponse;
      toast.error(err?.message);
    } finally {
      dispatch(setLoader({ status: false }));
    }
  };

  return (
    <div className="">
      <LandingLayout className="md:w-[35%] mt-12 justify-center min-h-dvh">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 border shadow-sm p-4"
            noValidate
          >
            <h2 className="text-xl mb-8 font-bold">Reset Password</h2>
            {/* New Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-blue-600" />
                    <span>New Password</span>
                  </FormLabel>

                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        {...field}
                        className="min-h-12 border-2 border-slate-200 focus:border-blue-500 rounded-xl pr-12 transition-all duration-200"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>

                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-blue-600" />
                    <span>Confirm Password</span>
                  </FormLabel>

                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirm ? "text" : "password"}
                        placeholder="Confirm new password"
                        {...field}
                        className="min-h-12 border-2 border-slate-200 focus:border-blue-500 rounded-xl pr-12 transition-all duration-200"
                      />

                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showConfirm ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>

                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className={cn(
                "w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 flex items-center justify-center",
                form.formState.isSubmitting && "opacity-70 cursor-not-allowed"
              )}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Spinner /> Resetting…
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        </Form>
      </LandingLayout>
    </div>
  );
};
