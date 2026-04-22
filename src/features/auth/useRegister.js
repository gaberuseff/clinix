import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { registerUser } from "@/services/apiAuth";

export function useRegister() {
    const navigate = useNavigate();

    const { mutateAsync: register, isPending: isRegistering } = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            toast.success("Account created successfully.");
            navigate("/login");
        },
        onError: (error) => {
            toast.error(error.message || "Could not create account.");
        },
    });

    return { register, isRegistering };
}
