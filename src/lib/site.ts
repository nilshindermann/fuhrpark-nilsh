/**
 * Site details that are marked as placeholders in the drafts
 * ([ORT], [DEINE E-MAIL-ADRESSE]). Optional fields stay empty until the real
 * values are known; the UI then omits the affected sentences.
 */
export const site = {
    name: 'Fuhrpark',
    description: 'Privater Fahrzeugbestand mit Fahrzeugen zum Verkauf.',
    /**
     * Contact address for the Impressum, stored in parts and only assembled
     * client-side on request. Never rendered as mailto: or plain text in HTML.
     */
    contactEmail: { user: 'hello', domain: 'nilsh.ch' } as
        { user: string; domain: string } | undefined,
    /** Name for the Impressum. */
    ownerName: 'Nils Hindermann',
    /** Place for footer and Impressum, e.g. "Zürich". */
    place: 'Wolfhausen',
    /** Date the data was last updated, ISO date. */
    lastUpdated: '2026-09-18',
};
