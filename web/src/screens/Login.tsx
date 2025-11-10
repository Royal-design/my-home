import { LoginForm } from "@/components/login-form";
import { LandingLayout } from "@/layouts/LandingLayout";

export const Login = () => {
  return (
    <div>
      <LandingLayout className="md:w-[40%] h-dvh">
        <LoginForm />
      </LandingLayout>
    </div>
  );
};
