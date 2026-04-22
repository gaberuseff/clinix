import { logoutUser } from "@/services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function useLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutateAsync: logout, isPending: isLoggingOut } = useMutation({
        mutationFn: logoutUser,

        onSuccess: () => {
            toast.success("Logged out successfully.");
            queryClient.setQueryData(["user"], null);
            queryClient.invalidateQueries({ queryKey: ["user"] });
            navigate("/login", { replace: true });

        },

        onError: (error) => {
            toast.error(error.message || "Could not log out.");
        },
    })

    return { logout, isLoggingOut };
}