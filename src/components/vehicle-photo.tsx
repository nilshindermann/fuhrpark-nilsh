import { Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type Props = {
    src?: string;
    alt: string;
    /** Load the first visible image of the page with priority. */
    priority?: boolean;
    sizes?: string;
    className?: string;
};

/**
 * Vehicle photo or, while no images are captured yet, a neutral surface
 * with an icon. No placeholder text (AGENTS.md).
 */
export function VehiclePhoto({
    src,
    alt,
    priority,
    sizes = '100vw',
    className,
}: Props) {
    if (!src) {
        return (
            <div
                role="img"
                aria-label={`Kein Foto von ${alt}`}
                className={cn(
                    'bg-background flex items-center justify-center',
                    className,
                )}
            >
                <ImageIcon
                    className="text-muted-foreground size-7"
                    aria-hidden="true"
                />
            </div>
        );
    }

    return (
        <div className={cn('relative overflow-hidden', className)}>
            <Image
                src={src}
                alt={alt}
                fill
                sizes={sizes}
                priority={priority}
                className="object-cover"
            />
        </div>
    );
}
