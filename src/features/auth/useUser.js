import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/services/apiAuth";

function useUser() {
    const { data: user, isPending } = useQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser,
        retry: false,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: true,
    });

    const isAuthenticated = !!user && user.role === "authenticated";
    const userMetadata = user?.user_metadata || {};
    const firstName = userMetadata.full_name ? userMetadata.full_name.split(" ")[0] : null;
    const clinicId = userMetadata.clinic_id || null;

    return {
        user,
        isLoading: isPending,
        isAuthenticated,
        userMetadata,
        firstName, clinicId
    };
}

export default useUser;
