import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { loginUser } from "@/services/apiAuth";

export function useLogin() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const redirectTo = location.state?.from?.pathname || "/dashboard";

    const { mutateAsync: login, isPending: isLoggingIn } = useMutation({
        mutationFn: loginUser,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["user"] });
            toast.success("Logged in successfully.");
        },
        onError: (error) => {
            toast.error(error.message || "Invalid email or password.");
        },
    });

    const loginAndRedirect = async ({ email, password }) => {
        await login({ email, password });
        navigate(redirectTo, { replace: true });
    };

    return { loginAndRedirect, isLoggingIn };
}
