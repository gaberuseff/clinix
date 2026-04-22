
import { supabase } from "./supabase";

export async function getCurrentUser() {
    const {
        data: { session },
        error,
    } = await supabase.auth.getSession();

    if (error) {
        throw new Error(error.message);
    }

    return session?.user ?? null;
}

export async function registerUser({
    email,
    password,
    fullName,
    phone,
    clinicName,
    clinicAddress,
    clinicSpecialty,
}) {
    const clinicId = crypto.randomUUID();

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                clinic_id: clinicId,
                full_name: fullName,
                phone,
                role: "doctor",
                clinic_name: clinicName,
                clinic_address: clinicAddress,
                clinic_specialty: clinicSpecialty,
            },
        },
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function createSecretaryUser({
    email,
    password,
    fullName,
    phone,
    clinicId,
}) {
    if (!clinicId) {
        throw new Error("Clinic ID is required to create a secretary account.");
    }

    const {
        data: { session: doctorSession },
        error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
        throw new Error(sessionError.message);
    }

    const doctorUserId = doctorSession?.user?.id ?? null;

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                clinic_id: clinicId,
                full_name: fullName,
                phone,
                role: "secretary",
            },
        },
    });

    if (error) {
        throw new Error(error.message);
    }

    // If signUp switched auth state to the new secretary, restore doctor session.
    if (
        doctorSession &&
        data?.session?.user?.id &&
        data.session.user.id !== doctorUserId
    ) {
        const { error: restoreError } = await supabase.auth.setSession({
            access_token: doctorSession.access_token,
            refresh_token: doctorSession.refresh_token,
        });

        if (restoreError) {
            throw new Error(
                "Secretary account was created, but doctor session could not be restored. Please sign in again."
            );
        }
    }

    return data;
}

export async function loginUser({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function logoutUser() {
    const { error } = await supabase.auth.signOut();

    if (error) {
        throw new Error(error.message);
    }
}

export async function passwordReset({ email }) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function updatePassword({ password }) {
    const { data, error } = await supabase.auth.updateUser({ password });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}