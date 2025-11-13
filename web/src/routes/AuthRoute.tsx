import { useAppSelector } from "@/redux/hooks";
import { Navigate, Outlet } from "react-router-dom";

export const AuthRoute = () => {
  const { user } = useAppSelector((state) => state.auth);
  console.log(user?.accessToken);

  if (user?.accessToken) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
