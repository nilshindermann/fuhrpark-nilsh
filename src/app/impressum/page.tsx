import type { Metadata } from 'next';
import { Container } from '@/components/container';
import { RevealEmail } from '@/components/reveal-email';
import { SpecList } from '@/components/spec-list';
import { site } from '@/lib/site';

export const metadata: Metadata = {
    title: 'Impressum',
};

export default function ImpressumPage() {
    const location = site.place ? `${site.place}, Schweiz` : 'Schweiz';

    return (
        <Container className="flex flex-col gap-6 py-8 lg:py-12">
            <div className="flex max-w-[640px] flex-col gap-2">
                <h1 className="text-heading-xl">Impressum</h1>
                <p className="text-body text-muted-foreground">
                    Private Website ohne kommerziellen Zweck. Verantwortlich für
                    den Inhalt:
                </p>
            </div>
            <div className="max-w-[640px]">
                <SpecList
                    items={[
                        { label: 'Name', value: site.ownerName },
                        { label: 'Ort', value: location },
                        {
                            label: 'E-Mail',
                            value: site.contactEmail ? (
                                <RevealEmail
                                    encoded={btoa(
                                        `${site.contactEmail.user}@${site.contactEmail.domain}`,
                                    )}
                                />
                            ) : undefined,
                        },
                    ]}
                />
            </div>
        </Container>
    );
}
