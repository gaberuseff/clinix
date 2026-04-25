import { deletePatient as deletePatientApi } from "../../services/apiPatients";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner"; 
import useUser from "../auth/useUser";

function useDeletePatient() {
    const { clinicId } = useUser();
    const queryClient = useQueryClient();

    const { mutate: deletePatient, isPending: isDeletingPatient } = useMutation({
        mutationFn: ({ patientId }) => deletePatientApi(patientId),

        onSuccess: () => {
            toast.success("Patient deleted successfully.");
            queryClient.invalidateQueries({ queryKey: ["clinicPatients", clinicId] });
        },

        onError: (error) => {
            toast.error(error?.message || "Could not delete patient.");
            console.error(error.message);
        },
    });

    return { deletePatient, isDeletingPatient };
}

export default useDeletePatient;