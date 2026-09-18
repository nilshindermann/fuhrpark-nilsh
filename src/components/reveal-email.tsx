'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

type Props = {
    /** Base64-encoded address; decoded only when the visitor asks for it. */
    encoded: string;
};

/**
 * Shows the address only after a click and decodes it at that moment, so
 * neither the HTML nor the RSC payload contains the readable address.
 * No mailto: link on purpose.
 */
export function RevealEmail({ encoded }: Props) {
    const [address, setAddress] = useState<string | null>(null);

    if (address) {
        return <span className="text-body select-all">{address}</span>;
    }

    return (
        <Button
            type="button"
            variant="link"
            className="text-body h-auto p-0"
            onClick={() => setAddress(atob(encoded))}
        >
            E-Mail-Adresse anzeigen
        </Button>
    );
}
