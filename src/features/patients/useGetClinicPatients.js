import { getClinicPatients } from "@/services/apiPatients";
import { useQuery } from "@tanstack/react-query";

function useGetClinicPatients(clinicId, page = 1) {
    const { data, isPending: isPatientsLoading, error } = useQuery({
        queryKey: ["clinicPatients", clinicId, page],
        queryFn: () => getClinicPatients({ clinicId, page }),
        enabled: !!clinicId,
    });

    return {
        patients: data?.patients,
        totalCount: data?.totalCount,
        isPatientsLoading,
        error,
    };
}

export default useGetClinicPatients;