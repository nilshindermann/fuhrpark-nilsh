'use client';

import { Expand } from 'lucide-react';
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
import { PhotoLightbox } from '@/components/photo-lightbox';
import { VehiclePhoto } from '@/components/vehicle-photo';
import { cn } from '@/lib/utils';
import type { Photo } from '@/lib/vehicles';

type Props = {
    photos: Photo[];
    alt: string;
};

const mainClass = 'aspect-photo w-full rounded-lg border bg-card';

export function PhotoGallery({ photos, alt }: Props) {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

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

    const openLightbox = (index: number) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    return (
        <div className="flex flex-col gap-3 lg:gap-4">
            <Carousel setApi={setApi} className="w-full">
                <CarouselContent>
                    {photos.map((photo, i) => (
                        <CarouselItem key={photo.src}>
                            <button
                                type="button"
                                onClick={() => openLightbox(i)}
                                aria-label="Fotos im Vollbild öffnen"
                                className="focus-visible:ring-ring/50 group relative block w-full outline-none focus-visible:ring-3"
                            >
                                <VehiclePhoto
                                    photo={photo}
                                    alt={`${alt}, Foto ${i + 1} von ${photos.length}`}
                                    priority={i === 0}
                                    sizes="(min-width: 1024px) 668px, 100vw"
                                    className={mainClass}
                                />
                                <span className="bg-card/90 text-body-sm text-brand-text absolute right-3 bottom-3 flex items-center gap-1 rounded-md px-2 py-1">
                                    <Expand
                                        className="size-4"
                                        aria-hidden="true"
                                    />
                                    Vollbild
                                </span>
                            </button>
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
                    {photos.map((photo, i) => (
                        <button
                            key={photo.src}
                            type="button"
                            onClick={() => api?.scrollTo(i)}
                            aria-label={`Foto ${i + 1} anzeigen`}
                            aria-current={i === current ? 'true' : undefined}
                            className={cn(
                                'bg-card focus-visible:ring-ring/50 aspect-photo relative w-full overflow-hidden rounded-lg border outline-none focus-visible:ring-3',
                                i === current && 'border-brand-text',
                            )}
                        >
                            <Image
                                src={photo.src}
                                alt=""
                                fill
                                sizes="(min-width: 1024px) 212px, 33vw"
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}

            <PhotoLightbox
                photos={photos}
                alt={alt}
                index={lightboxIndex}
                onIndexChange={setLightboxIndex}
                open={lightboxOpen}
                onOpenChange={setLightboxOpen}
            />
        </div>
    );
}
