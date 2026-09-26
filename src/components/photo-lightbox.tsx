'use client';

import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import type { Photo } from '@/lib/vehicles';
import { cn } from '@/lib/utils';

type Props = {
    photos: Photo[];
    alt: string;
    index: number;
    onIndexChange: (index: number) => void;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

/**
 * Photo in fullscreen, per the draft design/vollbild-desktop.html.
 * Keeps its original format (portrait included) via object-fit: contain on
 * a dark ground — unlike cards and galleries, which crop to 3:2.
 */
export function PhotoLightbox({
    photos,
    alt,
    index,
    onIndexChange,
    open,
    onOpenChange,
}: Props) {
    const photo = photos[index];
    const count = photos.length;

    useEffect(() => {
        if (!open) {
            return;
        }
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                onIndexChange((index - 1 + count) % count);
            } else if (e.key === 'ArrowRight') {
                onIndexChange((index + 1) % count);
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [open, index, count, onIndexChange]);

    if (!photo) {
        return null;
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                showCloseButton={false}
                className="bg-background flex h-dvh w-screen max-w-none flex-col gap-0 rounded-none border-0 p-0 sm:rounded-none"
            >
                <DialogTitle className="sr-only">
                    {alt}, Foto {index + 1} von {count}
                </DialogTitle>

                <div className="flex h-16 shrink-0 items-center justify-between px-4 lg:px-6">
                    <div className="text-body-sm flex items-baseline gap-3">
                        <span className="text-foreground font-semibold">
                            {alt}
                        </span>
                        <span className="text-muted-foreground">
                            Foto {index + 1} von {count}
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={() => onOpenChange(false)}
                        aria-label="Vollbild schliessen"
                        className="hover:bg-card flex size-11 items-center justify-center rounded-md"
                    >
                        <X
                            className="text-muted-foreground size-[22px]"
                            aria-hidden="true"
                        />
                    </button>
                </div>

                <div className="flex min-h-0 flex-1 items-center justify-center gap-3 px-4 pb-2 lg:gap-6 lg:px-6">
                    {count > 1 && (
                        <button
                            type="button"
                            onClick={() =>
                                onIndexChange((index - 1 + count) % count)
                            }
                            aria-label="Vorheriges Foto"
                            className="bg-card hover:border-brand-text flex size-11 shrink-0 items-center justify-center rounded-md border"
                        >
                            <ChevronLeft
                                className="text-foreground size-5"
                                aria-hidden="true"
                            />
                        </button>
                    )}

                    <div className="relative flex h-full min-w-0 flex-1 items-center justify-center">
                        <Image
                            src={photo.src}
                            alt={photo.alt || alt}
                            width={photo.width}
                            height={photo.height}
                            sizes="100vw"
                            className="h-auto max-h-full w-auto max-w-full object-contain"
                            priority
                        />
                    </div>

                    {count > 1 && (
                        <button
                            type="button"
                            onClick={() => onIndexChange((index + 1) % count)}
                            aria-label="Nächstes Foto"
                            className="bg-card hover:border-brand-text flex size-11 shrink-0 items-center justify-center rounded-md border"
                        >
                            <ChevronRight
                                className="text-foreground size-5"
                                aria-hidden="true"
                            />
                        </button>
                    )}
                </div>

                {count > 1 && (
                    <div className="flex shrink-0 items-center justify-center gap-3 px-4 py-4 lg:py-6">
                        {photos.map((p, i) => (
                            <button
                                key={p.src}
                                type="button"
                                onClick={() => onIndexChange(i)}
                                aria-label={`Foto ${i + 1} anzeigen`}
                                aria-current={i === index ? 'true' : undefined}
                                className={cn(
                                    'bg-card relative h-16 shrink-0 overflow-hidden rounded-md border',
                                    i === index
                                        ? 'border-brand-text ring-brand-text ring-2 ring-offset-1'
                                        : 'border-border',
                                )}
                                style={{
                                    aspectRatio: `${p.width} / ${p.height}`,
                                }}
                            >
                                <Image
                                    src={p.src}
                                    alt=""
                                    fill
                                    sizes="80px"
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
