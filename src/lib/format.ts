/**
 * Swiss formatting: 12'450 km, CHF 89.–, 18.09.2026.
 *
 * Note: for de-CH, Intl uses the typographic apostrophe U+2019 (’) as the
 * thousands separator. The design system writes the straight apostrophe ('),
 * hence the replace. Don't "simplify" it or the output drifts.
 */

const groupFormatter = new Intl.NumberFormat('de-CH', {
    maximumFractionDigits: 0,
});

function group(value: number): string {
    return groupFormatter.format(value).replace(/’/g, "'");
}

/** 180000 -> "180'000 km" */
export function formatKm(km: number): string {
    return `${group(km)} km`;
}

/** 70 -> "70 PS" */
export function formatPs(ps: number): string {
    return `${group(ps)} PS`;
}

/** 4999 -> "CHF 4'999.–" */
export function formatChf(amount: number): string {
    return `CHF ${group(amount)}.–`;
}

/** "2026-09-18" or Date -> "18.09.2026" */
export function formatDate(value: string | Date): string {
    const date = typeof value === 'string' ? new Date(value) : value;
    return new Intl.DateTimeFormat('de-CH', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(date);
}

/** "1991 · 180'000 km · Benzin", the line under every vehicle title. */
export function formatSpecLine(parts: {
    year: number;
    mileageKm: number;
    fuel: string;
}): string {
    return `${parts.year} · ${formatKm(parts.mileageKm)} · ${parts.fuel}`;
}
