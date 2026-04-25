import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import AppLayout from "./components/AppLayout";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicOnlyRoutes from "./components/PublicOnlyRoutes";
import {Toaster} from "./components/ui/sonner";
import Dashboard from "./pages/Dashboard";
import DiscountCodes from "./pages/DiscountCodes";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Patients from "./pages/Patients";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Secretaries from "./pages/Secretaries";
import Settings from "./pages/Settings";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000, // 20 minutes
    },
  },
});

function AppRoutes() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate replace to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/secretaries" element={<Secretaries />} />
              <Route path="/discount-codes" element={<DiscountCodes />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>

          <Route element={<PublicOnlyRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}

export default AppRoutes;
