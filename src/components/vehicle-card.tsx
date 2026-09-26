import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { VehiclePhoto } from '@/components/vehicle-photo';
import { formatChf, formatSpecLine } from '@/lib/format';
import { type Vehicle, vehicleTitle } from '@/lib/vehicles';

type Props = {
    vehicle: Vehicle;
    priority?: boolean;
};

export function VehicleCard({ vehicle, priority }: Props) {
    const title = vehicleTitle(vehicle);
    const href = `/fahrzeuge/${vehicle.slug}`;

    return (
        <Card className="gap-0 py-0">
            <VehiclePhoto
                photo={vehicle.photos[0]}
                alt={title}
                priority={priority}
                sizes="(min-width: 1024px) 560px, 100vw"
                className="aspect-photo w-full border-b"
            />
            <div className="flex flex-col gap-2 p-4">
                <div className="flex">
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
                </div>
                <h3 className="text-heading-lg">
                    <Link
                        href={href}
                        className="text-foreground hover:text-brand-text"
                    >
                        {title}
                    </Link>
                </h3>
                <p className="text-body-sm text-muted-foreground">
                    {formatSpecLine(vehicle)}
                </p>

                {vehicle.forSale && vehicle.priceChf !== undefined && (
                    <>
                        <Separator className="my-2" />
                        <div className="flex flex-col gap-1 lg:flex-row lg:items-end lg:justify-between lg:gap-4">
                            <div className="flex flex-col gap-1">
                                <span className="text-caption text-muted-foreground">
                                    Preis
                                </span>
                                <span className="text-heading-lg font-bold">
                                    {formatChf(vehicle.priceChf)}
                                </span>
                            </div>
                            {vehicle.condition && (
                                <>
                                    <span className="text-body-sm text-muted-foreground lg:hidden">
                                        Zustand: {vehicle.condition}
                                    </span>
                                    <div className="hidden flex-col gap-1 text-right lg:flex">
                                        <span className="text-caption text-muted-foreground">
                                            Zustand
                                        </span>
                                        <span className="text-body-sm">
                                            {vehicle.condition}
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                        <Button asChild size="xl" className="mt-2 w-full">
                            <Link href={href}>Details und Anfrage</Link>
                        </Button>
                    </>
                )}
            </div>
        </Card>
    );
}
