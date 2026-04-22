import useUser from "@/features/auth/useUser";
import {Navigate, Outlet} from "react-router";
import {Spinner} from "./ui/spinner";

function PublicOnlyRoutes() {
  const {isLoading, isAuthenticated} = useUser();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate replace to="/dashboard" />;
  }

  return <Outlet />;
}

export default PublicOnlyRoutes;
