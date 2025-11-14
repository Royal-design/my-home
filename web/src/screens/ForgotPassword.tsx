import { useAppDispatch } from "@/redux/hooks";
import { setLoader, setFormModal } from "@/redux/slices/modalSlice";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/schemas/forgot-password";
import { forgotPassword } from "@/services/authService";
import type { ApiResponse } from "@/utils/htttpRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Mail } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

export const ForgotPassword = () => {
  const dispatch = useAppDispatch();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    dispatch(setLoader({ status: true }));
    try {
      const res = await forgotPassword(values);

      if (res.success) {
        toast.success(res.message);
        form.reset();
        dispatch(setFormModal({ isOpen: false, type: "", data: null }));
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
              <FormLabel className="text-sm font-semibold text-slate-700 flex items-center gap-2">
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
              <Spinner /> Sending Link…
            </>
          ) : (
            "Send Reset Link"
          )}
        </Button>
      </form>
    </Form>
  );
};
