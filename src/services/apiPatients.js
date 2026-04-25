import { PAGE_SIZE } from "@/lib/utils";
import { supabase } from "./supabase";


export async function getClinicPatients({ clinicId, page = 1 }) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, error, count } = await supabase
        .from("patients")
        .select("id, name, phone, birth_year, gender", { count: "exact" })
        .eq("clinic_id", clinicId)
        .order("created_at", { ascending: false })
        .range(from, to);

    if (error) {
        throw new Error(error.message);
    }

    return { patients: data, totalCount: count };
}

export async function createPatient(patientData) {
    const { error } = await supabase.rpc("insert_patient", {
        p_name: patientData.name,
        p_phone: patientData.phone,
        p_birth_year: patientData.birth_year,
        p_gender: patientData.gender,
    });

    if (error) {
        throw new Error(error.message);
    }

    return true;
}

export async function editPatient({ patientId, patientData }) {
    const { data, error } = await supabase
        .from("patients")
        .update(patientData)
        .eq("id", patientId)
        .select("id")
        .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    if (!data) {
        throw new Error("Update was not applied. You may not have permission to edit this patient.");
    }

    return true;
}

export async function deletePatient(patientId) {
    const { data, error } = await supabase
        .from("patients")
        .delete()
        .eq("id", patientId)
        .select("id")
        .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    if (!data) {
        throw new Error("Delete was not applied. You may not have permission to delete this patient.");
    }

    return true;
}