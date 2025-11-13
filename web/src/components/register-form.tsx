"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerSchema, type RegisterInput } from "@/schemas/register";

import { Mail, Lock, Eye, EyeOff, User, Phone } from "lucide-react";
import { SocialLogin } from "./SocialLogin";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";
import type { ApiResponse } from "@/utils/htttpRequest";
import { registerUser } from "@/services/authService";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (values: RegisterInput) => {
    try {
      const res = await registerUser(values);

      if (res.success) {
        toast.success("Registration successful!");
        form.reset();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      const err = error as ApiResponse;
      toast.error(err?.message || "Registration failed");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-2 border-slate-100 shadow-xl shadow-blue-100/50">
        <CardHeader className="text-center space-y-3 pb-6">
          <CardTitle className="text-2xl font-bold text-slate-800">
            Create an Account
          </CardTitle>
          <CardDescription className="text-base text-slate-600">
            Sign up to get started with our platform
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
              noValidate
            >
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center space-x-2 text-sm font-semibold text-slate-700">
                      <User className="w-4 h-4 text-blue-600" />
                      <span>Full Name</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        {...field}
                        className="min-h-12 border-2 border-slate-200 focus:border-blue-500 rounded-xl transition-all duration-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center space-x-2 text-sm font-semibold text-slate-700">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <span>Email Address</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        {...field}
                        className="min-h-12 border-2 border-slate-200 focus:border-blue-500 rounded-xl transition-all duration-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center space-x-2 text-sm font-semibold text-slate-700">
                      <Phone className="w-4 h-4 text-blue-600" />
                      <span>Phone Number</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="08012345678"
                        {...field}
                        className="min-h-12 border-2 border-slate-200 focus:border-blue-500 rounded-xl transition-all duration-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center space-x-2 text-sm font-semibold text-slate-700">
                      <Lock className="w-4 h-4 text-blue-600" />
                      <span>Password</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...field}
                          className="min-h-12 border-2 border-slate-200 focus:border-blue-500 rounded-xl pr-12 transition-all duration-200"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className={cn(
                  "w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transform hover:-translate-y-0.5 flex items-center justify-center",
                  form.formState.isSubmitting && "opacity-70 cursor-not-allowed"
                )}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Spinner />
                    Submitting
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          </Form>

          {/* Social Login */}
          <SocialLogin />

          {/* Login Link */}
          <p className="text-center text-sm text-slate-600 pt-2">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-blue-600 hover:underline hover:text-blue-700 font-semibold p-0 h-auto"
            >
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
