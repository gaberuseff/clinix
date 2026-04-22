import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { updatePassword } from "@/services/apiAuth";

export function useUpdatePassword() {
    const navigate = useNavigate();

    const { mutateAsync: saveNewPassword, isPending: isUpdatingPassword } = useMutation({
        mutationFn: updatePassword,
        onSuccess: () => {
            toast.success("Password updated successfully.");
            navigate("/login", { replace: true });
        },
        onError: (error) => {
            toast.error(error.message || "Could not update password.");
        },
    });

    return { saveNewPassword, isUpdatingPassword };
}
