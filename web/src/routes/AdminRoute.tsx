import { useAppSelector } from "@/redux/hooks";
import { Navigate, Outlet } from "react-router-dom";

export const AdminRoute = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user?.accessToken) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== "admin") {
    return (
      <div className="p-4 text-center">
        <h2 className="text-lg font-semibold text-red-600">
          You are not authorized to access this resource.
        </h2>
      </div>
    );
  }

  return <Outlet />;
};
