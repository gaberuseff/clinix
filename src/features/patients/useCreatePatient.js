import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createPatient as createPatientApi } from "../../services/apiPatients";
import useUser from "../auth/useUser";

function useCreatePatient() {
    const { clinicId } = useUser();
    const queryClient = useQueryClient();

    const { mutate: createPatient, isPending: isCreatingPatient } = useMutation({
        mutationFn: (patientData) => createPatientApi(patientData),

        onSuccess: () => {
            toast.success("Patient account created successfully.");
            queryClient.invalidateQueries({ queryKey: ["clinicPatients", clinicId] });
        },

        onError: (error) => {
            toast.error("Could not create patient account.");
            console.error(error.message);
        },
    });

    return { createPatient, isCreatingPatient };
}

export default useCreatePatient;