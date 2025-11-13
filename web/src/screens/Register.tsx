import { RegisterForm } from "@/components/register-form";
import { LandingLayout } from "@/layouts/LandingLayout";

export const Register = () => {
  return (
    <div>
      <LandingLayout className="md:w-[35%] mt-12 justify-center min-h-dvh">
        <RegisterForm />
      </LandingLayout>
    </div>
  );
};
