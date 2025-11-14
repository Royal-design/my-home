import { useAppSelector } from "@/redux/hooks";
import { ModalDisplay } from "./ModalDisplay";
import { ForgotPassword } from "@/screens/ForgotPassword";

export const ShowModal = () => {
  const { type, data } = useAppSelector((state) => state?.modal.formModal);
  return (
    <div>
      {type === "forgot-password" ? (
        <ModalDisplay title="Forgot Password" children={<ForgotPassword />} />
      ) : null}
    </div>
  );
};
