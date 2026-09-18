'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
    Carousel,
    type CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { VehiclePhoto } from '@/components/vehicle-photo';
import { cn } from '@/lib/utils';

type Props = {
    photos: string[];
    alt: string;
};

const mainClass = 'h-60 w-full rounded-lg border bg-card lg:h-105';

export function PhotoGallery({ photos, alt }: Props) {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }
        const onSelect = () => setCurrent(api.selectedScrollSnap());
        onSelect();
        api.on('select', onSelect);
        return () => {
            api.off('select', onSelect);
        };
    }, [api]);

    if (photos.length === 0) {
        return <VehiclePhoto alt={alt} className={mainClass} />;
    }

    return (
        <div className="flex flex-col gap-3 lg:gap-4">
            <Carousel setApi={setApi} className="w-full">
                <CarouselContent>
                    {photos.map((src, i) => (
                        <CarouselItem key={src}>
                            <VehiclePhoto
                                src={src}
                                alt={`${alt}, Foto ${i + 1} von ${photos.length}`}
                                priority={i === 0}
                                sizes="(min-width: 1024px) 668px, 100vw"
                                className={mainClass}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {photos.length > 1 && (
                    <>
                        <CarouselPrevious
                            className="left-2 size-11"
                            aria-label="Vorheriges Foto"
                        />
                        <CarouselNext
                            className="right-2 size-11"
                            aria-label="Nächstes Foto"
                        />
                    </>
                )}
            </Carousel>

            {photos.length > 1 && (
                <div className="grid grid-cols-3 gap-3 lg:gap-4">
                    {photos.map((src, i) => (
                        <button
                            key={src}
                            type="button"
                            onClick={() => api?.scrollTo(i)}
                            aria-label={`Foto ${i + 1} anzeigen`}
                            aria-current={i === current ? 'true' : undefined}
                            className={cn(
                                'bg-card focus-visible:ring-ring/50 relative h-20 overflow-hidden rounded-lg border outline-none focus-visible:ring-3 lg:h-30',
                                i === current && 'border-brand-text',
                            )}
                        >
                            <Image
                                src={src}
                                alt=""
                                fill
                                sizes="(min-width: 1024px) 212px, 33vw"
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
