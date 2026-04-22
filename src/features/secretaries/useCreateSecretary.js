import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createSecretaryUser } from "@/services/apiAuth";

export function useCreateSecretary() {
    const queryClient = useQueryClient();

    const { mutateAsync: createSecretary, isPending } = useMutation({
        mutationFn: createSecretaryUser,
        onSuccess: () => {
            toast.success("Secretary account created successfully.");
            queryClient.invalidateQueries({ queryKey: ["clinicSecretaries"] });
        },
        onError: (error) => {
            toast.error(error.message || "Could not create secretary account.");
        },
    });

    return { createSecretary, isPending };
}
