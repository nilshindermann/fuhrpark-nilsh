import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Container } from '@/components/container';
import { SectionHeading } from '@/components/section-heading';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { VehicleCard } from '@/components/vehicle-card';
import { formatDate } from '@/lib/format';
import { site } from '@/lib/site';
import { vehicles, vehiclesForSale, vehiclesInStock } from '@/lib/vehicles';

const heroTitle = 'Fünf Volkswagen, Baujahr 1991 bis 2025.';
const heroLead =
    'Drei Golf aus den frühen Neunzigern, ein Tiguan von 2012 und ein Golf eTSI von 2025. Zu jedem Fahrzeug findest du Baujahr, Kilometerstand und Treibstoff. Zwei Fahrzeuge stehen derzeit zum Verkauf.';

export default function Home() {
    const firstForSale = vehiclesForSale[0];

    return (
        <>
            <section className="pt-10 pb-12 lg:pt-26 lg:pb-24">
                <Container>
                    <div className="flex max-w-[820px] flex-col gap-4 lg:gap-6">
                        <span className="text-label text-brand-text tracking-[0.08em] uppercase">
                            Privater Fuhrpark
                        </span>
                        <h1 className="text-hero text-pretty">{heroTitle}</h1>
                        <p className="text-body text-muted-foreground max-w-[680px] text-pretty">
                            {heroLead}
                        </p>
                        <div className="text-body-sm text-muted-foreground flex flex-wrap items-center gap-2">
                            <span>{vehicles.length} Fahrzeuge</span>
                            <span aria-hidden="true">·</span>
                            <span>{vehiclesForSale.length} zu verkaufen</span>
                            <span aria-hidden="true">·</span>
                            <span>Stand {formatDate(site.lastUpdated)}</span>
                        </div>
                        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                            {vehiclesForSale.length > 0 && (
                                <Button asChild size="xl">
                                    <Link href="#verkauf">
                                        Fahrzeuge zum Verkauf
                                        <ArrowRight
                                            className="size-[18px]"
                                            aria-hidden="true"
                                        />
                                    </Link>
                                </Button>
                            )}
                            <Button asChild size="xl" variant="outline">
                                <Link href="#bestand">Ganzer Fuhrpark</Link>
                            </Button>
                        </div>
                    </div>
                </Container>
            </section>

            {vehiclesForSale.length > 0 && (
                <section
                    id="verkauf"
                    aria-labelledby="verkauf-titel"
                    className="scroll-mt-6 pb-12 lg:pb-22"
                >
                    <Container className="flex flex-col gap-5 lg:gap-8">
                        <SectionHeading
                            id="verkauf-titel"
                            title="Zu verkaufen"
                            description="Preis und Zustand stehen direkt beim Fahrzeug, alles Weitere auf der Detailseite."
                        />
                        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
                            {vehiclesForSale.map((vehicle, i) => (
                                <VehicleCard
                                    key={vehicle.slug}
                                    vehicle={vehicle}
                                    priority={i === 0}
                                />
                            ))}
                        </div>
                    </Container>
                </section>
            )}

            {vehiclesInStock.length > 0 && (
                <section
                    id="bestand"
                    aria-labelledby="bestand-titel"
                    className="scroll-mt-6 pb-12 lg:pb-22"
                >
                    <Container className="flex flex-col gap-5 lg:gap-8">
                        <SectionHeading
                            id="bestand-titel"
                            title="Im Bestand"
                            description="Fahrzeuge, die bleiben."
                        />
                        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
                            {vehiclesInStock.map((vehicle) => (
                                <VehicleCard
                                    key={vehicle.slug}
                                    vehicle={vehicle}
                                />
                            ))}
                        </div>
                    </Container>
                </section>
            )}

            <section
                id="kontakt"
                aria-labelledby="kontakt-titel"
                className="scroll-mt-6 pb-12 lg:pb-24"
            >
                <Container>
                    <Card className="flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:p-10">
                        <div className="flex max-w-[640px] flex-col gap-2">
                            <h2
                                id="kontakt-titel"
                                className="text-heading-lg lg:text-heading-xl"
                            >
                                Fragen zu einem Fahrzeug?
                            </h2>
                            <p className="text-body text-muted-foreground">
                                Schreib mir, was du wissen willst: Zustand,
                                Serviceheft, Besichtigung. Anfragen laufen über
                                das Formular auf der Fahrzeugseite.
                            </p>
                        </div>
                        {firstForSale && (
                            <Button asChild size="xl" className="shrink-0">
                                <Link
                                    href={`/fahrzeuge/${firstForSale.slug}#anfrage`}
                                >
                                    Anfrage senden
                                    <ArrowRight
                                        className="size-[18px]"
                                        aria-hidden="true"
                                    />
                                </Link>
                            </Button>
                        )}
                    </Card>
                </Container>
            </section>
        </>
    );
}
