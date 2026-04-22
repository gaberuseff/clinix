import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { passwordReset } from "@/services/apiAuth";

export function useResetPassword() {
    const { mutateAsync: resetPassword, isPending: isResettingPassword } = useMutation({
        mutationFn: passwordReset,
        onSuccess: () => {
            toast.success("Password reset email sent. Check your inbox.");
        },
        onError: (error) => {
            toast.error(error.message || "Could not send reset password email.");
        },
    });

    return { resetPassword, isResettingPassword };
}
