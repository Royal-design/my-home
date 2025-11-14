import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
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
import { loginSchema, type LoginFormValues } from "@/schemas/login";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { SocialLogin } from "./SocialLogin";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "@/services/authService";
import { toast } from "sonner";
import type { ApiResponse } from "@/utils/htttpRequest";
import { cn } from "@/lib/utils";
import { Spinner } from "./ui/spinner";
import { useAppDispatch } from "@/redux/hooks";
import { addLoginUser } from "@/redux/slices/authSlice";
import { HomeLogo } from "@/icons/HomeLogo";
import { setFormModal } from "@/redux/slices/modalSlice";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const res = await loginUser(values);

      if (res.success) {
        toast.success("Logged in successful!");

        dispatch(addLoginUser(res.data));
        navigate("/");
        form.reset();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      const err = error as ApiResponse;
      toast.error(err?.message || "Login  failed");
    }
  };

  return (
    <div className="">
      <div className="text-center space-y-4 mb-2">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 rounded-2xl shadow-lg bg-gradient-to-br from-blue-600 to-blue-700">
            <HomeLogo className="w-7 h-7 text-white" />
          </div>
          <div className="text-left">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              MyHome
            </h1>
            <p className="text-xs text-slate-600">
              Premium Real Estate Platform
            </p>
          </div>
        </div>
      </div>

      <Card className="border-2 border-slate-100 shadow-xl shadow-blue-100/50">
        <CardHeader className="text-center space-y-3 pb-6">
          <CardTitle className="text-2xl font-bold text-slate-800">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-base text-slate-600">
            Sign in to continue your property search
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
              noValidate
            >
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-slate-700 flex items-center space-x-2">
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
                    <FormMessage className="text-sm flex items-center space-x-1" />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-slate-700 flex items-center space-x-2">
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
                    <FormMessage className="text-sm flex items-center space-x-1" />
                  </FormItem>
                )}
              />

              {/* Remember & Forgot Password */}
              <div className="flex items-center justify-between text-sm pt-1">
                <label className="flex items-center space-x-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-slate-600 group-hover:text-slate-800 transition-colors">
                    Remember me
                  </span>
                </label>
                <Button
                  type="button"
                  onClick={() =>
                    dispatch(
                      setFormModal({ isOpen: true, type: "forgot-password" })
                    )
                  }
                  variant="link"
                  className="text-blue-600 hover:text-blue-700 font-semibold p-0 h-auto"
                >
                  Forgot password?
                </Button>
              </div>

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
                  "Sign in"
                )}
              </Button>
            </form>
          </Form>

          <SocialLogin />

          {/* Sign Up Link */}
          <p className="text-center text-sm text-slate-600 pt-2">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:underline hover:text-blue-700 font-semibold p-0 h-auto"
            >
              Sign up now
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
