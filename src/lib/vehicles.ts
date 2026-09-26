/**
 * Fuhrpark — data model and inventory.
 *
 * `forSale` is the single switch that drives the whole UI: the badge on the
 * card, the price block, and on the detail page the panel with price and
 * contact form. Vehicles without `forSale` show none of that and get the
 * wider in-stock layout instead.
 */

export type Fuel = 'Benzin' | 'Benzin (Mild-Hybrid)' | 'Diesel' | 'Elektro';

/**
 * A photo carries its real pixel dimensions along. Both are needed:
 *   - cards and galleries crop to 3:2 (object-fit: cover)
 *   - the fullscreen view keeps the photo's original format, portrait included
 * Without width/height the fullscreen view can't fit the image without a
 * layout jump, and next/image needs the values anyway.
 */
export type Photo = {
    src: string;
    alt: string;
    width: number;
    height: number;
};

export type Vehicle = {
    /** Slug for the detail page: /fahrzeuge/[slug] */
    slug: string;
    make: string;
    model: string;
    year: number;
    mileageKm: number;
    fuel: Fuel;
    /** Engine power in PS (metric horsepower). */
    powerPs?: number;

    /** Optional specs — not captured yet, see TODO below. */
    transmission?: string;
    color?: string;
    /** Last MFK (roadworthiness inspection), ISO date (YYYY-MM-DD) */
    lastInspection?: string;

    /** Equipment, one line per entry. Empty = section is not rendered. */
    features: string[];

    /** First photo is the main photo. Empty = placeholder area in 3:2 format. */
    photos: Photo[];

    forSale: boolean;
    /** Only when forSale: price in CHF (whole francs). */
    priceChf?: number;
    /** Only when forSale: short condition note for card and detail page. */
    condition?: string;
    /** Only when forSale: longer description on the detail page. */
    conditionDetail?: string;
    /** Only when forSale: ISO date the listing went up. */
    listedSince?: string;
};

/**
 * TODO before going live — these are the marked placeholders in the drafts:
 *   - lastInspection per vehicle
 *   - features per vehicle ([AUSSTATTUNG 1–6] in the drafts)
 *   - conditionDetail and listedSince for the two vehicles for sale
 */
export const vehicles: Vehicle[] = [
    {
        slug: 'golf-1300-cl-1991',
        make: 'VW',
        model: 'Golf 1300 CL',
        year: 1991,
        mileageKm: 180000,
        fuel: 'Benzin',
        powerPs: 55,
        transmission: 'Manuell',
        color: 'Weiss',
        features: [],
        photos: [
            {
                src: '/assets/fahrzeuge/golf-1300-cl-1991.webp',
                alt: 'VW Golf 1300 CL',
                width: 2437,
                height: 2201,
            },
        ],
        forSale: true,
        priceChf: 4500,
        condition: 'Gebrauchsspuren, Flugrost',
    },
    {
        slug: 'tiguan-20-tdi-dsg-2012',
        make: 'VW',
        model: 'Tiguan 2.0 TDI DSG Sport & Style',
        year: 2012,
        mileageKm: 78000,
        fuel: 'Diesel',
        powerPs: 140,
        transmission: 'Automat (DSG)',
        color: 'Schwarz',
        features: [],
        photos: [
            {
                src: '/assets/fahrzeuge/tiguan-20-tdi-dsg-2012.webp',
                alt: 'VW Tiguan 2.0 TDI DSG Sport & Style',
                width: 4032,
                height: 3024,
            },
        ],
        forSale: true,
        priceChf: 9500,
        condition: 'Gebrauchsspuren',
    },
    {
        slug: 'golf-1600-cl-1991',
        make: 'VW',
        model: 'Golf 1600 CL',
        year: 1991,
        mileageKm: 130000,
        fuel: 'Benzin',
        powerPs: 70,
        transmission: 'Manuell',
        color: 'Weiss, Swiss-Champion-Aufkleber',
        features: [],
        photos: [
            {
                src: '/assets/fahrzeuge/golf-1600-cl-1991.webp',
                alt: 'VW Golf 1600 CL',
                width: 4032,
                height: 3024,
            },
        ],
        forSale: false,
    },
    {
        slug: 'golf-1800-cl-1992',
        make: 'VW',
        model: 'Golf 1800 CL',
        year: 1992,
        mileageKm: 160000,
        fuel: 'Benzin',
        powerPs: 90,
        transmission: 'Manuell',
        color: 'Rot',
        features: [],
        photos: [
            {
                src: '/assets/fahrzeuge/golf-1800-cl-1992.webp',
                alt: 'VW Golf 1800 CL',
                width: 5712,
                height: 4284,
            },
        ],
        forSale: false,
    },
    {
        slug: 'golf-15-etsi-2025',
        make: 'VW',
        model: 'Golf 1.5 eTSI',
        year: 2025,
        mileageKm: 50000,
        fuel: 'Benzin (Mild-Hybrid)',
        powerPs: 150,
        transmission: 'Automat (DSG)',
        color: 'Crystal Ice Blue Metallic',
        features: [],
        photos: [
            {
                src: '/assets/fahrzeuge/golf-15-etsi-2025.webp',
                alt: 'VW Golf 1.5 eTSI',
                width: 1600,
                height: 900,
            },
        ],
        forSale: false,
    },
];

export const vehiclesForSale = vehicles.filter((v) => v.forSale);
export const vehiclesInStock = vehicles.filter((v) => !v.forSale);

export function vehicleBySlug(slug: string): Vehicle | undefined {
    return vehicles.find((v) => v.slug === slug);
}

/** "VW Golf 1300 CL" */
export function vehicleTitle(v: Vehicle): string {
    return `${v.make} ${v.model}`;
}

/** true = portrait; the fullscreen view sizes its stage accordingly. */
export function isPortrait(photo: Photo): boolean {
    return photo.height > photo.width;
}
