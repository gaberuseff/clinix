import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { editPatient as editPatientApi } from "../../services/apiPatients";
import useUser from "../auth/useUser";

function useEditPatient() {
    const { clinicId } = useUser();
    const queryClient = useQueryClient();

    const { mutate: editPatient, isPending: isEditingPatient } = useMutation({
        mutationFn: ({ patientId, patientData }) => editPatientApi({ patientId, patientData }),

        onSuccess: () => {
            toast.success("Patient data updated successfully.");
            queryClient.invalidateQueries({ queryKey: ["clinicPatients", clinicId] });
        },

        onError: (error) => {
            toast.error(error?.message || "Could not update patient data.");
            console.error(error.message);
        },
    });

    return { editPatient, isEditingPatient };
}

export default useEditPatient;
