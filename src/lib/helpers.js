export function generateInviteLink(token) {
    return `${window.location.origin}/invite?token=${encodeURIComponent(token)}`;
}

export async function copyInviteLink(value) {
    if (!value) {
        throw new Error("Nothing to copy.");
    }

    await navigator.clipboard.writeText(value);
}

export function formatDateTime(value) {
    if (!value) {
        return "-";
    }

    return new Date(value).toLocaleString();
}