import { ArrowRight, Check, ChevronLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ContactForm } from '@/components/contact-form';
import { Container } from '@/components/container';
import { PhotoGallery } from '@/components/photo-gallery';
import { PriceBlock } from '@/components/price-block';
import { SpecList } from '@/components/spec-list';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatDate, formatKm, formatPs, formatSpecLine } from '@/lib/format';
import { vehicleBySlug, vehicleTitle, vehicles } from '@/lib/vehicles';

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
    return vehicles.map((v) => ({ slug: v.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
    params,
}: {
    params: Params;
}): Promise<Metadata> {
    const vehicle = vehicleBySlug((await params).slug);
    if (!vehicle) {
        return {};
    }
    return {
        title: vehicleTitle(vehicle),
        description: formatSpecLine(vehicle),
    };
}

export default async function VehiclePage({ params }: { params: Params }) {
    const vehicle = vehicleBySlug((await params).slug);
    if (!vehicle) {
        notFound();
    }

    const title = vehicleTitle(vehicle);
    const priceChf = vehicle.forSale ? vehicle.priceChf : undefined;
    const selling = priceChf !== undefined;

    const specs = [
        { label: 'Marke', value: vehicle.make },
        { label: 'Modell', value: vehicle.model },
        { label: 'Baujahr', value: String(vehicle.year) },
        { label: 'Kilometerstand', value: formatKm(vehicle.mileageKm) },
        { label: 'Treibstoff', value: vehicle.fuel },
        {
            label: 'Leistung',
            value:
                vehicle.powerPs !== undefined
                    ? formatPs(vehicle.powerPs)
                    : undefined,
        },
        { label: 'Getriebe', value: vehicle.transmission },
        { label: 'Farbe', value: vehicle.color },
        {
            label: 'Letzte MFK',
            value: vehicle.lastInspection
                ? formatDate(vehicle.lastInspection)
                : undefined,
        },
    ];

    const inquiryHeader = (
        <div className="flex flex-col gap-1">
            <h2 className="text-heading-md">Anfrage senden</h2>
            <p className="text-body-sm text-muted-foreground">
                Schreib mir, was du wissen willst, oder vereinbare eine
                Besichtigung.
            </p>
        </div>
    );

    return (
        <Container className="flex flex-col gap-6 py-6 lg:pt-8 lg:pb-12">
            <Link
                href="/"
                className="text-body-sm text-brand-text inline-flex min-h-11 items-center gap-1 self-start hover:underline lg:min-h-0"
            >
                <ChevronLeft className="size-4" aria-hidden="true" />
                Zurück zur Übersicht
            </Link>

            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    {vehicle.forSale ? (
                        <Badge>Zu verkaufen</Badge>
                    ) : (
                        <Badge
                            variant="outline"
                            className="bg-background text-muted-foreground"
                        >
                            Im Bestand
                        </Badge>
                    )}
                    {vehicle.forSale && vehicle.listedSince && (
                        <span className="text-body-sm text-muted-foreground">
                            Inseriert seit {formatDate(vehicle.listedSince)}
                        </span>
                    )}
                </div>
                <h1 className="text-heading-xl">{title}</h1>
                <p className="text-body text-muted-foreground">
                    {formatSpecLine(vehicle)}
                </p>
            </div>

            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
                <div className="flex min-w-0 flex-1 flex-col gap-6 lg:gap-8">
                    <PhotoGallery photos={vehicle.photos} alt={title} />

                    {selling && (
                        <Card className="gap-4 p-4 lg:hidden">
                            <PriceBlock priceChf={priceChf} />
                            <Button asChild size="xl">
                                <Link href="#anfrage">
                                    Anfrage senden
                                    <ArrowRight
                                        className="size-[18px]"
                                        aria-hidden="true"
                                    />
                                </Link>
                            </Button>
                        </Card>
                    )}

                    <section
                        aria-labelledby="eckdaten"
                        className="flex flex-col gap-3 lg:gap-4"
                    >
                        <h2 id="eckdaten" className="text-heading-md">
                            Eckdaten
                        </h2>
                        <SpecList items={specs} />
                    </section>

                    {vehicle.features.length > 0 && (
                        <section
                            aria-labelledby="ausstattung"
                            className="flex flex-col gap-3 lg:gap-4"
                        >
                            <h2 id="ausstattung" className="text-heading-md">
                                Ausstattung
                            </h2>
                            <Card className="p-4">
                                <ul className="grid gap-3 sm:grid-cols-2 sm:gap-x-6">
                                    {vehicle.features.map((feature) => (
                                        <li
                                            key={feature}
                                            className="text-body text-muted-foreground flex items-center gap-2"
                                        >
                                            <Check
                                                className="text-brand-text size-[18px] shrink-0"
                                                aria-hidden="true"
                                            />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        </section>
                    )}

                    {vehicle.forSale && vehicle.condition && (
                        <section
                            aria-labelledby="zustand"
                            className="flex flex-col gap-3 lg:gap-4"
                        >
                            <h2 id="zustand" className="text-heading-md">
                                Zustand
                            </h2>
                            <Card className="gap-2 p-4">
                                <p className="text-body">{vehicle.condition}</p>
                                {vehicle.conditionDetail && (
                                    <p className="text-body text-muted-foreground">
                                        {vehicle.conditionDetail}
                                    </p>
                                )}
                            </Card>
                        </section>
                    )}

                    {selling && (
                        <Card
                            id="anfrage"
                            className="scroll-mt-6 gap-4 p-4 lg:hidden"
                        >
                            {inquiryHeader}
                            <ContactForm
                                slug={vehicle.slug}
                                idPrefix="anfrage-m"
                            />
                        </Card>
                    )}
                </div>

                {selling && (
                    <aside className="sticky top-6 hidden w-105 shrink-0 lg:block">
                        <Card className="gap-4 p-6">
                            <PriceBlock priceChf={priceChf} />
                            <Separator />
                            {inquiryHeader}
                            <ContactForm
                                slug={vehicle.slug}
                                idPrefix="anfrage-d"
                            />
                        </Card>
                    </aside>
                )}
            </div>
        </Container>
    );
}
