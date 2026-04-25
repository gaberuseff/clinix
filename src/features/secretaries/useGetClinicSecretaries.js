import { getClinicSecretaries } from "@/services/apiSecretaries";
import { useQuery } from "@tanstack/react-query";

function useGetClinicSecretaries(clinicId) {
    const { data: secretaries, isPending: isSecretariesLoading, error } = useQuery({
        queryKey: ["clinicSecretaries", clinicId],
        queryFn: () => getClinicSecretaries(clinicId),
        enabled: !!clinicId,
    })

    return { secretaries, isSecretariesLoading, error };
}

export default useGetClinicSecretaries;