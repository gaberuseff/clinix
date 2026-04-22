import { supabase } from "./supabase";

export async function createInvite(inviteData) {
    const { data, error } = await supabase
        .from("invites")
        .insert(inviteData)
        .select("email, clinic_id, status, token, created_at")
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function getInvites(clinicId) {
    let query = supabase
        .from("invites")
        .select("email, clinic_id, status, token, created_at")
        .order("created_at", { ascending: false });

    if (clinicId) {
        query = query.eq("clinic_id", clinicId);
    }

    const { data, error } = await query;

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function getClinicSecretaries(clinicId) {
    const { data, error } = await supabase
        .from("users")
        .select("id, email, full_name, phone, role, created_at")
        .eq("role", "secretary")
        .eq("clinic_id", clinicId)
        .order("created_at", { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}