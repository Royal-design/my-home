import { useAppSelector } from "@/redux/hooks";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { user } = useAppSelector((state) => state.auth);
  if (!user?.accessToken) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="">
      <Outlet />
    </div>
  );
};
