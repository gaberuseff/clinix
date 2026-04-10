import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import AppLayout from "./components/AppLayout";
import {Toaster} from "./components/ui/sonner";
import Customers from "./pages/Customers";
import Dashboard from "./pages/Dashboard";
import DiscountCodes from "./pages/DiscountCodes";
import Projects from "./pages/Projects";
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
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/discount-codes" element={<DiscountCodes />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}

export default AppRoutes;
