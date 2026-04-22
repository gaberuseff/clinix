import useUser from "@/features/auth/useUser";
import {Navigate, Outlet, useLocation} from "react-router";
import {Spinner} from "./ui/spinner";

function ProtectedRoutes() {
  const {isLoading, isAuthenticated} = useUser();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate replace to="/login" state={{from: location}} />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;
